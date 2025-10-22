import Chart from 'react-apexcharts';
import type { SeriesPoint } from '@/types';

export default function PlanFactChart({ points }: { points: SeriesPoint[] }) {
    const categories = points.map((p) => p.x);

    const planArr = points.map((p) => Math.round(p.plan));
    const factArr = points.map((p) => Math.round(p.fact));
    const devArr = points.map((p) => Math.round(p.plan - p.fact));

    const series = [
        { name: 'План', data: planArr },
        { name: 'Факт', data: factArr },
        { name: 'Отклонение', data: devArr },
    ];

    const maxY = Math.max(...planArr, ...factArr, ...devArr.map(Math.abs), 0);
    const threshold = Math.max(Math.round(maxY * 0.08), 100);

    const isSmall: boolean[][] = [planArr, factArr, devArr].map(arr => arr.map(v => Math.abs(v) < threshold));

    const pointAnnotations: ApexAnnotations = { points: [] };
    [planArr, factArr, devArr].forEach((arr, sIdx) => {
        arr.forEach((v, i) => {
            if (isSmall[sIdx][i]) {
                pointAnnotations.points!.push({
                    x: categories[i],
                    y: v,
                    seriesIndex: sIdx,
                    marker: { size: 0 },
                    label: {
                        text: String(v),
                        borderColor: 'transparent',
                        offsetY: 0,
                        style: { color: '#000', background: 'transparent', fontSize: '12px', fontWeight: 700 }
                    }
                });
            }
        });
    });

    const options: ApexCharts.ApexOptions = {
        chart: { type: 'bar', height: 420, toolbar: { show: false } },
        colors: ['#6EA8FE', '#6AD69A', '#E57373'],
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '45%',
                dataLabels: { position: 'center' },
            },
        },
        dataLabels: {
            enabled: true,
            style: { colors: ['#000'] },
            formatter: (_val, opts) => {
                const s = opts.seriesIndex as number;
                const i = opts.dataPointIndex as number;
                return isSmall[s][i] ? '' : String(Math.round(opts.w.globals.series[s][i]));
            },
        },
        xaxis: { categories },
        yaxis: { labels: { formatter: (v) => String(Math.round(v)) } },
        legend: { position: 'bottom' },
        tooltip: { y: { formatter: (v) => String(Math.round(v)) } },
        annotations: pointAnnotations,
    };

    return <Chart options={options} series={series} type="bar" height={420} />;
}
