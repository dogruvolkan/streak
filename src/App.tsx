import { useState, useEffect } from "react";
import {
  ThemeProvider,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Fab,
  Box,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SettingsIcon from "@mui/icons-material/Settings";
import StreakList from "./components/StreakList";
import AddStreakBottomSheet from "./components/AddStreakBottomSheet";
import Settings from "./components/Settings";
import type { Streak, CreateStreakFormData } from "./types";
import { loadStreaks, saveStreaks, generateId } from "./utils/localStorage";
import { initAudio, getAudioEnabled } from "./utils/audio";
import {
  getCurrentLanguage,
  setLanguage,
  useTranslations,
  type Language,
} from "./utils/i18n";
import {
  getThemeSettings,
  saveThemeSettings,
  createAppTheme,
  type ThemeMode,
  type ThemeColor,
} from "./utils/theme";

function App() {
  const [streaks, setStreaks] = useState<Streak[]>([]);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState<Language>("en");
  const [themeMode, setThemeMode] = useState<ThemeMode>("light");
  const [themeColor, setThemeColor] = useState<ThemeColor>("purple");

  const t = useTranslations(currentLanguage);
  const theme = createAppTheme(themeMode, themeColor); // Load streaks from localStorage on component mount
  useEffect(() => {
    const loadedStreaks = loadStreaks();
    setStreaks(loadedStreaks);
    setIsLoaded(true);

    // Load language preference
    const savedLanguage = getCurrentLanguage();
    setCurrentLanguage(savedLanguage);

    // Load theme settings
    const themeSettings = getThemeSettings();
    setThemeMode(themeSettings.mode);
    setThemeColor(themeSettings.color);

    // Initialize audio context and load audio preference
    initAudio();
    getAudioEnabled(); // This loads the preference from localStorage
  }, []);

  // Save streaks to localStorage whenever streaks state changes (but not on initial load)
  useEffect(() => {
    if (isLoaded) {
      saveStreaks(streaks);
    }
  }, [streaks, isLoaded]);

  const handleAddStreak = (formData: CreateStreakFormData) => {
    const newStreak: Streak = {
      id: generateId(),
      name: formData.name,
      repeatType: formData.repeatType,
      selectedDays: formData.selectedDays,
      count: 0,
      createdAt: new Date(),
      lastUpdated: new Date(),
      order: streaks.length, // Yeni streak en sona eklenir
    };

    setStreaks((prevStreaks) => [...prevStreaks, newStreak]);
  };

  const handleIncrementStreak = (streakId: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    setStreaks((prevStreaks) =>
      prevStreaks.map((streak) => {
        if (streak.id !== streakId) return streak;

        const lastUpdateDate = new Date(streak.lastUpdated);
        lastUpdateDate.setHours(0, 0, 0, 0);

        // Bugün tıklandı mı kontrol et
        const isClickedToday = () => {
          if (streak.repeatType === "day") {
            return (
              lastUpdateDate.getTime() === today.getTime() && streak.count > 0
            );
          }
          if (streak.repeatType === "week" && streak.selectedDays) {
            const todayDayOfWeek = today.getDay();
            if (!streak.selectedDays.includes(todayDayOfWeek)) return false;
            return (
              lastUpdateDate.getTime() === today.getTime() && streak.count > 0
            );
          }
          if (streak.repeatType === "month") {
            const todayMonth = today.getMonth();
            const todayYear = today.getFullYear();
            const lastUpdateMonth = lastUpdateDate.getMonth();
            const lastUpdateYear = lastUpdateDate.getFullYear();
            return (
              todayMonth === lastUpdateMonth &&
              todayYear === lastUpdateYear &&
              streak.count > 0
            );
          }
          return false;
        };

        // Tıklanabilir mi kontrol et
        const canClickToday = () => {
          if (streak.repeatType === "week" && streak.selectedDays) {
            const todayDayOfWeek = today.getDay();
            return streak.selectedDays.includes(todayDayOfWeek);
          }
          return true;
        };

        if (!canClickToday()) {
          return streak; // Tıklama günü değilse hiçbir şey yapma
        }

        // Toggle mantığı: Bugün tıklanmışsa azalt, tıklanmamışsa artır
        if (isClickedToday()) {
          // Azalt (undo)
          return {
            ...streak,
            count: Math.max(0, streak.count - 1),
            lastUpdated: streak.count === 1 ? streak.createdAt : new Date(),
          };
        } else {
          // Artır
          return {
            ...streak,
            count: streak.count + 1,
            lastUpdated: new Date(),
          };
        }
      })
    );
  };

  const handleDeleteStreak = (streakId: string) => {
    setStreaks((prevStreaks) =>
      prevStreaks.filter((streak) => streak.id !== streakId)
    );
  };

  const handleResetStreak = (streakId: string) => {
    setStreaks((prevStreaks) =>
      prevStreaks.map((streak) =>
        streak.id === streakId
          ? { ...streak, count: 0, lastUpdated: new Date() }
          : streak
      )
    );
  };

  // Language switching functions
  const handleLanguageChange = (language: Language) => {
    setCurrentLanguage(language);
    setLanguage(language);
  };

  // Theme switching functions
  const handleThemeModeChange = (mode: ThemeMode) => {
    setThemeMode(mode);
    saveThemeSettings({ mode, color: themeColor });
  };

  const handleThemeColorChange = (color: ThemeColor) => {
    setThemeColor(color);
    saveThemeSettings({ mode: themeMode, color });
  };

  const handleReorderStreaks = (reorderedStreaks: Streak[]) => {
    // Order değerini güncelle
    const updatedStreaks = reorderedStreaks.map((streak, index) => ({
      ...streak,
      order: index,
    }));
    setStreaks(updatedStreaks);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100vh", // Fixed height instead of minHeight
          backgroundColor: "background.default",
          position: "relative",
          width: "100%",
          maxWidth: "100vw",
          overflow: "hidden", // Prevent body scroll
        }}
      >
        {/* Header with language switcher */}
        <AppBar
          position="sticky"
          sx={{
            color: "primary.main",
            backgroundColor: "background.paper",

            width: "100%",
            left: 0,
            right: 0,
            paddingTop: "env(safe-area-inset-top)",
            zIndex: 1100, // Material UI'ın AppBar z-index'i
            top: 0, // Sticky position için
          }}
        >
          <Toolbar>
            <Typography
              variant="h6"
              component="h1"
              sx={{
                flexGrow: 1,
                fontWeight: 700,
                fontSize: "1.25rem",
              }}
            >
              {t.appTitle}
            </Typography>

            {/* Settings button */}
            <IconButton
              onClick={() => setIsSettingsOpen(true)}
              sx={{
                color: "primary.main",
              }}
            >
              <SettingsIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        {/* Main content */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            minHeight: 0, // Important for flex shrinking
            overflow: "hidden",
          }}
        >
          <StreakList
            streaks={streaks}
            onIncrement={handleIncrementStreak}
            onDelete={handleDeleteStreak}
            onReset={handleResetStreak}
            onReorder={handleReorderStreaks}
            language={currentLanguage}
          />
        </Box>

        {/* Floating Action Button */}
        <Fab
          color="primary"
          aria-label={t.addStreak}
          onClick={() => setIsBottomSheetOpen(true)}
          sx={{
            position: "fixed",
            bottom: 24,
            right: 24,
            zIndex: 1000,
          }}
        >
          <AddIcon />
        </Fab>

        {/* Add Streak Bottom Sheet */}
        <AddStreakBottomSheet
          open={isBottomSheetOpen}
          onClose={() => setIsBottomSheetOpen(false)}
          onSubmit={handleAddStreak}
          language={currentLanguage}
        />

        {/* Settings Dialog */}
        <Settings
          open={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
          language={currentLanguage}
          onLanguageChange={handleLanguageChange}
          themeMode={themeMode}
          onThemeModeChange={handleThemeModeChange}
          themeColor={themeColor}
          onThemeColorChange={handleThemeColorChange}
        />
      </Box>
    </ThemeProvider>
  );
}

export default App;
