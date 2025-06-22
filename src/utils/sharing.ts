import type { Streak, StreakCategory } from "../types";
import type { Language } from "./i18n";

// Base64 encode/decode utilities for URL-safe sharing that handle Unicode
const encodeBase64URL = (str: string): string => {
    // First encode to UTF-8 bytes, then to base64
    const utf8Bytes = new TextEncoder().encode(str);
    const base64 = btoa(String.fromCharCode(...utf8Bytes));
    return base64
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '');
};

const decodeBase64URL = (str: string): string => {
    try {
        // Add padding if needed
        const padded = str + '==='.slice((str.length + 3) % 4);
        const base64 = padded.replace(/-/g, '+').replace(/_/g, '/');
        const binaryString = atob(base64);

        // Convert binary string back to UTF-8
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        return new TextDecoder().decode(bytes);
    } catch (error) {
        console.error('Failed to decode Base64URL:', error);
        throw error;
    }
};

// Interface for shared streak data (minimal data for sharing)
export interface SharedStreakData {
    name: string;
    category: StreakCategory;
    emoji: string;
    repeatType: 'day' | 'week' | 'month';
    selectedDays?: number[]; // For weekly repeats
    count: number;
    createdAt: string; // ISO string
    lastUpdated: string; // ISO string
    sharedAt: string; // ISO string (when it was shared)
    language: Language; // Language of the original streak
}

// Convert a full Streak to shareable data
export const createShareableData = (streak: Streak, language: Language): SharedStreakData => {
    return {
        name: streak.name,
        category: streak.category,
        emoji: streak.emoji,
        repeatType: streak.repeatType,
        selectedDays: streak.selectedDays,
        count: streak.count,
        createdAt: streak.createdAt.toISOString(),
        lastUpdated: streak.lastUpdated.toISOString(),
        sharedAt: new Date().toISOString(),
        language: language,
    };
};

// Generate a shareable URL for a streak
export const generateShareURL = (streak: Streak, language: Language): string => {
    const shareData = createShareableData(streak, language);
    const jsonString = JSON.stringify(shareData);
    const encoded = encodeBase64URL(jsonString);

    // Get current URL origin
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    return `${origin}/#/shared/${encoded}`;
};

// Parse shared streak data from URL parameter
export const parseSharedStreakData = (encodedData: string): SharedStreakData | null => {
    try {
        const jsonString = decodeBase64URL(encodedData);
        const data = JSON.parse(jsonString) as SharedStreakData;

        // Validate required fields
        if (!data.name || !data.category || !data.emoji || !data.repeatType) {
            return null;
        }

        return data;
    } catch (error) {
        console.error('Failed to parse shared streak data:', error);
        return null;
    }
};

// Copy text to clipboard
export const copyToClipboard = async (text: string): Promise<boolean> => {
    try {
        if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(text);
            return true;
        } else {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = text;
            textArea.style.position = 'fixed';
            textArea.style.left = '-9999px';
            textArea.style.top = '-9999px';
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();

            const successful = document.execCommand('copy');
            document.body.removeChild(textArea);
            return successful;
        }
    } catch (error) {
        console.error('Failed to copy to clipboard:', error);
        return false;
    }
};

// Check if current URL is a shared streak URL
export const isSharedStreakURL = (): boolean => {
    return typeof window !== 'undefined' && window.location.hash.startsWith('#/shared/');
};

// Get shared streak data from current URL
export const getSharedStreakFromURL = (): SharedStreakData | null => {
    if (typeof window === 'undefined') return null;

    const hash = window.location.hash;
    const match = hash.match(/^#\/shared\/(.+)$/);

    if (!match) return null;

    return parseSharedStreakData(match[1]);
};
