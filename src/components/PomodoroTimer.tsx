import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  IconButton,
  CircularProgress,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import TimerIcon from "@mui/icons-material/Timer";
import { savePomodoroEntry } from "../utils/pomodoro";
import { v4 as uuidv4 } from "uuid";
import { Sheet } from "react-modal-sheet";
import { getCurrentLanguage, useTranslations } from "../utils/i18n";
import ringSound from "../assets/ring.mp3";

const POMODORO_DURATION = 25 * 60; // 25 dakika
const SHORT_BREAK = 5 * 60; // 5 dakika
const LONG_BREAK = 15 * 60; // 15 dakika

const formatTime = (seconds: number) => {
  const m = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
};

const PomodoroTimer: React.FC<{
  open: boolean;
  onClose: () => void;
}> = ({ open, onClose }) => {
  const [mode, setMode] = useState<"work" | "short" | "long">("work");
  const [seconds, setSeconds] = useState(POMODORO_DURATION);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<number | null>(null);
  const [cycle, setCycle] = useState(0); // 4 pomodoro sonrası uzun mola
  const [startTime, setStartTime] = useState<string | null>(null);

  const theme = useTheme();
  const language = getCurrentLanguage();
  const t = useTranslations(language);

  // Timer intervali sadece seconds'ı azaltır
  useEffect(() => {
    if (running) {
      intervalRef.current = window.setInterval(() => {
        setSeconds((s) => (s > 0 ? s - 1 : 0));
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running]);

  // Sadece seconds 0 olduğunda ve running true ise handleFinish çağır
  useEffect(() => {
    if (running && seconds === 0) {
      handleFinish();
    }
    // eslint-disable-next-line
  }, [seconds, running]);

  const handleFinish = () => {
    setRunning(false);
    if (startTime) {
      try {
        const now = new Date();
        savePomodoroEntry({
          id: uuidv4(),
          type: mode,
          date: now.toISOString().slice(0, 10),
          start: startTime,
          end: now.toISOString(),
        });
      } catch (e) {
        console.error("Pomodoro geçmişi kaydedilemedi", e);
      }
    }
    setStartTime(null);
    if (mode === "work") {
      if ((cycle + 1) % 4 === 0) {
        setMode("long");
        setSeconds(LONG_BREAK);
      } else {
        setMode("short");
        setSeconds(SHORT_BREAK);
      }
      setCycle((c) => c + 1);
    } else {
      setMode("work");
      setSeconds(POMODORO_DURATION);
    }
    if (typeof window !== "undefined") {
      try {
        new Audio(ringSound).play();
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleStart = () => {
    setRunning(true);
    if (!startTime) setStartTime(new Date().toISOString());
  };
  const handlePause = () => setRunning(false);
  const handleReset = () => {
    setRunning(false);
    setStartTime(null);
    if (mode === "work") setSeconds(POMODORO_DURATION);
    else if (mode === "short") setSeconds(SHORT_BREAK);
    else setSeconds(LONG_BREAK);
  };

  const handleModeChange = (newMode: "work" | "short" | "long") => {
    setMode(newMode);
    setRunning(false);
    setStartTime(null);
    if (newMode === "work") setSeconds(POMODORO_DURATION);
    else if (newMode === "short") setSeconds(SHORT_BREAK);
    else setSeconds(LONG_BREAK);
  };

  const progress = () => {
    if (mode === "work") return (seconds / POMODORO_DURATION) * 100;
    if (mode === "short") return (seconds / SHORT_BREAK) * 100;
    return (seconds / LONG_BREAK) * 100;
  };

  return (
    <Sheet isOpen={open} onClose={onClose} snapPoints={[0.5]} initialSnap={0}>
      <Sheet.Container
        style={{
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
        }}
      >
        <Sheet.Header>
          {/* Handle Bar */}
          <Box
            sx={{
              width: 40,
              height: 4,
              backgroundColor: "text.secondary",
              opacity: 0.3,
              borderRadius: 2,
              mx: "auto",
              mb: 2,
            }}
          />

          {/* Title */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              px: 3,
              pb: 2,
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontWeight: 600, color: "text.primary" }}
            >
              <TimerIcon sx={{ mr: 1, verticalAlign: "middle" }} />
              {t.pomodoroTitle}
            </Typography>
            <IconButton
              onClick={onClose}
              edge="end"
              sx={{
                backgroundColor: "action.hover",
                width: 32,
                height: 32,
                "&:hover": {
                  backgroundColor: "action.selected",
                },
              }}
            >
              <CloseIcon sx={{ fontSize: 20 }} />
            </IconButton>
          </Box>
        </Sheet.Header>

        <Sheet.Content
          style={{
            backgroundColor: theme.palette.background.default,
          }}
        >
          <Box
            sx={{ px: 3, pb: 2, pt: 2, maxHeight: "70vh", overflowY: "auto" }}
          >
            <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
              <Button
                variant={mode === "work" ? "contained" : "outlined"}
                color="primary"
                onClick={() => handleModeChange("work")}
                sx={{ flex: 1 }}
              >
                {t.pomodoroWork}
              </Button>
              <Button
                variant={mode === "short" ? "contained" : "outlined"}
                color="success"
                onClick={() => handleModeChange("short")}
                sx={{ flex: 1 }}
              >
                {t.pomodoroShort}
              </Button>
              <Button
                variant={mode === "long" ? "contained" : "outlined"}
                color="secondary"
                onClick={() => handleModeChange("long")}
                sx={{ flex: 1 }}
              >
                {t.pomodoroLong}
              </Button>
            </Box>

            {/* Progress Indicator */}
            <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
              <Box sx={{ position: "relative", display: "inline-flex" }}>
                <CircularProgress
                  variant="determinate"
                  value={progress()}
                  size={160}
                  thickness={4}
                  sx={{ color: theme.palette.primary.main }}
                />
                <Box
                  sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: "absolute",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    variant="h4"
                    component="div"
                    color="text.primary"
                    fontWeight={700}
                  >
                    {formatTime(seconds)}
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Box sx={{ display: "flex", gap: 2 }}>
              {running ? (
                <Button
                  onClick={handlePause}
                  variant="outlined"
                  color="primary"
                  fullWidth
                >
                  {t.pomodoroPause}
                </Button>
              ) : (
                <Button
                  onClick={handleStart}
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  {t.pomodoroStart}
                </Button>
              )}
              <Button
                onClick={handleReset}
                variant="outlined"
                color="secondary"
                fullWidth
              >
                {t.pomodoroReset}
              </Button>
            </Box>
          </Box>
        </Sheet.Content>
      </Sheet.Container>
    </Sheet>
  );
};

export default PomodoroTimer;
