import { Box, Container, Typography, Divider, Stack, ToggleButton, ToggleButtonGroup, Button } from '@mui/material';
import Filters from '@/components/Filters';
import PlanFactChart from '@/components/PlanFactChart';
import PlanFactTable from '@/components/PlanFactTable';
import { useGetRowsQuery } from '@/features/api';
import { useAppSelector } from '@/hooks';
import { filterRows, toSeriesPoints } from '@/utils/aggregate';
import type { Period } from '@/utils/aggregate';
import { exportContainerToPdf } from '@/exportToPdf';

import { useState } from 'react';

export default function App() {
    const { data: rows = [], isLoading } = useGetRowsQuery();
    const f = useAppSelector(s => s.filters);

    const filtered = filterRows(rows, { dateFrom: f.dateFrom, dateTo: f.dateTo, objects: f.objects, workTypes: f.workTypes });

    const allObjects = Array.from(new Set(rows.map(r => r.object)));
    const allWorkTypes = Array.from(new Set(rows.map(r => r.workType)));

    const [period, setPeriod] = useState<Period>('year');
    const points = toSeriesPoints(filtered, period, f.cumulative);

    return (
        <Container maxWidth="xl" sx={{ py: 2 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" className="no-print">
                <Typography variant="h5">План‑факт анализ</Typography>
                <Stack direction="row" spacing={1}>
                    <Button variant="outlined" onClick={() => window.print()}>Печать (A4)</Button>
                    <Button variant="contained" onClick={() => exportContainerToPdf()}>Сохранить в PDF</Button>
                </Stack>
            </Stack>

            <Box className="no-print" sx={{ my: 2 }}>
                <Filters allObjects={allObjects} allWorkTypes={allWorkTypes} />
            </Box>

            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems="center" className="no-print" sx={{ mb: 2 }}>
                <Typography>Период:</Typography>
                <ToggleButtonGroup exclusive size="small" value={period} onChange={(_, v) => v && setPeriod(v)}>
                    <ToggleButton value="month">Месяц</ToggleButton>
                    <ToggleButton value="quarter">Квартал</ToggleButton>
                    <ToggleButton value="year">Год</ToggleButton>
                </ToggleButtonGroup>
            </Stack>

            <Box id="report-root" sx={{ backgroundColor: '#fff', p: 2, borderRadius: 2, boxShadow: 1 }}>
                <PlanFactChart points={points} />
                <Divider sx={{ my: 2 }} />
                <PlanFactTable rows={filtered} />
            </Box>

            {isLoading && <Typography sx={{ mt: 2 }}>Загрузка…</Typography>}
        </Container>
    );
}