export interface Streak {
    id: string;
    name: string;
    repeatType: 'day' | 'week' | 'month';
    selectedDays?: number[]; // For weekly repeats (0=Sunday, 6=Saturday)
    count: number;
    createdAt: Date;
    lastUpdated: Date;
    order: number; // Drag and drop sıralaması için
}

export type RepeatType = 'day' | 'week' | 'month';

export interface CreateStreakFormData {
    name: string;
    repeatType: RepeatType;
    selectedDays?: number[];
}
