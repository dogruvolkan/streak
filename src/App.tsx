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
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import StreakList from "./components/StreakList";
import AddStreakBottomSheet from "./components/AddStreakBottomSheet";
import type { Streak, CreateStreakFormData } from "./types";
import { loadStreaks, saveStreaks, generateId } from "./utils/localStorage";

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

  // Load streaks from localStorage on component mount
  useEffect(() => {
    const loadedStreaks = loadStreaks();
    setStreaks(loadedStreaks);
    setIsLoaded(true);
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

  const handleReorderStreaks = (reorderedStreaks: Streak[]) => {
    // Order değerlerini güncelle
    const streaksWithUpdatedOrder = reorderedStreaks.map((streak, index) => ({
      ...streak,
      order: index,
    }));
    setStreaks(streaksWithUpdatedOrder);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100vh", // Fixed viewport height
          backgroundColor: "background.default",
          position: "relative",
          overflow: "hidden",
          width: "100%",
          maxWidth: "100vw",
        }}
      >
        {/* Header - Safe Area için padding */}
        <AppBar
          position="sticky"
          elevation={0}
          sx={{
            backgroundColor: "background.paper",
            color: "text.primary",
            width: "100%",
            left: 0,
            right: 0,
            paddingTop: "env(safe-area-inset-top)",
          }}
        >
          <Toolbar
            sx={{
              minHeight: 56,
              px: 2,
              width: "100%",
            }}
          >
            <Typography
              variant="h6"
              component="div"
              sx={{
                flexGrow: 1,
                textAlign: "center",
                fontWeight: 700,
                color: "primary.main",
              }}
            >
              Streak Tracker
            </Typography>
          </Toolbar>
        </AppBar>

        {/* Main Content Area */}
        <Box
          sx={{
            flex: 1,
            overflow: "hidden", // Parent'ta hidden, child'da scroll
            width: "100%",
            paddingBottom: "env(safe-area-inset-bottom)",
            height: "calc(100vh - 56px)", // AppBar height'ını çıkar
            // Mobil için touch action
            touchAction: "pan-y",
            position: "relative",
          }}
        >
          <StreakList
            streaks={streaks}
            onIncrementStreak={handleIncrementStreak}
            onDeleteStreak={handleDeleteStreak}
            onResetStreak={handleResetStreak}
            onReorderStreaks={handleReorderStreaks}
          />
        </Box>

        {/* Floating Action Button - Safe Area için padding */}
        <Fab
          color="primary"
          aria-label="add"
          onClick={() => setIsBottomSheetOpen(true)}
          sx={{
            position: "fixed",
            bottom: "max(16px, env(safe-area-inset-bottom))",
            right: 16,
            width: 64,
            height: 64,
            boxShadow: "0 8px 32px rgba(124, 58, 237, 0.3)",
            "&:hover": {
              transform: "scale(1.05)",
              boxShadow: "0 12px 40px rgba(124, 58, 237, 0.4)",
            },
            transition: "all 0.2s ease-in-out",
          }}
        >
          <AddIcon sx={{ fontSize: 32 }} />
        </Fab>

        <AddStreakBottomSheet
          open={isBottomSheetOpen}
          onClose={() => setIsBottomSheetOpen(false)}
          onSubmit={handleAddStreak}
        />
      </Box>
    </ThemeProvider>
  );
}

export default App;
