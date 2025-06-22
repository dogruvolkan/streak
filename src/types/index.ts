export type StreakCategory = 'health' | 'fitness' | 'nutrition' | 'productivity' | 'learning' | 'hobby' | 'personal' | 'social' | 'finance' | 'other';

export interface Streak {
    id: string;
    name: string;
    repeatType: 'day' | 'week' | 'month';
    selectedDays?: number[]; // For weekly repeats (0=Sunday, 6=Saturday)
    count: number;
    createdAt: Date;
    lastUpdated: Date;
    order: number; // Drag and drop sıralaması için
    category: StreakCategory; // Kategori
    emoji: string; // Emoji/ikon
}

export type RepeatType = 'day' | 'week' | 'month';

export interface CreateStreakFormData {
    name: string;
    repeatType: RepeatType;
    selectedDays?: number[];
    category: StreakCategory;
    emoji: string;
}
