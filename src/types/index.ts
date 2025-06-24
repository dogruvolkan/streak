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
    // Quantity tracking fields
    isQuantityBased?: boolean; // Miktar bazlı streak mi?
    dailyGoal?: number; // Günlük hedef (miktar bazlı streakler için)
    unit?: string; // Birim (bardak, sayfa, dakika vb.)
    dailyProgress?: number; // Günün mevcut ilerlemesi
    lastProgressDate?: Date; // Son ilerleme kaydedilen tarih
}

export type RepeatType = 'day' | 'week' | 'month';

export interface CreateStreakFormData {
    name: string;
    repeatType: RepeatType;
    selectedDays?: number[];
    category: StreakCategory;
    emoji: string;
    // Quantity tracking fields
    isQuantityBased?: boolean;
    dailyGoal?: number;
    unit?: string;
}
