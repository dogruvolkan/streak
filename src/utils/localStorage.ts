import type { Streak } from '../types';

const STORAGE_KEY = 'streak-tracker-data';

export const loadStreaks = (): Streak[] => {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        console.log('Loading streaks from localStorage:', data);
        if (!data) return [];

        const streaks = JSON.parse(data);
        // Convert date strings back to Date objects
        const convertedStreaks = streaks.map((streak: Partial<Streak> & { createdAt: string; lastUpdated: string }, index: number) => ({
            ...streak,
            createdAt: new Date(streak.createdAt),
            lastUpdated: new Date(streak.lastUpdated),
            order: streak.order !== undefined ? streak.order : index, // Eski streakler için order ekle
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

export const getRepeatTypeDisplayText = (repeatType: string, selectedDays?: number[]): string => {
    switch (repeatType) {
        case 'day':
            return 'Her gün';
        case 'week':
            if (selectedDays && selectedDays.length > 0) {
                const dayNames = ['Paz', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt'];
                const selectedDayNames = selectedDays.map(day => dayNames[day]);
                return selectedDayNames.join(', ');
            }
            return 'Haftalık';
        case 'month':
            return 'Aylık';
        default:
            return 'Bilinmiyor';
    }
};
