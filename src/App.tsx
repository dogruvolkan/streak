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
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import MoodIcon from "@mui/icons-material/Mood";
import TimerIcon from "@mui/icons-material/Timer";
import StreakList from "./components/StreakList";
import WeeklyCalendar from "./components/WeeklyCalendar";
import AddStreakBottomSheet from "./components/AddStreakBottomSheet";
import EditStreakBottomSheet from "./components/EditStreakBottomSheet";
import StreakDetailBottomSheet from "./components/StreakDetailBottomSheet";
import HelpBottomSheet from "./components/HelpBottomSheet";
import Settings from "./components/Settings";
import ConfettiComponent from "./components/ConfettiComponent";
import MoodTracker from "./components/MoodTracker";
import PomodoroTimer from "./components/PomodoroTimer";
import PomodoroHistoryBottomSheet from "./components/PomodoroHistoryBottomSheet";
import type {
  Streak,
  CreateStreakFormData,
  FreeDaySettings,
  PomodoroHistoryEntry,
} from "./types";
import {
  loadStreaks,
  saveStreaks,
  generateId,
  loadFreeDaySettings,
  saveFreeDaySettings,
  shouldShowFreeDayConfetti,
  isTodayFreeDay,
} from "./utils/localStorage";
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
import { celebrateAchievement, setConfettiCallback } from "./utils/confetti";
import { getTodayMood, getMoodEmoji } from "./utils/mood";
import { getPomodoroHistory } from "./utils/pomodoro";

