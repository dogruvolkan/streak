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

// Badge System Types
export type BadgeType =
    | 'first_step'          // İlk streak oluşturma
    | 'triple_threat'       // 3 gün üst üste
    | 'weekly_warrior'      // 7 gün üst üste
    | 'streak_master'       // 30 gün üst üste
    | 'century_club'        // 100 gün üst üste
    | 'multi_tasker'        // 5 aktif streak
    | 'persistence'         // 10 streak tamamlama
    | 'dedication'          // Toplam 365 gün streak
    | 'perfectionist'       // 15 gün hiç kaçırmadan
    | 'fire_starter'        // Aynı gün 3 farklı streak
    | 'consistency_master'  // 21 gün düzenli
    | 'unstoppable'         // 50 gün üst üste
    | 'legend'              // 200 gün üst üste
    | 'explorer'            // 7 farklı kategori
    | 'speed_demon'         // Bir günde 5 streak
    | 'marathon_runner'     // Toplam 1000 gün
    | 'habit_architect';    // 10 farklı streak oluşturma

export interface Badge {
    id: BadgeType;
    name: string;
    description: string;
    emoji: string;
    rarity: 'common' | 'rare' | 'epic' | 'legendary';
    unlockedAt?: Date;
    isUnlocked: boolean;
}

export interface UserBadges {
    badges: Badge[];
    totalUnlocked: number;
    lastUnlocked?: BadgeType;
}
