import { MaterialReactTable } from 'material-react-table';
import { MRT_Localization_RU } from 'material-react-table/locales/ru';
import type { MRT_ColumnDef } from 'material-react-table';
import type { Row } from '@/types';
import dayjs from 'dayjs';
import 'dayjs/locale/ru'; 

dayjs.locale('ru');

export default function PlanFactTable({ rows }: { rows: Row[] }) {
    const columns: MRT_ColumnDef<Row>[] = [
        {
            accessorKey: 'date',
            header: 'Дата',
            Cell: ({ cell }) => dayjs(cell.getValue<string>()).format('DD.MM.YYYY'),
        },
        { accessorKey: 'object', header: 'Объект' },
        { accessorKey: 'workType', header: 'Вид работ' },
        {
            accessorKey: 'plan',
            header: 'План',
            aggregationFn: 'sum',
            AggregatedCell: ({ cell }) => Math.round(cell.getValue<number>()),
        },
        {
            accessorKey: 'fact',
            header: 'Факт',
            aggregationFn: 'sum',
            AggregatedCell: ({ cell }) => Math.round(cell.getValue<number>()),
        },
    ];

    return (
        <MaterialReactTable
            columns={columns}
            data={rows}
            enableStickyHeader
            enableColumnResizing
            enableGrouping
            localization={MRT_Localization_RU}
            initialState={{ showGlobalFilter: true, density: 'compact' }}
        />
    );
}
