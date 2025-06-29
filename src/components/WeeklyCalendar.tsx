import React, { useState } from "react";
import { Box, Typography, IconButton, Badge } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import type { Language } from "../utils/i18n";
import { useTranslations } from "../utils/i18n";
import type { Streak } from "../types";
import { getMoodForDate, getMoodEmoji } from "../utils/mood";

interface WeeklyCalendarProps {
  language: Language;
  streaks: Streak[];
  onDayClick?: (date: Date) => void;
}

const WeeklyCalendar: React.FC<WeeklyCalendarProps> = ({
  language,
  streaks,
  onDayClick,
}) => {
  const t = useTranslations(language);
  const [weekOffset, setWeekOffset] = useState(0); // 0 = bu hafta, -1 = geçen hafta, +1 = gelecek hafta
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Referans tarihi (bugün + week offset)
  const referenceDate = new Date();
  referenceDate.setDate(referenceDate.getDate() + weekOffset * 7);

  const today = new Date();
  const currentDay = referenceDate.getDay(); // 0 = Pazar, 1 = Pazartesi, ...

  // Haftanın başlangıcını bul (Pazartesi)
  const startOfWeek = new Date(referenceDate);
  const daysSinceMonday = currentDay === 0 ? 6 : currentDay - 1;
  startOfWeek.setDate(referenceDate.getDate() - daysSinceMonday);

  // Haftalık günleri oluştur
  const weekDays = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + i);
    weekDays.push(date);
  }

  // Kısa gün adları (Pazartesi'den başlayarak)
  const shortDayNames = [t.mon, t.tue, t.wed, t.thu, t.fri, t.sat, t.sun];

  const isToday = (date: Date) => {
    return date.toDateString() === today.toDateString();
  };

  const formatDate = (date: Date) => {
    return date.getDate().toString();
  };

  // Belirli bir gün için tamamlanan streak sayısını hesapla
  const getCompletedStreaksForDate = (date: Date) => {
    if (!streaks || streaks.length === 0) return 0;

    // Sadece geçmiş günler ve bugün için hesapla
    if (date > today) return 0;

    let completedCount = 0;

    streaks.forEach((streak) => {
      if (!streak.history || streak.history.length === 0) return;

      const targetDate = new Date(date);
      targetDate.setHours(0, 0, 0, 0);

      // Bu tarihte history'de entry var mı kontrol et
      const hasEntryOnDate = streak.history.some((entry) => {
        const entryDate = new Date(entry.date);
        entryDate.setHours(0, 0, 0, 0);
        return entryDate.getTime() === targetDate.getTime();
      });

      if (hasEntryOnDate) {
        completedCount++;
      }
    });

    return completedCount;
  };

  // Find the earliest streak start date to limit backward navigation
  const getEarliestStreakDate = () => {
    if (!streaks || streaks.length === 0) return today;

    const earliestDate = streaks.reduce((earliest, streak) => {
      const streakStart = new Date(streak.createdAt);
      return streakStart < earliest ? streakStart : earliest;
    }, today);

    return earliestDate;
  };

  const handlePreviousWeek = () => {
    const earliestDate = getEarliestStreakDate();
    const proposedDate = new Date(referenceDate);
    proposedDate.setDate(proposedDate.getDate() - 7);

    // Check if proposed date would be before earliest streak
    if (proposedDate >= earliestDate) {
      setWeekOffset((prev) => prev - 1);
    }
  };

  const handleNextWeek = () => {
    // Don't allow going beyond current week
    if (weekOffset < 0) {
      setWeekOffset((prev) => prev + 1);
    }
  };

  // Touch handling for swipe gestures
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && weekOffset < 0) {
      handleNextWeek();
    } else if (isRightSwipe) {
      const earliestDate = getEarliestStreakDate();
      const proposedDate = new Date(referenceDate);
      proposedDate.setDate(proposedDate.getDate() - 7);
      if (proposedDate >= earliestDate) {
        handlePreviousWeek();
      }
    }
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      const earliestDate = getEarliestStreakDate();
      const proposedDate = new Date(referenceDate);
      proposedDate.setDate(proposedDate.getDate() - 7);
      if (proposedDate >= earliestDate) {
        handlePreviousWeek();
      }
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      if (weekOffset < 0) {
        handleNextWeek();
      }
    }
  };

  const getWeekTitle = () => {
    if (weekOffset === 0) return t.thisWeek;
    if (weekOffset === -1) return t.lastWeek;
    if (weekOffset === 1) return t.nextWeek;

    // For older weeks, show month and year
    const weekDate = new Date(referenceDate);
    const monthName = weekDate.toLocaleDateString(
      language === "tr" ? "tr-TR" : "en-US",
      {
        month: "long",
        year: "numeric",
      }
    );

    return monthName;
  };

  return (
    <Box
      sx={{
        mx: { xs: 2, sm: 3 },
        mt: 1,
        mb: 2,
        p: { xs: 1.5, sm: 2 },
        backgroundColor: "background.paper",
        borderRadius: 1.5,
        border: "1px solid",
        borderColor: "divider",
      }}
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      {/* Header with navigation */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 2,
        }}
      >
        <IconButton
          onClick={handlePreviousWeek}
          size="small"
          disabled={(() => {
            const earliestDate = getEarliestStreakDate();
            const proposedDate = new Date(referenceDate);
            proposedDate.setDate(proposedDate.getDate() - 7);
            return proposedDate < earliestDate;
          })()}
          sx={{
            color: "text.secondary",
            "&:hover": {
              backgroundColor: "action.hover",
            },
            "&:disabled": {
              color: "text.disabled",
            },
          }}
        >
          <ChevronLeftIcon fontSize="small" />
        </IconButton>

        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 500,
            color: "text.primary",
            fontSize: { xs: "0.9rem", sm: "1rem" },
          }}
        >
          {getWeekTitle()}
        </Typography>

        <IconButton
          onClick={handleNextWeek}
          size="small"
          disabled={weekOffset >= 0} // Can't go beyond current week
          sx={{
            color: "text.secondary",
            "&:hover": {
              backgroundColor: "action.hover",
            },
            "&:disabled": {
              color: "text.disabled",
            },
          }}
        >
          <ChevronRightIcon fontSize="small" />
        </IconButton>
      </Box>

      {/* Calendar days */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: { xs: 0.5, sm: 1 },
          mb: 1,
        }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {weekDays.map((date, index) => {
          const isCurrentDay = isToday(date);
          const completedCount = getCompletedStreaksForDate(date);
          const isFutureDate = date > today;
          const dayMood = getMoodForDate(date);

          return (
            <Badge
              key={index}
              badgeContent={completedCount > 0 ? completedCount : 0}
              showZero={false}
              color="success"
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              sx={{
                "& .MuiBadge-badge": {
                  top: 2,
                  right: 15,
                  fontSize: "0.65rem",
                  minWidth: 14,
                  height: 14,
                  backgroundColor: "success.main",
                  color: "white",
                  fontWeight: 600,
                  transform: "translate(50%, -50%)",
                },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  py: { xs: 1, sm: 1.5 },
                  px: 0.5,
                  borderRadius: 1.5,
                  backgroundColor: "transparent",
                  color: isFutureDate ? "text.disabled" : "text.primary",
                  transition: "all 0.2s ease",
                  minHeight: { xs: 45, sm: 50 },
                  cursor: isFutureDate ? "default" : "pointer",
                  opacity: isFutureDate ? 0.5 : 1,
                  border: isCurrentDay ? "2px solid" : "2px solid transparent",
                  borderColor: isCurrentDay ? "primary.main" : "transparent",
                  "&:hover": !isFutureDate
                    ? {
                        backgroundColor: "action.hover",
                      }
                    : {},
                }}
                onClick={() => {
                  if (!isFutureDate && onDayClick) onDayClick(date);
                }}
              >
                <Typography
                  variant="caption"
                  sx={{
                    fontSize: { xs: "0.6rem", sm: "0.65rem" },
                    fontWeight: isCurrentDay ? 600 : 500,
                    opacity: isCurrentDay ? 1 : 0.7,
                    textTransform: "uppercase",
                    letterSpacing: "0.3px",
                    mb: 0.2,
                    color: isCurrentDay ? "primary.main" : "inherit",
                  }}
                >
                  {shortDayNames[index]}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: { xs: "0.9rem", sm: "1rem" },
                    fontWeight: isCurrentDay ? 700 : 500,
                    lineHeight: 1,
                    color: isCurrentDay ? "primary.main" : "inherit",
                  }}
                >
                  {formatDate(date)}
                </Typography>

                {/* Mood indicator */}
                {dayMood && (
                  <Box
                    sx={{
                      mt: 0.5,
                      fontSize: { xs: "0.8rem", sm: "1rem" },
                      lineHeight: 1,
                      backgroundColor: "primary.50",
                      borderRadius: "50%",
                      width: { xs: 20, sm: 24 },
                      height: { xs: 20, sm: 24 },
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "1px solid",
                      borderColor: "primary.200",
                    }}
                  >
                    {getMoodEmoji(dayMood.mood)}
                  </Box>
                )}
              </Box>
            </Badge>
          );
        })}
      </Box>

      <Typography
        variant="caption"
        sx={{
          display: "block",
          textAlign: "center",
          mt: 1,
          color: "text.secondary",
          fontSize: "0.7rem",
        }}
      >
        {t.today}:{" "}
        {today.toLocaleDateString(language === "tr" ? "tr-TR" : "en-US", {
          weekday: "long",
          day: "numeric",
          month: "long",
        })}
      </Typography>
    </Box>
  );
};

export default WeeklyCalendar;
