import type { ReactElement } from 'react';
export interface Event {
    title: ReactElement;
    start: Date,
    tooltip?: string;
}