import type { Row, SeriesPoint } from '@/types';
import dayjs from 'dayjs';

export type Period = 'month' | 'quarter' | 'year';

export function filterRows(rows: Row[], params: {
    dateFrom?: string | null;
    dateTo?: string | null;
    objects?: string[];
    workTypes?: string[];
}): Row[] {
    const { dateFrom, dateTo, objects = [], workTypes = [] } = params;
    return rows.filter((r) => {
        const d = dayjs(r.date);
        if (dateFrom && d.isBefore(dayjs(dateFrom), 'day')) return false;
        if (dateTo && d.isAfter(dayjs(dateTo), 'day')) return false;
        if (objects.length && !objects.includes(r.object)) return false;
        if (workTypes.length && !workTypes.includes(r.workType)) return false;
        return true;
    });
}

export function groupByPeriod(rows: Row[], period: Period = 'year') {
    const map: Record<string, { plan: number; fact: number }> = {};
    for (const r of rows) {
        const d = dayjs(r.date);
        const key =
            period === 'month' ? d.format('YYYY-MM') :
                period === 'quarter' ? `${d.year()} Q${Math.ceil((d.month() + 1) / 3)}` :
                    String(d.year());
        map[key] ??= { plan: 0, fact: 0 };
        map[key].plan += r.plan;
        map[key].fact += r.fact;
    }
    const keys = Object.keys(map).sort((a, b) => a.localeCompare(b, 'ru', { numeric: true }));
    return keys.map((k) => ({ key: k, ...map[k] }));
}

export function toSeriesPoints(rows: Row[], period: Period, cumulative: boolean): SeriesPoint[] {
    const grouped = groupByPeriod(rows, period);
    if (!cumulative) 
        return grouped.map(g => ({ x: g.key, plan: g.plan, fact: g.fact }));
    
    let accPlan = 0, accFact = 0;
        return grouped.map(g => {
            accPlan += g.plan; accFact += g.fact;
            return { x: g.key, plan: accPlan, fact: accFact };
        });
}