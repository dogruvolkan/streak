import type { MoodEntry, MoodLevel } from '../types';

const MOOD_STORAGE_KEY = 'streak-tracker-moods';

export const loadMoodEntries = (): MoodEntry[] => {
    try {
        const data = localStorage.getItem(MOOD_STORAGE_KEY);
        if (!data) return [];

        const moods = JSON.parse(data);
        return moods.map((mood: { date: string; createdAt: string; id: string; mood: MoodLevel; note?: string }) => ({
            ...mood,
            date: new Date(mood.date),
            createdAt: new Date(mood.createdAt),
        }));
    } catch (error) {
        console.error('Error loading mood entries from localStorage:', error);
        return [];
    }
};

export const saveMoodEntries = (moods: MoodEntry[]): void => {
    try {
        localStorage.setItem(MOOD_STORAGE_KEY, JSON.stringify(moods));
    } catch (error) {
        console.error('Error saving mood entries to localStorage:', error);
    }
};

export const addMoodEntry = (mood: MoodLevel, note?: string): MoodEntry => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const newEntry: MoodEntry = {
        id: `mood_${Date.now()}`,
        date: today,
        mood,
        note,
        createdAt: new Date(),
    };

    const existingMoods = loadMoodEntries();
    
    // Check if there's already an entry for today
    const existingTodayIndex = existingMoods.findIndex(
        entry => entry.date.getTime() === today.getTime()
    );

    if (existingTodayIndex >= 0) {
        // Update existing entry
        existingMoods[existingTodayIndex] = newEntry;
    } else {
        // Add new entry
        existingMoods.push(newEntry);
    }

    // Sort by date (newest first)
    existingMoods.sort((a, b) => b.date.getTime() - a.date.getTime());

    saveMoodEntries(existingMoods);
    return newEntry;
};

export const getMoodForDate = (date: Date): MoodEntry | null => {
    const moods = loadMoodEntries();
    const targetDate = new Date(date);
    targetDate.setHours(0, 0, 0, 0);
    
    return moods.find(mood => mood.date.getTime() === targetDate.getTime()) || null;
};

export const getTodayMood = (): MoodEntry | null => {
    return getMoodForDate(new Date());
};

export const getMoodEmoji = (mood: MoodLevel): string => {
    const moodEmojis = {
        1: '😢', // Very bad
        2: '😕', // Bad
        3: '😐', // Neutral
        4: '😊', // Good
        5: '😄', // Very good
    };
    return moodEmojis[mood];
};

export const getMoodLabel = (mood: MoodLevel, language: 'en' | 'tr' = 'en'): string => {
    const labels = {
        en: {
            1: 'Very Bad',
            2: 'Bad',
            3: 'Neutral',
            4: 'Good',
            5: 'Very Good',
        },
        tr: {
            1: 'Çok Kötü',
            2: 'Kötü',
            3: 'Normal',
            4: 'İyi',
            5: 'Çok İyi',
        },
    };
    return labels[language][mood];
};
