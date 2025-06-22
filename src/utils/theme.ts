import { createTheme } from "@mui/material/styles";

export type ThemeMode = 'light' | 'dark';
export type ThemeColor = 'purple' | 'blue' | 'green' | 'orange' | 'pink';

interface ThemeSettings {
    mode: ThemeMode;
    color: ThemeColor;
}

const THEME_STORAGE_KEY = 'streakApp_theme';

// Color palettes for different theme colors
const colorPalettes = {
    purple: {
        main: "#7c3aed",
        light: "#a855f7",
        dark: "#5b21b6",
    },
    blue: {
        main: "#3b82f6",
        light: "#60a5fa",
        dark: "#1d4ed8",
    },
    green: {
        main: "#10b981",
        light: "#34d399",
        dark: "#059669",
    },
    orange: {
        main: "#f59e0b",
        light: "#fbbf24",
        dark: "#d97706",
    },
    pink: {
        main: "#ec4899",
        light: "#f472b6",
        dark: "#be185d",
    },
};

// Get theme settings from localStorage
export const getThemeSettings = (): ThemeSettings => {
    try {
        const saved = localStorage.getItem(THEME_STORAGE_KEY);
        if (saved) {
            const parsed = JSON.parse(saved);
            return {
                mode: parsed.mode || 'light',
                color: parsed.color || 'purple',
            };
        }
    } catch (error) {
        console.warn('Failed to load theme settings:', error);
    }
    return { mode: 'light', color: 'purple' };
};

// Save theme settings to localStorage
export const saveThemeSettings = (settings: ThemeSettings): void => {
    try {
        localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(settings));
    } catch (error) {
        console.warn('Failed to save theme settings:', error);
    }
};

// Create Material-UI theme based on settings
export const createAppTheme = (mode: ThemeMode, color: ThemeColor) => {
    const palette = colorPalettes[color];

    return createTheme({
        palette: {
            mode,
            primary: palette,
            secondary: {
                main: "#10b981",
                light: "#34d399",
                dark: "#059669",
            },
            background: {
                default: mode === 'dark' ? "#0f172a" : "#f1f5f9",
                paper: mode === 'dark' ? "#1e293b" : "#ffffff",
            },
            text: {
                primary: mode === 'dark' ? "#f1f5f9" : "#1e293b",
                secondary: mode === 'dark' ? "#cbd5e1" : "#64748b",
            },
        },
        typography: {
            fontFamily:
                '"Inter", "SF Pro Display", "Roboto", "Helvetica", "Arial", sans-serif',
            h6: {
                fontWeight: 600,
            },
        },
        shape: {
            borderRadius: 16,
        },
        components: {
            MuiAppBar: {
                styleOverrides: {
                    root: {
                        boxShadow: "none",
                        borderBottom: `1px solid ${mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)'}`,
                        backgroundColor: mode === 'dark' ? "#1e293b" : "#ffffff",
                    },
                },
            },
            MuiCard: {
                styleOverrides: {
                    root: {
                        boxShadow: mode === 'dark'
                            ? "0 1px 3px rgba(0, 0, 0, 0.3)"
                            : "0 1px 3px rgba(0, 0, 0, 0.1)",
                        border: `1px solid ${mode === 'dark' ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.06)'}`,
                    },
                },
            },
        },
    });
};
