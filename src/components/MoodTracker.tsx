import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  Modal,
  Backdrop,
  Slide,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import type { MoodLevel, MoodEntry } from "../types";
import type { Language } from "../utils/i18n";
import { 
  addMoodEntry, 
  getTodayMood, 
  getMoodEmoji, 
  getMoodLabel
} from "../utils/mood";

interface MoodTrackerProps {
  open: boolean;
  onClose: () => void;
  language: Language;
  onMoodAdded?: (mood: MoodEntry) => void;
}

const MoodTracker: React.FC<MoodTrackerProps> = ({
  open,
  onClose,
  language,
  onMoodAdded,
}) => {
  const [selectedMood, setSelectedMood] = useState<MoodLevel | null>(null);
  const [todayMood, setTodayMood] = useState<MoodEntry | null>(null);

  useEffect(() => {
    if (open) {
      const existing = getTodayMood();
      setTodayMood(existing);
      if (existing) {
        setSelectedMood(existing.mood);
      } else {
        setSelectedMood(null);
      }
    }
  }, [open]);

  const handleSave = () => {
    if (selectedMood) {
      const moodEntry = addMoodEntry(selectedMood);
      onMoodAdded?.(moodEntry);
      onClose();
    }
  };

  const getMoodColor = (mood: MoodLevel): string => {
    const colors = {
      1: "#f44336", // Red
      2: "#ff9800", // Orange
      3: "#9e9e9e", // Grey
      4: "#4caf50", // Green
      5: "#2196f3", // Blue
    };
    return colors[mood];
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Slide direction="up" in={open} mountOnEnter unmountOnExit>
        <Box
          sx={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: "background.paper",
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            maxHeight: "70vh",
            p: 3,
          }}
        >
          {/* Header */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 3,
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              🌟 {language === 'tr' ? 'Ruh Hali Takibi' : 'Mood Tracker'}
            </Typography>
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Existing mood display */}
          {todayMood && (
            <Paper
              sx={{
                p: 2,
                mb: 3,
                backgroundColor: "primary.50",
                border: "1px solid",
                borderColor: "primary.200",
              }}
            >
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {language === 'tr' ? '✅ Bugünkü ruh halin kaydedildi:' : '✅ Today\'s mood recorded:'}
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography variant="h6">
                  {getMoodEmoji(todayMood.mood)}
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                  {getMoodLabel(todayMood.mood, language)}
                </Typography>
              </Box>
              <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                {language === 'tr' 
                  ? 'İstersen güncelle veya yarın tekrar gel!' 
                  : 'You can update it or come back tomorrow!'}
              </Typography>
            </Paper>
          )}

          {/* Mood selection */}
          <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
            {todayMood 
              ? (language === 'tr' ? 'Ruh halini güncelle:' : 'Update your mood:')
              : (language === 'tr' ? 'Bugün nasıl hissediyorsun?' : 'How are you feeling today?')
            }
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mb: 3,
              gap: 1,
            }}
          >
            {([1, 2, 3, 4, 5] as MoodLevel[]).map((mood) => (
              <Button
                key={mood}
                variant={selectedMood === mood ? "contained" : "outlined"}
                onClick={() => setSelectedMood(mood)}
                sx={{
                  flex: 1,
                  minWidth: 0,
                  height: 80,
                  flexDirection: "column",
                  gap: 0.5,
                  borderColor: getMoodColor(mood),
                  color: selectedMood === mood ? "white" : getMoodColor(mood),
                  backgroundColor: selectedMood === mood ? getMoodColor(mood) : "transparent",
                  "&:hover": {
                    backgroundColor: selectedMood === mood 
                      ? getMoodColor(mood) 
                      : `${getMoodColor(mood)}20`,
                    borderColor: getMoodColor(mood),
                  },
                }}
              >
                <Box sx={{ fontSize: "1.5rem" }}>
                  {getMoodEmoji(mood)}
                </Box>
                <Typography
                  variant="caption"
                  sx={{
                    fontSize: "0.7rem",
                    textAlign: "center",
                    lineHeight: 1,
                  }}
                >
                  {getMoodLabel(mood, language)}
                </Typography>
              </Button>
            ))}
          </Box>

          {/* Action buttons */}
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              variant="outlined"
              onClick={onClose}
              fullWidth
              sx={{
                borderRadius: 2,
                py: 1.5,
              }}
            >
              {language === 'tr' ? 'İptal' : 'Cancel'}
            </Button>
            <Button
              variant="contained"
              onClick={handleSave}
              disabled={!selectedMood}
              fullWidth
              sx={{
                borderRadius: 2,
                py: 1.5,
                backgroundColor: selectedMood ? getMoodColor(selectedMood) : undefined,
                "&:hover": {
                  backgroundColor: selectedMood ? `${getMoodColor(selectedMood)}dd` : undefined,
                },
              }}
            >
              {todayMood 
                ? (language === 'tr' ? 'Güncelle' : 'Update')
                : (language === 'tr' ? 'Kaydet' : 'Save')
              }
            </Button>
          </Box>
        </Box>
      </Slide>
    </Modal>
  );
};

export default MoodTracker;
