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
  Badge,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SettingsIcon from "@mui/icons-material/Settings";
import BarChartIcon from "@mui/icons-material/BarChart";
import Statistics from "./components/Statistics";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import StreakList from "./components/StreakList";
import AddStreakBottomSheet from "./components/AddStreakBottomSheet";
import Settings from "./components/Settings";
import SharedStreakViewer from "./components/SharedStreakViewer";
import BadgeViewer from "./components/BadgeViewer";
import ConfettiComponent from "./components/ConfettiComponent";
import type { Streak, CreateStreakFormData, UserBadges } from "./types";
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
import {
  isSharedStreakURL,
  getSharedStreakFromURL,
  type SharedStreakData,
} from "./utils/sharing";
import {
  loadUserBadges,
  saveUserBadges,
  checkBadgeUnlocks,
} from "./utils/badges";
import { celebrateAchievement, setConfettiCallback } from "./utils/confetti";

function App() {
  const [streaks, setStreaks] = useState<Streak[]>([]);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState<Language>("en");
  const [themeMode, setThemeMode] = useState<ThemeMode>("light");
  const [themeColor, setThemeColor] = useState<ThemeColor>("purple");
  const [isSharedView, setIsSharedView] = useState(false);
  const [sharedStreakData, setSharedStreakData] =
    useState<SharedStreakData | null>(null);

  // Badge system state
  const [userBadges, setUserBadges] = useState<UserBadges | null>(null);
  const [isBadgeViewerOpen, setIsBadgeViewerOpen] = useState(false);
  const [isStatisticsOpen, setIsStatisticsOpen] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

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
    // Check if this is a shared streak URL
    if (isSharedStreakURL()) {
      const sharedData = getSharedStreakFromURL();
      if (sharedData) {
        setSharedStreakData(sharedData);
        setIsSharedView(true);
      }
    }

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

    // Load user badges
    const badges = loadUserBadges(currentLanguage);
    setUserBadges(badges);
  }, [currentLanguage]);

  // Save streaks to localStorage whenever streaks state changes (but not on initial load)
  useEffect(() => {
    if (isLoaded) {
      saveStreaks(streaks);
    }
  }, [streaks, isLoaded]);

  // Update badge translations when language changes
  useEffect(() => {
    if (userBadges) {
      const updatedBadges = loadUserBadges(currentLanguage);
      setUserBadges(updatedBadges);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLanguage]);

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
      category: formData.category,
      emoji: formData.emoji,
      // Quantity-based fields
      isQuantityBased: formData.isQuantityBased,
      dailyGoal: formData.dailyGoal,
      unit: formData.unit,
      dailyProgress: 0,
      lastProgressDate: undefined,
    };

    setStreaks((prevStreaks) => {
      const updatedStreaks = [...prevStreaks, newStreak];

      // Check for badge unlocks after adding new streak
      if (userBadges) {
        const { newBadges, updatedBadges } = checkBadgeUnlocks(
          updatedStreaks,
          userBadges
        );

        if (newBadges.length > 0) {
          setUserBadges(updatedBadges);
          saveUserBadges(updatedBadges);

          // Show notification for the first new badge
          const newBadge = updatedBadges.badges.find(
            (b) => b.id === newBadges[0]
          );
          if (newBadge) {
            // Celebrate with confetti for the first streak badge
            if (newBadge.id === "first_step") {
              celebrateAchievement();
            }
          }
        }
      }

      return updatedStreaks;
    });
  };

  const handleIncrementStreak = (streakId: string, quantity: number = 1) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    setStreaks((prevStreaks) => {
      const updatedStreaks = prevStreaks.map((streak) => {
        if (streak.id !== streakId) return streak;

        const lastUpdateDate = new Date(streak.lastUpdated);
        lastUpdateDate.setHours(0, 0, 0, 0);

        // Miktar bazlı streakler için özel logic
        if (streak.isQuantityBased) {
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

          return {
            ...streak,
            dailyProgress: newProgress,
            lastProgressDate: today,
            lastUpdated: new Date(),
            count: shouldIncrementCount ? streak.count + 1 : streak.count,
          };
        }

        // Normal streakler için existing logic
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
      });

      // Check for badge unlocks after streak update
      if (userBadges) {
        const { newBadges, updatedBadges } = checkBadgeUnlocks(
          updatedStreaks,
          userBadges
        );

        if (newBadges.length > 0) {
          setUserBadges(updatedBadges);
          saveUserBadges(updatedBadges);

          // Show notification for the first new badge
          const newBadge = updatedBadges.badges.find(
            (b) => b.id === newBadges[0]
          );
          if (newBadge) {
            // Celebrate with confetti for special badges
            if (
              [
                "first_step",
                "triple_threat",
                "weekly_warrior",
                "streak_master",
                "century_club",
                "perfectionist",
                "consistency_master",
                "unstoppable",
                "legend",
                "marathon_runner",
              ].includes(newBadge.id)
            ) {
              celebrateAchievement();
            }
          }
        }
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
          ? { ...streak, count: 0, lastUpdated: new Date() }
          : streak
      )
    );
  };

  const handleClearData = () => {
    // Clear all localStorage data
    localStorage.removeItem("streakApp_streaks");
    localStorage.removeItem("userBadges");
    localStorage.removeItem("streakApp_language");
    localStorage.removeItem("streakApp_themeMode");
    localStorage.removeItem("streakApp_themeColor");
    localStorage.removeItem("streakApp_audioEnabled");

    // Reset all state to initial values
    setStreaks([]);
    setUserBadges(null);

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

  const handleReorderStreaks = (reorderedStreaks: Streak[]) => {
    // Order değerini güncelle
    const updatedStreaks = reorderedStreaks.map((streak, index) => ({
      ...streak,
      order: index,
    }));
    setStreaks(updatedStreaks);
  };

  const handleBackFromShared = () => {
    setIsSharedView(false);
    setSharedStreakData(null);
    // Clear the hash from URL
    if (typeof window !== "undefined") {
      window.location.hash = "";
    }
  };

  // If this is a shared view, render the SharedStreakViewer
  if (isSharedView && sharedStreakData) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SharedStreakViewer
          sharedData={sharedStreakData}
          onBack={handleBackFromShared}
        />
      </ThemeProvider>
    );
  }

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
            zIndex: 1300, // Higher z-index to stay above everything
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

            {/* Badge button */}
            <IconButton
              onClick={() => setIsBadgeViewerOpen(true)}
              sx={{
                color: "primary.main",
                mr: 1,
              }}
            >
              <Badge
                badgeContent={userBadges?.totalUnlocked || 0}
                color="secondary"
                sx={{
                  "& .MuiBadge-badge": {
                    fontSize: "0.7rem",
                    minWidth: "18px",
                    height: "18px",
                  },
                }}
              >
                <EmojiEventsIcon />
              </Badge>
            </IconButton>

            {/* Statistics button */}
            <IconButton
              onClick={() => setIsStatisticsOpen(true)}
              sx={{
                color: "primary.main",
                mr: 1,
              }}
            >
              <BarChartIcon />
            </IconButton>

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
            mt: "64px", // Standard AppBar height
            paddingTop: "env(safe-area-inset-top)", // Additional padding for notch
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
          onClearData={handleClearData}
        />

        {/* Badge Viewer Dialog */}
        {userBadges && (
          <BadgeViewer
            open={isBadgeViewerOpen}
            onClose={() => setIsBadgeViewerOpen(false)}
            userBadges={userBadges}
            language={currentLanguage}
          />
        )}

        {/* Statistics Dialog */}
        <Statistics
          open={isStatisticsOpen}
          onClose={() => setIsStatisticsOpen(false)}
          streaks={streaks}
          language={currentLanguage}
        />

        {/* Confetti Component */}
        <ConfettiComponent
          active={showConfetti}
          onComplete={() => setShowConfetti(false)}
        />
      </Box>
    </ThemeProvider>
  );
}

export default App;
