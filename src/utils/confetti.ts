// Confetti trigger function for the new react-confetti integration
let confettiCallback: (() => void) | null = null;

// Set the callback function from the App component
export const setConfettiCallback = (callback: (() => void) | null) => {
    confettiCallback = callback;
};

// Trigger confetti with haptic feedback
export const celebrateAchievement = () => {
    // Trigger the confetti component
    if (confettiCallback) {
        confettiCallback();
    }

    // Add haptic feedback if available
    if ('vibrate' in navigator) {
        navigator.vibrate([100, 50, 100]);
    }
};
