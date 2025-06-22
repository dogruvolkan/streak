import type { Badge, BadgeType, UserBadges, Streak } from '../types';

// Badge definitions with Turkish names and descriptions
const BADGE_DEFINITIONS: Record<BadgeType, Omit<Badge, 'isUnlocked' | 'unlockedAt'>> = {
    first_step: {
        id: 'first_step',
        name: 'İlk Adım',
        description: 'İlk streak\'ini oluşturdun!',
        emoji: '🌱',
        rarity: 'common'
    },
    triple_threat: {
        id: 'triple_threat',
        name: 'Üçlü Güç',
        description: '3 gün üst üste streak tamamladın!',
        emoji: '🔥',
        rarity: 'common'
    },
    weekly_warrior: {
        id: 'weekly_warrior',
        name: 'Haftalık Savaşçı',
        description: '7 gün üst üste streak tamamladın!',
        emoji: '⚡',
        rarity: 'rare'
    },
    streak_master: {
        id: 'streak_master',
        name: 'Streak Ustası',
        description: '30 gün üst üste streak tamamladın!',
        emoji: '👑',
        rarity: 'epic'
    },
    century_club: {
        id: 'century_club',
        name: 'Yüzler Kulübü',
        description: '100 gün üst üste streak tamamladın!',
        emoji: '💎',
        rarity: 'legendary'
    },
    multi_tasker: {
        id: 'multi_tasker',
        name: 'Çok Görevli',
        description: 'Aynı anda 5 aktif streak\'in var!',
        emoji: '🎯',
        rarity: 'rare'
    },
    persistence: {
        id: 'persistence',
        name: 'Azimli',
        description: '10 farklı streak tamamladın!',
        emoji: '🏆',
        rarity: 'epic'
    },
    dedication: {
        id: 'dedication',
        name: 'Adanmış',
        description: 'Toplam 365 gün streak tamamladın!',
        emoji: '🌟',
        rarity: 'legendary'
    },
    perfectionist: {
        id: 'perfectionist',
        name: 'Mükemmeliyetçi',
        description: '15 gün boyunca hiç kaçırmadan streak yaptın!',
        emoji: '💯',
        rarity: 'epic'
    },
    fire_starter: {
        id: 'fire_starter',
        name: 'Ateş Başlatıcı',
        description: 'Aynı gün 3 farklı streak tamamladın!',
        emoji: '🚀',
        rarity: 'common'
    },
    consistency_master: {
        id: 'consistency_master',
        name: 'Tutarlılık Ustası',
        description: '21 gün boyunca düzenli streak yaptın!',
        emoji: '🎯',
        rarity: 'epic'
    },
    unstoppable: {
        id: 'unstoppable',
        name: 'Durdurulamaz',
        description: '50 gün üst üste streak tamamladın!',
        emoji: '🌪️',
        rarity: 'epic'
    },
    legend: {
        id: 'legend',
        name: 'Efsane',
        description: '200 gün üst üste streak tamamladın!',
        emoji: '🏅',
        rarity: 'legendary'
    },
    explorer: {
        id: 'explorer',
        name: 'Kaşif',
        description: '7 farklı kategoride streak oluşturdun!',
        emoji: '🗺️',
        rarity: 'rare'
    },
    speed_demon: {
        id: 'speed_demon',
        name: 'Hız Şeytanı',
        description: 'Bir günde 5 streak tamamladın!',
        emoji: '💨',
        rarity: 'common'
    },
    marathon_runner: {
        id: 'marathon_runner',
        name: 'Maraton Koşucusu',
        description: 'Toplam 1000 gün streak tamamladın!',
        emoji: '🏃',
        rarity: 'legendary'
    },
    habit_architect: {
        id: 'habit_architect',
        name: 'Alışkanlık Mimarı',
        description: '10 farklı streak oluşturdun!',
        emoji: '🏗️',
        rarity: 'rare'
    }
};

// Load user badges from localStorage
export const loadUserBadges = (): UserBadges => {
    try {
        const stored = localStorage.getItem('userBadges');
        if (stored) {
            const parsed = JSON.parse(stored);
            // Convert date strings back to Date objects
            parsed.badges = parsed.badges.map((badge: Badge & { unlockedAt?: string }) => ({
                ...badge,
                unlockedAt: badge.unlockedAt ? new Date(badge.unlockedAt) : undefined
            }));
            return parsed;
        }
    } catch (error) {
        console.error('Error loading user badges:', error);
    }

    // Initialize with all badges locked
    const initialBadges: Badge[] = Object.values(BADGE_DEFINITIONS).map(def => ({
        ...def,
        isUnlocked: false
    }));

    return {
        badges: initialBadges,
        totalUnlocked: 0
    };
};

