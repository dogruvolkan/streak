export type StreakCategory = 'health' | 'fitness' | 'nutrition' | 'productivity' | 'learning' | 'hobby' | 'personal' | 'social' | 'finance' | 'other';

// Mood tracking types
export type MoodLevel = 1 | 2 | 3 | 4 | 5; // 1=very bad, 2=bad, 3=neutral, 4=good, 5=very good

export interface MoodEntry {
    id: string;
    date: Date;
    mood: MoodLevel;
    note?: string; // Optional note about the mood
    createdAt: Date;
}

export interface MoodStats {
    averageMood: number;
    totalEntries: number;
    moodDistribution: Record<MoodLevel, number>;
    bestDay?: Date;
    worstDay?: Date;
    currentStreak: number; // Days with mood tracking
}

export interface StreakHistoryEntry {
    date: Date;
    quantity?: number; // Miktar bazlı streakler için
    timestamp: Date; // Tam tarih ve saat
}

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
    // History tracking
    history?: StreakHistoryEntry[]; // Tıklama geçmişi
}

export type RepeatType = 'day' | 'week' | 'month';

// Free Day Settings
export interface FreeDaySettings {
    enabled: boolean;
    dayOfWeek: number; // 0=Sunday, 1=Monday, ..., 6=Saturday
    lastShownDate?: Date; // Son confetti gösterilme tarihi
}

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

export interface PomodoroHistoryEntry {
    id: string;
    date: string; // YYYY-MM-DD
    type: 'work' | 'short' | 'long';
    start: string; // ISO
    end: string; // ISO
}
