// Haptic and audio feedback utility functions
import { audioFeedback } from './audio';

// Haptic feedback functions
export const hapticFeedback = {
    // Light tap - for button presses
    light: () => {
        if ('vibrate' in navigator && navigator.vibrate) {
            navigator.vibrate(50);
        }
    },

    // Medium tap - for success actions
    medium: () => {
        if ('vibrate' in navigator && navigator.vibrate) {
            navigator.vibrate(100);
        }
    },

    // Heavy tap - for important actions
    heavy: () => {
        if ('vibrate' in navigator && navigator.vibrate) {
            navigator.vibrate([100, 50, 100]);
        }
    },

    // Error vibration
    error: () => {
        if ('vibrate' in navigator && navigator.vibrate) {
            navigator.vibrate([200, 100, 200]);
        }
    },

    // Success vibration
    success: () => {
        if ('vibrate' in navigator && navigator.vibrate) {
            navigator.vibrate([50, 50, 50]);
        }
    }
};

// Combined feedback functions (haptic + audio)
export const combinedFeedback = {
    // Increment feedback
    increment: () => {
        hapticFeedback.light();
        audioFeedback.increment();
    },

    // Success feedback
    success: () => {
        hapticFeedback.success();
        audioFeedback.success();
    },

    // Reset feedback
    reset: () => {
        hapticFeedback.medium();
        audioFeedback.reset();
    },

    // Delete feedback
    delete: () => {
        hapticFeedback.error();
        audioFeedback.delete();
    },

    // Error feedback
    error: () => {
        hapticFeedback.error();
        audioFeedback.error();
    }
};
