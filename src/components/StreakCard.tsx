import React, { useState } from "react";
import { Card, Typography, Button, Box, Chip, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { useSwipeable } from "react-swipeable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { Streak } from "../types";
import { getRepeatTypeDisplayText } from "../utils/localStorage";
import { combinedFeedback } from "../utils/haptic";

interface StreakCardProps {
  streak: Streak;
  onIncrement: (streakId: string) => void;
  onDelete: (streakId: string) => void;
  onReset: (streakId: string) => void;
}

const StreakCard: React.FC<StreakCardProps> = ({
  streak,
  onIncrement,
  onDelete,
  onReset,
}) => {
  const [isSwipedOpen, setIsSwipedOpen] = useState(false);
  const [isShaking, setIsShaking] = useState(false); // Titreşim state'i

  // Drag and drop için sortable hook
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: streak.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const handleIncrement = () => {
    // Combined haptic and audio feedback
    combinedFeedback.increment();

    // Visual shake animation
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 300); // 300ms sonra animasyonu bitir

    onIncrement(streak.id);
  };

  const handleDelete = () => {
    combinedFeedback.delete(); // Combined delete feedback
    onDelete(streak.id);
    setIsSwipedOpen(false);
  };

  const handleReset = () => {
    combinedFeedback.reset(); // Combined reset feedback
    onReset(streak.id);
    setIsSwipedOpen(false);
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => !isDragging && setIsSwipedOpen(true),
    onSwipedRight: () => !isDragging && setIsSwipedOpen(false),
    trackMouse: true,
    preventScrollOnSwipe: true, // Scroll ile çakışmayı önle
  });

  // Bugün tıklandı mı kontrol et
  const isClickedToday = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const lastUpdateDate = new Date(streak.lastUpdated);
    lastUpdateDate.setHours(0, 0, 0, 0);

    if (streak.repeatType === "day") {
      return lastUpdateDate.getTime() === today.getTime() && streak.count > 0;
    }

    if (streak.repeatType === "week" && streak.selectedDays) {
      const todayDayOfWeek = today.getDay();
      if (!streak.selectedDays.includes(todayDayOfWeek)) {
        return false;
      }
      return lastUpdateDate.getTime() === today.getTime() && streak.count > 0;
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

  // Bu streak için tıklanabilir mi kontrol et
  const canClickToday = () => {
    const today = new Date();
    const todayDayOfWeek = today.getDay();

    if (streak.repeatType === "week" && streak.selectedDays) {
      return streak.selectedDays.includes(todayDayOfWeek);
    }

    return true;
  };

  const clickedToday = isClickedToday();
  const canClick = canClickToday();

  return (
    <Box
      ref={setNodeRef}
      style={style}
      sx={{
        position: "relative",
        mb: 2,
        overflow: "hidden",
        borderRadius: 1.5,
      }}
    >
      {/* Action buttons - arkada gizli */}
      <Box
        sx={{
          position: "absolute",
          right: 0,
          top: 0,
          bottom: 0,
          width: 140,
          display: "flex",
          transform: isSwipedOpen ? "translateX(0)" : "translateX(140px)",
          transition: "transform 0.3s ease-out",
        }}
      >
        <IconButton
          onClick={handleReset}
          sx={{
            flex: 1,
            borderRadius: 0, // Köşe radius yok
            backgroundColor: "warning.main",
            color: "white",
            height: "100%",
            "&:hover": {
              backgroundColor: "warning.dark",
            },
          }}
        >
          <RestartAltIcon />
        </IconButton>
        <IconButton
          onClick={handleDelete}
          sx={{
            flex: 1,
            borderRadius: "0px 12px 12px 0px", // Sağ köşeler radius
            backgroundColor: "error.main",
            color: "white",
            height: "100%",
            "&:hover": {
              backgroundColor: "error.dark",
            },
          }}
        >
          <DeleteIcon />
        </IconButton>
      </Box>

      {/* Ana Card - swipe edilebilir */}
      <Card
        {...swipeHandlers}
        sx={{
          position: "relative",
          transform: isSwipedOpen ? "translateX(-140px)" : "translateX(0)",
          transition: "transform 0.3s ease-out",
          borderRadius: isSwipedOpen ? "12px 0px 0px 12px" : 1.5, // Sağ radius swipe'da sıfır
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
          border: "1px solid rgba(0, 0, 0, 0.06)",
          backgroundColor: "background.paper",
          cursor: "grab",
          "&:active": {
            cursor: "grabbing",
          },
          "&:hover": {
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
          },
        }}
        onClick={() => isSwipedOpen && setIsSwipedOpen(false)}
      >
        <Box sx={{ display: "flex", alignItems: "center", p: 3 }}>
          {/* Drag Handle */}
          <Box
            {...attributes}
            {...listeners}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mr: 2,
              width: 32,
              height: 32,
              cursor: "grab",
              color: "text.secondary",
              opacity: 0.6,
              borderRadius: 1,
              transition: "all 0.2s ease-in-out",
              "&:hover": {
                opacity: 1,
                color: "primary.main",
                backgroundColor: "primary.50",
              },
              "&:active": {
                cursor: "grabbing",
                backgroundColor: "primary.100",
              },
              // Touch için daha iyi
              touchAction: "none",
              userSelect: "none",
            }}
          >
            <DragIndicatorIcon fontSize="small" />
          </Box>

          {/* Sol taraf - Streak bilgileri */}
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography
              variant="h6"
              component="h3"
              sx={{
                fontWeight: 600,
                mb: 1.5,
                color: "text.primary",
                fontSize: "1.1rem",
                lineHeight: 1.2,
              }}
            >
              {streak.name}
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
              <Chip
                label={getRepeatTypeDisplayText(
                  streak.repeatType,
                  streak.selectedDays
                )}
                size="small"
                sx={{
                  backgroundColor: "primary.main",
                  color: "white",
                  fontWeight: 500,
                  fontSize: "0.75rem",
                  height: 24,
                  "& .MuiChip-label": {
                    px: 1.5,
                  },
                }}
              />
            </Box>

            <Typography
              variant="caption"
              color="text.secondary"
              sx={{
                fontSize: "0.75rem",
                opacity: 0.8,
              }}
            >
              {streak.lastUpdated.toLocaleDateString("tr-TR")} -
              {streak.lastUpdated.toLocaleTimeString("tr-TR")}
            </Typography>
          </Box>

          {/* Sağ taraf - Action button ve count */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              ml: 2,
              position: "relative",
            }}
          >
            {/* Button ve count container */}
            <Box
              sx={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Button
                variant={clickedToday ? "contained" : "outlined"}
                onClick={handleIncrement}
                disabled={!canClick}
                sx={{
                  width: 56,
                  height: 56,
                  borderRadius: "50%",
                  minWidth: 0,
                  p: 0,
                  backgroundColor: clickedToday ? "primary.main" : "white",
                  border: "2px dashed",
                  borderColor: canClick ? "primary.main" : "grey.300",
                  color: clickedToday
                    ? "white"
                    : canClick
                    ? "primary.main"
                    : "grey.400",
                  transition: "all 0.2s ease-in-out",
                  // Shake animation for button
                  animation: isShaking
                    ? "buttonShake 0.3s ease-in-out"
                    : "none",
                  "@keyframes buttonShake": {
                    "0%": { transform: "scale(1)" },
                    "25%": { transform: "scale(1.05) rotate(-1deg)" },
                    "50%": { transform: "scale(1.1) rotate(1deg)" },
                    "75%": { transform: "scale(1.05) rotate(-0.5deg)" },
                    "100%": { transform: "scale(1) rotate(0deg)" },
                  },
                  "&:hover": {
                    backgroundColor: clickedToday
                      ? "primary.dark"
                      : canClick
                      ? "primary.50"
                      : "white",
                    transform: canClick ? "scale(1.05)" : "none",
                    borderColor: canClick ? "primary.dark" : "grey.300",
                  },
                  "&:active": {
                    transform: canClick ? "scale(0.95)" : "none",
                  },
                  "&:disabled": {
                    backgroundColor: "grey.50",
                    borderColor: "grey.200",
                    color: "grey.300",
                  },
                }}
              >
                {clickedToday ? (
                  <Box sx={{ fontSize: 24 }}>✓</Box>
                ) : (
                  <AddIcon sx={{ fontSize: 24 }} />
                )}
              </Button>

              {/* Count badge - button içinde */}
              <Box
                sx={{
                  position: "absolute",
                  bottom: -18,
                  backgroundColor: canClick ? "primary.main" : "grey.400",
                  color: "white",
                  borderRadius: "50%",
                  width: 32,
                  height: 32,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  border: "2px solid white",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                  // Shake animation
                  animation: isShaking ? "shake 0.3s ease-in-out" : "none",
                  "@keyframes shake": {
                    "0%": { transform: "translateX(0)" },
                    "25%": { transform: "translateX(-3px) scale(1.1)" },
                    "50%": { transform: "translateX(3px) scale(1.2)" },
                    "75%": { transform: "translateX(-2px) scale(1.1)" },
                    "100%": { transform: "translateX(0) scale(1)" },
                  },
                  transition: "all 0.2s ease-in-out",
                }}
              >
                {streak.count}
              </Box>
            </Box>
          </Box>
        </Box>
      </Card>
    </Box>
  );
};

export default StreakCard;
