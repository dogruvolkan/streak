// Audio feedback utility functions

// Create audio context for sound generation
let audioContext: AudioContext | null = null;
let isAudioEnabled = true; // User preference for audio

// Initialize audio context
const initializeAudioContext = (): AudioContext | null => {
    if (!audioContext && typeof window !== 'undefined') {
        try {
            const AudioContextClass = window.AudioContext || (window as typeof window & { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
            audioContext = new AudioContextClass();

            // Handle browser autoplay policies
            if (audioContext.state === 'suspended') {
                // Will be resumed on first user interaction
                document.addEventListener('click', resumeAudioContext, { once: true });
                document.addEventListener('touchstart', resumeAudioContext, { once: true });
            }
        } catch (error) {
            console.warn('Web Audio API not supported:', error);
            isAudioEnabled = false;
            return null;
        }
    }
    return audioContext;
};

// Resume audio context (required for browser autoplay policies)
const resumeAudioContext = async () => {
    if (audioContext && audioContext.state === 'suspended') {
        try {
            await audioContext.resume();
        } catch (error) {
            console.warn('Failed to resume audio context:', error);
        }
    }
};

// Play a simple beep sound with improved error handling
const playBeep = async (frequency: number, duration: number, volume: number = 0.05): Promise<void> => {
    if (!isAudioEnabled) return;

    const context = initializeAudioContext();
    if (!context) return;

    try {
        // Resume context if suspended
        if (context.state === 'suspended') {
            await context.resume();
        }

        const oscillator = context.createOscillator();
        const gainNode = context.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(context.destination);

        oscillator.frequency.value = frequency;
        oscillator.type = 'sine';

        // Smooth volume envelope to prevent clicks
        const currentTime = context.currentTime;
        gainNode.gain.setValueAtTime(0, currentTime);
        gainNode.gain.linearRampToValueAtTime(volume, currentTime + 0.005); // Quick fade in
        gainNode.gain.linearRampToValueAtTime(volume, currentTime + duration - 0.05); // Hold
        gainNode.gain.exponentialRampToValueAtTime(0.001, currentTime + duration); // Smooth fade out

        oscillator.start(currentTime);
        oscillator.stop(currentTime + duration);
    } catch (error) {
        console.warn('Failed to play beep:', error);
    }
};

// Play a multi-tone sound with improved timing
const playMultiTone = async (tones: { frequency: number; duration: number; volume?: number }[], delay: number = 0): Promise<void> => {
    if (!isAudioEnabled) return;

    const context = initializeAudioContext();
    if (!context) return;

    try {
        if (context.state === 'suspended') {
            await context.resume();
        }

        let currentTime = context.currentTime + delay;
        const gap = 0.02; // Small gap between tones

        tones.forEach((tone) => {
            const oscillator = context.createOscillator();
            const gainNode = context.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(context.destination);

            oscillator.frequency.value = tone.frequency;
            oscillator.type = 'sine';

            const volume = tone.volume || 0.05;
            gainNode.gain.setValueAtTime(0, currentTime);
            gainNode.gain.linearRampToValueAtTime(volume, currentTime + 0.005);
            gainNode.gain.linearRampToValueAtTime(volume, currentTime + tone.duration - 0.02);
            gainNode.gain.exponentialRampToValueAtTime(0.001, currentTime + tone.duration);

            oscillator.start(currentTime);
            oscillator.stop(currentTime + tone.duration);

            currentTime += tone.duration + gap;
        });
    } catch (error) {
        console.warn('Failed to play multi-tone:', error);
    }
};

// Audio feedback functions
export const audioFeedback = {
    // Light tap sound - for increment (pleasant ascending tone)
    increment: () => {
        playBeep(880, 0.12, 0.05); // A5 note, soft and pleasant
    },

    // Success sound - for completing a streak (happy chord progression)
    success: () => {
        playMultiTone([
            { frequency: 523, duration: 0.1, volume: 0.04 }, // C5
            { frequency: 659, duration: 0.1, volume: 0.04 }, // E5
            { frequency: 784, duration: 0.15, volume: 0.05 },  // G5
        ]);
    },

    // Reset sound - for resetting a streak (neutral descending tones)
    reset: () => {
        playMultiTone([
            { frequency: 440, duration: 0.08, volume: 0.03 }, // A4
            { frequency: 392, duration: 0.12, volume: 0.04 }, // G4
        ]);
    },

    // Delete sound - for deleting a streak (warning descending tones)
    delete: () => {
        playMultiTone([
            { frequency: 330, duration: 0.08, volume: 0.03 }, // E4
            { frequency: 294, duration: 0.08, volume: 0.03 }, // D4
            { frequency: 262, duration: 0.12, volume: 0.04 }, // C4
        ]);
    },

    // Error sound - for errors (low warning tones)
    error: () => {
        playMultiTone([
            { frequency: 220, duration: 0.15, volume: 0.03 }, // A3
            { frequency: 196, duration: 0.15, volume: 0.03 }, // G3
        ]);
    },
};

// Combined feedback function that plays both sound and haptic
export const combinedFeedback = {
    increment: () => {
        audioFeedback.increment();
    },

    success: () => {
        audioFeedback.success();
    },

    reset: () => {
        audioFeedback.reset();
    },

    delete: () => {
        audioFeedback.delete();
    },

    error: () => {
        audioFeedback.error();
    },
};

// Initialize audio context on user interaction (required for Web Audio API)
export const initAudio = (): void => {
    initializeAudioContext();
};

// Enable or disable audio
export const setAudioEnabled = (enabled: boolean): void => {
    isAudioEnabled = enabled;
    // Save preference to localStorage
    try {
        localStorage.setItem('streakApp_audioEnabled', JSON.stringify(enabled));
    } catch (error) {
        console.warn('Failed to save audio preference:', error);
    }
};

// Get audio enabled state
export const getAudioEnabled = (): boolean => {
    // Load preference from localStorage on first call
    if (typeof window !== 'undefined') {
        try {
            const saved = localStorage.getItem('streakApp_audioEnabled');
            if (saved !== null) {
                isAudioEnabled = JSON.parse(saved);
            }
        } catch (error) {
            console.warn('Failed to load audio preference:', error);
        }
    }
    return isAudioEnabled;
};
