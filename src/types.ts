export type Row = {
    id: number;
    object: string;
    workType: string;
    date: string;
    plan: number;
    fact: number;
};

export type Filters = {
    dateFrom: string | null;
    dateTo: string | null;
    objects: string[];
    workTypes: string[];
    cumulative: boolean;
};

export type SeriesPoint = { 
    x: string;
    plan: number; 
    fact: number 
};