function App() {
  const [streaks, setStreaks] = useState<Streak[]>([]);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [isEditBottomSheetOpen, setIsEditBottomSheetOpen] = useState(false);
  const [isDetailBottomSheetOpen, setIsDetailBottomSheetOpen] = useState(false);
  const [editingStreak, setEditingStreak] = useState<Streak | null>(null);
  const [detailStreak, setDetailStreak] = useState<Streak | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState<Language>("en");
  const [themeMode, setThemeMode] = useState<ThemeMode>("light");
  const [themeColor, setThemeColor] = useState<ThemeColor>("purple");
  const [freeDaySettings, setFreeDaySettings] = useState<FreeDaySettings>({
    enabled: true,
    dayOfWeek: 0, // Sunday default
  });

  const [showConfetti, setShowConfetti] = useState(false);
  const [isMoodTrackerOpen, setIsMoodTrackerOpen] = useState(false);
  const [isPomodoroOpen, setIsPomodoroOpen] = useState(false);
  const [isPomodoroHistoryOpen, setIsPomodoroHistoryOpen] = useState(false);
  const [pomodoroHistoryDate, setPomodoroHistoryDate] = useState<string>("");
  const [pomodoroHistoryEntries, setPomodoroHistoryEntries] = useState<
    PomodoroHistoryEntry[]
  >([]);

  const t = useTranslations(currentLanguage);
  const theme = createAppTheme(themeMode, themeColor);

  // Set up confetti callback
  useEffect(() => {
    setConfettiCallback(() => {
      setShowConfetti(true);
    });

    return () => {
      setConfettiCallback(null);
    };
  }, []);

  // Load streaks from localStorage on component mount
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

    // Load free day settings
    const savedFreeDaySettings = loadFreeDaySettings();
    setFreeDaySettings(savedFreeDaySettings);

    // Check if we should show free day confetti
    if (shouldShowFreeDayConfetti(savedFreeDaySettings)) {
      // Show confetti after a small delay for better UX
      setTimeout(() => {
        setShowConfetti(true);
        // Update last shown date
        const updatedSettings = {
          ...savedFreeDaySettings,
          lastShownDate: new Date(),
        };
        saveFreeDaySettings(updatedSettings);
        setFreeDaySettings(updatedSettings);
      }, 1000);
    }

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
      lastUpdated: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 gün önce, böylece bugün tıklanmamış görünür
      order: streaks.length, // Yeni streak en sona eklenir
      category: formData.category,
      emoji: formData.emoji,
      // Quantity-based fields
      isQuantityBased: formData.isQuantityBased,
      dailyGoal: formData.dailyGoal,
      unit: formData.unit,
      dailyProgress: 0,
      lastProgressDate: undefined,
      // History field
      history: [],
    };

    setStreaks((prevStreaks) => {
      const updatedStreaks = [...prevStreaks, newStreak];

      // Her yeni streak eklendiğinde confetti çıkar
      celebrateAchievement();

      return updatedStreaks;
    });
  };

  const handleIncrementStreak = (streakId: string, quantity: number = 1) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const now = new Date(); // Current timestamp

    setStreaks((prevStreaks) => {
      let hasChanges = false;

      const updatedStreaks = prevStreaks.map((streak) => {
        if (streak.id !== streakId) return streak;

        const lastUpdateDate = new Date(streak.lastUpdated);
        lastUpdateDate.setHours(0, 0, 0, 0);

        // History entry oluştur
        const historyEntry = {
          date: today,
          timestamp: now,
          quantity: streak.isQuantityBased ? quantity : undefined,
        };

        // Miktar bazlı streakler için özel logic
        if (streak.isQuantityBased) {
          // Haftalık repeat type için gün kontrolü (sadece selectedDays varsa)
          if (
            streak.repeatType === "week" &&
            streak.selectedDays &&
            streak.selectedDays.length > 0
          ) {
            const todayDayOfWeek = today.getDay();
            if (!streak.selectedDays.includes(todayDayOfWeek)) {
              return streak; // Bu gün seçili değil, değişiklik yapma
            }
          }
          // Weekly streak selectedDays yoksa veya boşsa, haftada bir kere her gün tıklanabilir

          const lastProgressDate = streak.lastProgressDate
            ? new Date(streak.lastProgressDate)
            : null;
          lastProgressDate?.setHours(0, 0, 0, 0);

          const isToday = lastProgressDate?.getTime() === today.getTime();
          const currentProgress = isToday ? streak.dailyProgress || 0 : 0;
          const newProgress = currentProgress + quantity;
          const dailyGoal = streak.dailyGoal || 1;

          // Eğer günlük hedefi aştıysa count'u artır
          const shouldIncrementCount =
            currentProgress < dailyGoal && newProgress >= dailyGoal;

          hasChanges = true; // Miktar bazlı streakler için her zaman değişiklik var

          return {
            ...streak,
            dailyProgress: newProgress,
            lastProgressDate: today,
            lastUpdated: now,
            count: shouldIncrementCount ? streak.count + 1 : streak.count,
            history: [...(streak.history || []), historyEntry],
          };
        }

        // Normal streakler için limit kontrolleri
        const canClickBasedOnRepeatType = () => {
          // Haftalık repeat type için gün kontrolü (sadece selectedDays varsa)
          if (
            streak.repeatType === "week" &&
            streak.selectedDays &&
            streak.selectedDays.length > 0
          ) {
            const todayDayOfWeek = today.getDay();
            if (!streak.selectedDays.includes(todayDayOfWeek)) {
              return false; // Bu gün seçili değil
            }
          }
          // Weekly streak selectedDays yoksa veya boşsa, haftada bir kere her gün tıklanabilir

          // Zaten bugün/bu periyotta tıklanmış mı kontrol et - history array kullan
          if (streak.repeatType === "day") {
            // Bugün history'de var mı?
            if (!streak.history || streak.history.length === 0) {
              return true; // Hiç tıklanmamış, tıklanabilir
            }

            return !streak.history.some((entry) => {
              const entryDate = new Date(entry.date);
              entryDate.setHours(0, 0, 0, 0);
              return entryDate.getTime() === today.getTime();
            });
          }

          // Haftalık repeat için - bu hafta tıklanmış mı kontrol et
          if (streak.repeatType === "week") {
            if (!streak.history || streak.history.length === 0) {
              return true; // Hiç tıklanmamış, tıklanabilir
            }

            const startOfWeek = new Date(today);
            const dayOfWeek = today.getDay();
            startOfWeek.setDate(today.getDate() - dayOfWeek);
            startOfWeek.setHours(0, 0, 0, 0);

            const endOfWeek = new Date(startOfWeek);
            endOfWeek.setDate(startOfWeek.getDate() + 6);
            endOfWeek.setHours(23, 59, 59, 999);

            // Bu hafta içinde herhangi bir tıklama var mı?
            const hasClickThisWeek = streak.history.some((entry) => {
              const entryDate = new Date(entry.date);
              return entryDate >= startOfWeek && entryDate <= endOfWeek;
            });

            return !hasClickThisWeek; // Bu hafta tıklanmamışsa tıklanabilir
          }

          // Aylık repeat için - bu ay tıklanmış mı kontrol et
          if (streak.repeatType === "month") {
            // History array'ini kontrol et
            if (!streak.history || streak.history.length === 0) {
              return true; // Hiç tıklanmamış, tıklanabilir
            }

            const startOfMonth = new Date(
              today.getFullYear(),
              today.getMonth(),
              1
            );
            const endOfMonth = new Date(
              today.getFullYear(),
              today.getMonth() + 1,
              0
            );
            endOfMonth.setHours(23, 59, 59, 999);

            // Bu ay içinde herhangi bir tıklama var mı?
            const hasClickThisMonth = streak.history.some((entry) => {
              const entryDate = new Date(entry.date);
              return entryDate >= startOfMonth && entryDate <= endOfMonth;
            });

            return !hasClickThisMonth; // Bu ay tıklanmamışsa tıklanabilir
          }

          return true;
        };

        if (!canClickBasedOnRepeatType()) {
          return streak; // Tıklanamaz durumda
        }

        hasChanges = true; // Normal streakler için değişiklik var

        // Normal streakler için count artır
        return {
          ...streak,
          count: streak.count + 1,
          lastUpdated: now,
          history: [...(streak.history || []), historyEntry],
        };
      });

      // Sadece gerçekten değişiklik varsa confetti çıkar
      if (hasChanges) {
        celebrateAchievement();
      }

      return updatedStreaks;
    });
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
          ? {
              ...streak,
              count: 0,
              lastUpdated: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 gün önce, böylece bugün tıklanmamış görünür
              dailyProgress: 0,
              lastProgressDate: undefined,
              history: [], // History'yi temizle
            }
          : streak
      )
    );
  };

  const handleClearData = () => {
    // Clear all localStorage data
    localStorage.removeItem("streakApp_streaks");
    localStorage.removeItem("streakApp_language");
    localStorage.removeItem("streakApp_themeMode");
    localStorage.removeItem("streakApp_themeColor");
    localStorage.removeItem("streakApp_audioEnabled");

    // Reset all state to initial values
    setStreaks([]);

    // Show success message (you could add a toast notification here)
    setTimeout(() => {
      window.location.reload(); // Reload to reset everything
    }, 100);
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

  const handleFreeDaySettingsChange = (settings: FreeDaySettings) => {
    setFreeDaySettings(settings);
    saveFreeDaySettings(settings);
  };

  const handleReorderStreaks = (reorderedStreaks: Streak[]) => {
    // Order değerini güncelle
    const updatedStreaks = reorderedStreaks.map((streak, index) => ({
      ...streak,
      order: index,
    }));
    setStreaks(updatedStreaks);
  };

  const handleEditStreak = (streakId: string) => {
    const streak = streaks.find((s) => s.id === streakId);
    if (streak) {
      setEditingStreak(streak);
      setIsEditBottomSheetOpen(true);
    }
  };

  const handleDetailStreak = (streakId: string) => {
    const streak = streaks.find((s) => s.id === streakId);
    if (streak) {
      setDetailStreak(streak);
      setIsDetailBottomSheetOpen(true);
    }
  };

  const handleSaveEditedStreak = (
    streakId: string,
    updates: Partial<Streak>
  ) => {
    setStreaks((prevStreaks) =>
      prevStreaks.map((streak) =>
        streak.id === streakId
          ? { ...streak, ...updates, lastUpdated: new Date() }
          : streak
      )
    );
    setIsEditBottomSheetOpen(false);
    setEditingStreak(null);
  };

  // Takvimde bir güne tıklanınca Pomodoro geçmişini aç
  const handleCalendarDayClick = (date: Date) => {
    const dateStr = date.toISOString().slice(0, 10);
    setPomodoroHistoryDate(dateStr);
    setPomodoroHistoryEntries(getPomodoroHistory(dateStr));
    setIsPomodoroHistoryOpen(true);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          backgroundColor: "background.default",
          position: "relative",
          width: "100%",
          maxWidth: "100vw",
          overflow: "hidden",
        }}
      >
        {/* Header with settings button */}
        <AppBar
          position="fixed"
          sx={{
            color: "primary.main",
            backgroundColor: "background.paper",
            width: "100%",
            left: 0,
            right: 0,
            top: 0,
            paddingTop: "env(safe-area-inset-top)",
            zIndex: 1300,
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
            {/* Help button */}
            <IconButton
              onClick={() => setIsHelpOpen(true)}
              sx={{ color: "primary.main", mr: 1 }}
            >
              <HelpOutlineIcon />
            </IconButton>
            {/* Pomodoro Timer button */}
            <IconButton
              onClick={() => setIsPomodoroOpen(true)}
              sx={{ color: "primary.main", mr: 1 }}
            >
              <TimerIcon />
            </IconButton>
            {/* Mood Tracker button */}
            <IconButton
              onClick={() => setIsMoodTrackerOpen(true)}
              sx={{ color: "primary.main", mr: 1 }}
            >
              <MoodIcon />
              {getTodayMood() && (
                <Box
                  sx={{
                    position: "absolute",
                    top: -2,
                    right: -2,
                    fontSize: "0.75rem",
                    backgroundColor: "background.paper",
                    borderRadius: "50%",
                    minWidth: 18,
                    height: 18,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "1px solid",
                    borderColor: "primary.main",
                  }}
                >
                  {getMoodEmoji(getTodayMood()!.mood)}
                </Box>
              )}
            </IconButton>
            {/* Settings button */}
            <IconButton
              onClick={() => setIsSettingsOpen(true)}
              sx={{ color: "primary.main" }}
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
            mt: "64px", // Standard AppBar height
            paddingTop: "env(safe-area-inset-top)", // Additional padding for notch
          }}
        >
          {/* Weekly Calendar */}
          <WeeklyCalendar
            language={currentLanguage}
            streaks={streaks}
            onDayClick={handleCalendarDayClick}
          />

          <StreakList
            streaks={streaks}
            onIncrement={handleIncrementStreak}
            onDelete={handleDeleteStreak}
            onReset={handleResetStreak}
            onEdit={handleEditStreak}
            onDetail={handleDetailStreak}
            onReorder={handleReorderStreaks}
            language={currentLanguage}
            isTodayFreeDay={isTodayFreeDay(freeDaySettings)}
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
          onClearData={handleClearData}
          freeDaySettings={freeDaySettings}
          onFreeDaySettingsChange={handleFreeDaySettingsChange}
        />

        {/* Edit Streak Bottom Sheet */}
        <EditStreakBottomSheet
          open={isEditBottomSheetOpen}
          onClose={() => {
            setIsEditBottomSheetOpen(false);
            setEditingStreak(null);
          }}
          streak={editingStreak}
          onSave={handleSaveEditedStreak}
          language={currentLanguage}
        />

        {/* Streak Detail Bottom Sheet */}
        <StreakDetailBottomSheet
          open={isDetailBottomSheetOpen}
          onClose={() => {
            setIsDetailBottomSheetOpen(false);
            setDetailStreak(null);
          }}
          streak={detailStreak}
          language={currentLanguage}
        />

        {/* Help Bottom Sheet */}
        <HelpBottomSheet
          open={isHelpOpen}
          onClose={() => setIsHelpOpen(false)}
          language={currentLanguage}
        />

        {/* Mood Tracker Bottom Sheet */}
        <MoodTracker
          open={isMoodTrackerOpen}
          onClose={() => setIsMoodTrackerOpen(false)}
          language={currentLanguage}
        />

        {/* Confetti Component */}
        <ConfettiComponent
          active={showConfetti}
          onComplete={() => setShowConfetti(false)}
        />

        {/* Pomodoro Timer Modal */}
        <PomodoroTimer
          open={isPomodoroOpen}
          onClose={() => setIsPomodoroOpen(false)}
        />

        {/* Pomodoro History Bottom Sheet */}
        <PomodoroHistoryBottomSheet
          open={isPomodoroHistoryOpen}
          onClose={() => setIsPomodoroHistoryOpen(false)}
          entries={pomodoroHistoryEntries}
          date={pomodoroHistoryDate}
        />
      </Box>
    </ThemeProvider>
  );
}

export default App;
