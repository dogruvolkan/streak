import { useState, useEffect } from "react";
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Fab,
  Box,
  IconButton,
  Menu,
  MenuItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import LanguageIcon from "@mui/icons-material/Language";
import StreakList from "./components/StreakList";
import AddStreakBottomSheet from "./components/AddStreakBottomSheet";
import type { Streak, CreateStreakFormData } from "./types";
import { loadStreaks, saveStreaks, generateId } from "./utils/localStorage";
import { initAudio, getAudioEnabled } from "./utils/audio";
import {
  getCurrentLanguage,
  setLanguage,
  useTranslations,
  type Language,
} from "./utils/i18n";

const theme = createTheme({
  palette: {
    primary: {
      main: "#7c3aed", // Mor
      light: "#a855f7",
      dark: "#5b21b6",
    },
    secondary: {
      main: "#10b981", // Yeşil
      light: "#34d399",
      dark: "#059669",
    },
    background: {
      default: "#f1f5f9",
      paper: "#ffffff",
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
          borderBottom: "1px solid rgba(0, 0, 0, 0.08)",
        },
      },
    },
  },
});

function App() {
  const [streaks, setStreaks] = useState<Streak[]>([]);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState<Language>("en");
  const [languageMenuAnchor, setLanguageMenuAnchor] =
    useState<null | HTMLElement>(null);

  const t = useTranslations(currentLanguage); // Load streaks from localStorage on component mount
  useEffect(() => {
    const loadedStreaks = loadStreaks();
    setStreaks(loadedStreaks);
    setIsLoaded(true);

    // Load language preference
    const savedLanguage = getCurrentLanguage();
    setCurrentLanguage(savedLanguage);

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
  const handleLanguageMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setLanguageMenuAnchor(event.currentTarget);
  };

  const handleLanguageMenuClose = () => {
    setLanguageMenuAnchor(null);
  };

  const handleLanguageChange = (language: Language) => {
    setCurrentLanguage(language);
    setLanguage(language);
    setLanguageMenuAnchor(null);
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

            {/* Language switcher */}
            <IconButton
              onClick={handleLanguageMenuOpen}
              sx={{
                color: "primary.main",
              }}
            >
              <LanguageIcon />
            </IconButton>

            <Menu
              anchorEl={languageMenuAnchor}
              open={Boolean(languageMenuAnchor)}
              onClose={handleLanguageMenuClose}
              sx={{
                "& .MuiPaper-root": {
                  mt: 1.5,
                  minWidth: 120,
                },
              }}
            >
              <MenuItem
                onClick={() => handleLanguageChange("en")}
                selected={currentLanguage === "en"}
              >
                <ListItemIcon>🇺🇸</ListItemIcon>
                <ListItemText>English</ListItemText>
              </MenuItem>
              <MenuItem
                onClick={() => handleLanguageChange("tr")}
                selected={currentLanguage === "tr"}
              >
                <ListItemIcon>🇹🇷</ListItemIcon>
                <ListItemText>Türkçe</ListItemText>
              </MenuItem>
            </Menu>
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
      </Box>
    </ThemeProvider>
  );
}

export default App;