// Save user badges to localStorage
export const saveUserBadges = (userBadges: UserBadges): void => {
    try {
        localStorage.setItem('userBadges', JSON.stringify(userBadges));
    } catch (error) {
        console.error('Error saving user badges:', error);
    }
};

// Check if a badge should be unlocked based on current streaks
export const checkBadgeUnlocks = (streaks: Streak[], currentBadges: UserBadges): {
    newBadges: BadgeType[],
    updatedBadges: UserBadges
} => {
    const newBadges: BadgeType[] = [];
    const updatedBadges = { ...currentBadges };

    // Helper function to unlock a badge
    const unlockBadge = (badgeId: BadgeType) => {
        const badgeIndex = updatedBadges.badges.findIndex(b => b.id === badgeId);
        if (badgeIndex !== -1 && !updatedBadges.badges[badgeIndex].isUnlocked) {
            updatedBadges.badges[badgeIndex] = {
                ...updatedBadges.badges[badgeIndex],
                isUnlocked: true,
                unlockedAt: new Date()
            };
            updatedBadges.totalUnlocked++;
            updatedBadges.lastUnlocked = badgeId;
            newBadges.push(badgeId);
        }
    };

    // Badge: First Step - Create first streak
    if (streaks.length >= 1) {
        unlockBadge('first_step');
    }

    // Badge: Multi Tasker - Have 5 active streaks
    if (streaks.length >= 5) {
        unlockBadge('multi_tasker');
    }

    // Check count-based badges for each streak
    streaks.forEach(streak => {
        // Badge: Triple Threat - 3 days streak
        if (streak.count >= 3) {
            unlockBadge('triple_threat');
        }

        // Badge: Weekly Warrior - 7 days streak
        if (streak.count >= 7) {
            unlockBadge('weekly_warrior');
        }

        // Badge: Streak Master - 30 days streak
        if (streak.count >= 30) {
            unlockBadge('streak_master');
        }

        // Badge: Century Club - 100 days streak
        if (streak.count >= 100) {
            unlockBadge('century_club');
        }
    });

    // Badge: Persistence - Complete 10 streaks (count >= 7 for completed)
    const completedStreaks = streaks.filter(s => s.count >= 7).length;
    if (completedStreaks >= 10) {
        unlockBadge('persistence');
    }

    // Badge: Dedication - Total 365 days across all streaks
    const totalDays = streaks.reduce((sum, streak) => sum + streak.count, 0);
    if (totalDays >= 365) {
        unlockBadge('dedication');
    }

    // Badge: Marathon Runner - Total 1000 days across all streaks
    if (totalDays >= 1000) {
        unlockBadge('marathon_runner');
    }

    // Badge: Habit Architect - Create 10 different streaks
    if (streaks.length >= 10) {
        unlockBadge('habit_architect');
    }

    // Badge: Explorer - 7 different categories
    const uniqueCategories = new Set(streaks.map(s => s.category));
    if (uniqueCategories.size >= 7) {
        unlockBadge('explorer');
    }

    // Check additional count-based badges for each streak
    streaks.forEach(streak => {
        // Badge: Perfectionist - 15 days streak
        if (streak.count >= 15) {
            unlockBadge('perfectionist');
        }

        // Badge: Consistency Master - 21 days streak
        if (streak.count >= 21) {
            unlockBadge('consistency_master');
        }

        // Badge: Unstoppable - 50 days streak
        if (streak.count >= 50) {
            unlockBadge('unstoppable');
        }

        // Badge: Legend - 200 days streak
        if (streak.count >= 200) {
            unlockBadge('legend');
        }
    });

    // Check daily completion based badges
    const today = new Date();
    const todayCompletedStreaks = streaks.filter(streak => {
        const lastUpdate = new Date(streak.lastUpdated);
        return lastUpdate.toDateString() === today.toDateString() && streak.count > 0;
    });

    // Badge: Fire Starter - Complete 3 different streaks in same day
    if (todayCompletedStreaks.length >= 3) {
        unlockBadge('fire_starter');
    }

    // Badge: Speed Demon - Complete 5 streaks in one day
    if (todayCompletedStreaks.length >= 5) {
        unlockBadge('speed_demon');
    }



    return { newBadges, updatedBadges };
};

// Get badge rarity color
export const getBadgeRarityColor = (rarity: Badge['rarity']): string => {
    switch (rarity) {
        case 'common': return '#9E9E9E';
        case 'rare': return '#2196F3';
        case 'epic': return '#9C27B0';
        case 'legendary': return '#FF9800';
        default: return '#9E9E9E';
    }
};

// Get badge rarity text
export const getBadgeRarityText = (rarity: Badge['rarity']): string => {
    switch (rarity) {
        case 'common': return 'Yaygın';
        case 'rare': return 'Nadir';
        case 'epic': return 'Epik';
        case 'legendary': return 'Efsanevi';
        default: return 'Yaygın';
    }
};
