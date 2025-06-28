import type { Streak, FreeDaySettings } from '../types';
import type { Language } from './i18n';

const STORAGE_KEY = 'streak-tracker-data';

export const loadStreaks = (): Streak[] => {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        console.log('Loading streaks from localStorage:', data);
        if (!data) return [];

        const streaks = JSON.parse(data);
        // Convert date strings back to Date objects and add default values for new fields
        const convertedStreaks = streaks.map((streak: Partial<Streak> & {
            createdAt: string;
            lastUpdated: string;
            lastProgressDate?: string;
            history?: Array<{ date: string; timestamp: string; quantity?: number }>;
        }, index: number) => ({
            ...streak,
            createdAt: new Date(streak.createdAt),
            lastUpdated: new Date(streak.lastUpdated),
            lastProgressDate: streak.lastProgressDate ? new Date(streak.lastProgressDate) : undefined,
            order: streak.order !== undefined ? streak.order : index, // Eski streakler için order ekle
            category: streak.category || 'other', // Default category for existing streaks
            emoji: streak.emoji || '📋', // Default emoji for existing streaks
            // Quantity-based fields with defaults
            isQuantityBased: streak.isQuantityBased || false,
            dailyGoal: streak.dailyGoal || 1,
            unit: streak.unit || '',
            dailyProgress: streak.dailyProgress || 0,
            // History field conversion
            history: streak.history ? streak.history.map((entry: { date: string; timestamp: string; quantity?: number }) => ({
                ...entry,
                date: new Date(entry.date),
                timestamp: new Date(entry.timestamp)
            })) : [],
        }));

        // Order'a göre sırala
        const sortedStreaks = convertedStreaks.sort((a: Streak, b: Streak) => a.order - b.order);
        console.log('Converted streaks:', sortedStreaks);
        return sortedStreaks;
    } catch (error) {
        console.error('Error loading streaks from localStorage:', error);
        return [];
    }
};

export const saveStreaks = (streaks: Streak[]): void => {
    try {
        console.log('Saving streaks to localStorage:', streaks);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(streaks));
    } catch (error) {
        console.error('Error saving streaks to localStorage:', error);
    }
};

export const generateId = (): string => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const getRepeatTypeDisplayText = (repeatType: string, selectedDays?: number[], language: Language = 'en'): string => {
    const dayNames = language === 'tr'
        ? ['Paz', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt']
        : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const translations = language === 'tr'
        ? {
            daily: 'Her gün',
            weekly: 'Haftalık',
            monthly: 'Aylık',
            unknown: 'Bilinmiyor',
            allDays: 'Her gün'
        }
        : {
            daily: 'Every day',
            weekly: 'Weekly',
            monthly: 'Monthly',
            unknown: 'Unknown',
            allDays: 'Every day'
        };

    switch (repeatType) {
        case 'day':
            return translations.daily;
        case 'week':
            if (selectedDays && selectedDays.length > 0) {
                // Eğer 7 gün seçilmişse "Her gün" göster
                if (selectedDays.length === 7) {
                    return translations.allDays;
                }
                // 7 günden az seçilmişse gün isimlerini göster
                const selectedDayNames = selectedDays.map(day => dayNames[day]);
                return selectedDayNames.join(', ');
            }
            return translations.weekly;
        case 'month':
            return translations.monthly;
        default:
            return translations.unknown;
    }
};

// Free Day Settings
const FREE_DAY_STORAGE_KEY = 'streakApp_freeDaySettings';

export const loadFreeDaySettings = (): FreeDaySettings => {
    try {
        const data = localStorage.getItem(FREE_DAY_STORAGE_KEY);
        if (!data) {
            // Default: Pazar günü free day
            return {
                enabled: true,
                dayOfWeek: 0, // Sunday
            };
        }

        const settings = JSON.parse(data);
        return {
            ...settings,
            lastShownDate: settings.lastShownDate ? new Date(settings.lastShownDate) : undefined,
        };
    } catch (error) {
        console.error('Error loading free day settings:', error);
        return {
            enabled: true,
            dayOfWeek: 0, // Sunday default
        };
    }
};

export const saveFreeDaySettings = (settings: FreeDaySettings): void => {
    try {
        localStorage.setItem(FREE_DAY_STORAGE_KEY, JSON.stringify(settings));
    } catch (error) {
        console.error('Error saving free day settings:', error);
    }
};

// Check if today is free day
export const isTodayFreeDay = (settings: FreeDaySettings): boolean => {
    if (!settings.enabled) return false;

    const today = new Date();
    return today.getDay() === settings.dayOfWeek;
};

// Check if we should show confetti today
export const shouldShowFreeDayConfetti = (settings: FreeDaySettings): boolean => {
    if (!isTodayFreeDay(settings)) return false;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Eğer bugün hiç gösterilmemişse veya farklı bir günde gösterilmişse
    if (!settings.lastShownDate) return true;

    const lastShownDate = new Date(settings.lastShownDate);
    lastShownDate.setHours(0, 0, 0, 0);

    return lastShownDate.getTime() !== today.getTime();
};
