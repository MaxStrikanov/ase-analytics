import { FormControlLabel, Checkbox, Button, Stack, MenuItem, TextField } from '@mui/material';
import type { SelectChangeEvent } from '@mui/material/Select';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';

import { useAppDispatch, useAppSelector } from '@/hooks';
import {
    setDateFrom,
    setDateTo,
    setObjects,
    setWorkTypes,
    setCumulative,
    resetFilters,
} from '@/features/filtersSlice';

dayjs.locale('ru');

export default function Filters({
    allObjects,
    allWorkTypes,
}: {
    allObjects: string[];
    allWorkTypes: string[];
}) {
    const dispatch = useAppDispatch();
    const f = useAppSelector((s) => s.filters);

    const handleMultiChange = (
        e: SelectChangeEvent<string[]>,
        setter: (v: string[]) => void
    ) => {
        const value = e.target.value;
        setter(Array.isArray(value) ? value : value.split(','));
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems="center">
                <DatePicker
                    label="С даты"
                    format="DD.MM.YYYY"
                    value={f.dateFrom ? dayjs(f.dateFrom) : null}
                    onChange={(v) => dispatch(setDateFrom(v ? v.format('YYYY-MM-DD') : null))}
                />

                <DatePicker
                    label="По дату"
                    format="DD.MM.YYYY"
                    value={f.dateTo ? dayjs(f.dateTo) : null}
                    onChange={(v) => dispatch(setDateTo(v ? v.format('YYYY-MM-DD') : null))}
                />

                <TextField
                    select
                    label="Объект"
                    value={f.objects}
                    onChange={(e) =>
                        handleMultiChange(e as SelectChangeEvent<string[]>, (val) =>
                            dispatch(setObjects(val))
                        )
                    }
                    slotProps={{ select: { multiple: true } }}
                    sx={{ minWidth: 220 }}
                >
                    {allObjects.map((o) => (
                        <MenuItem key={o} value={o}>
                            {o}
                        </MenuItem>
                    ))}
                </TextField>

                <TextField
                    select
                    label="Вид работ"
                    value={f.workTypes}
                    onChange={(e) =>
                        handleMultiChange(e as SelectChangeEvent<string[]>, (val) =>
                            dispatch(setWorkTypes(val))
                        )
                    }
                    slotProps={{ select: { multiple: true } }}
                    sx={{ minWidth: 220 }}
                >
                    {allWorkTypes.map((w) => (
                        <MenuItem key={w} value={w}>
                            {w}
                        </MenuItem>
                    ))}
                </TextField>

                <FormControlLabel
                    control={
                        <Checkbox
                            checked={f.cumulative}
                            onChange={(e) => dispatch(setCumulative(e.target.checked))}
                        />
                    }
                    label="Накопительным итогом"
                />

                <Button variant="outlined" onClick={() => dispatch(resetFilters())}>
                    Сбросить
                </Button>
            </Stack>
        </LocalizationProvider>
    );
}
