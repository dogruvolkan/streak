import type { Badge, BadgeType, UserBadges, Streak } from '../types';
import type { Language } from './i18n';
import { getTranslations } from './i18n';

// Badge definitions with localized names and descriptions
const getBadgeDefinitions = (language: Language): Record<BadgeType, Omit<Badge, 'isUnlocked' | 'unlockedAt'>> => {
    const t = getTranslations(language);

    return {
        first_step: {
            id: 'first_step',
            name: t.badgeFirstStep,
            description: t.badgeFirstStepDesc,
            emoji: '🌱',
            rarity: 'common'
        },
        triple_threat: {
            id: 'triple_threat',
            name: t.badgeTripleThreat,
            description: t.badgeTripleThreatDesc,
            emoji: '🔥',
            rarity: 'common'
        },
        weekly_warrior: {
            id: 'weekly_warrior',
            name: t.badgeWeeklyWarrior,
            description: t.badgeWeeklyWarriorDesc,
            emoji: '⚡',
            rarity: 'rare'
        },
        streak_master: {
            id: 'streak_master',
            name: t.badgeStreakMaster,
            description: t.badgeStreakMasterDesc,
            emoji: '👑',
            rarity: 'epic'
        },
        century_club: {
            id: 'century_club',
            name: t.badgeCenturyClub,
            description: t.badgeCenturyClubDesc,
            emoji: '💎',
            rarity: 'legendary'
        },
        multi_tasker: {
            id: 'multi_tasker',
            name: t.badgeMultiTasker,
            description: t.badgeMultiTaskerDesc,
            emoji: '🎯',
            rarity: 'rare'
        },
        persistence: {
            id: 'persistence',
            name: t.badgePersistence,
            description: t.badgePersistenceDesc,
            emoji: '🏆',
            rarity: 'epic'
        },
        dedication: {
            id: 'dedication',
            name: t.badgeDedication,
            description: t.badgeDedicationDesc,
            emoji: '🌟',
            rarity: 'legendary'
        },
        perfectionist: {
            id: 'perfectionist',
            name: t.badgePerfectionist,
            description: t.badgePerfectionistDesc,
            emoji: '💯',
            rarity: 'epic'
        },
        fire_starter: {
            id: 'fire_starter',
            name: t.badgeFireStarter,
            description: t.badgeFireStarterDesc,
            emoji: '🚀',
            rarity: 'common'
        },
        consistency_master: {
            id: 'consistency_master',
            name: t.badgeConsistencyMaster,
            description: t.badgeConsistencyMasterDesc,
            emoji: '🎯',
            rarity: 'epic'
        },
        unstoppable: {
            id: 'unstoppable',
            name: t.badgeUnstoppable,
            description: t.badgeUnstoppableDesc,
            emoji: '🌪️',
            rarity: 'epic'
        },
        legend: {
            id: 'legend',
            name: t.badgeLegend,
            description: t.badgeLegendDesc,
            emoji: '🏅',
            rarity: 'legendary'
        },
        explorer: {
            id: 'explorer',
            name: t.badgeExplorer,
            description: t.badgeExplorerDesc,
            emoji: '🗺️',
            rarity: 'rare'
        },
        speed_demon: {
            id: 'speed_demon',
            name: t.badgeSpeedDemon,
            description: t.badgeSpeedDemonDesc,
            emoji: '💨',
            rarity: 'common'
        },
        marathon_runner: {
            id: 'marathon_runner',
            name: t.badgeMarathonRunner,
            description: t.badgeMarathonRunnerDesc,
            emoji: '🏃',
            rarity: 'legendary'
        },
        habit_architect: {
            id: 'habit_architect',
            name: t.badgeHabitArchitect,
            description: t.badgeHabitArchitectDesc,
            emoji: '🏗️',
            rarity: 'rare'
        }
    };
};

// Load user badges from localStorage
export const loadUserBadges = (language: Language = 'en'): UserBadges => {
    try {
        const stored = localStorage.getItem('userBadges');
        if (stored) {
            const parsed = JSON.parse(stored);
            // Convert date strings back to Date objects and update translations
            const badgeDefinitions = getBadgeDefinitions(language);
            parsed.badges = parsed.badges.map((badge: Badge & { unlockedAt?: string }) => ({
                ...badge,
                name: badgeDefinitions[badge.id as BadgeType]?.name || badge.name,
                description: badgeDefinitions[badge.id as BadgeType]?.description || badge.description,
                unlockedAt: badge.unlockedAt ? new Date(badge.unlockedAt) : undefined
            }));
            return parsed;
        }
    } catch (error) {
        console.error('Error loading user badges:', error);
    }

    // Initialize with all badges locked
    const badgeDefinitions = getBadgeDefinitions(language);
    const initialBadges: Badge[] = Object.values(badgeDefinitions).map(def => ({
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
export const getBadgeRarityText = (rarity: Badge['rarity'], language: Language = 'en'): string => {
    const t = getTranslations(language);
    switch (rarity) {
        case 'common': return t.common;
        case 'rare': return t.rare;
        case 'epic': return t.epic;
        case 'legendary': return t.legendary;
        default: return t.common;
    }
};
