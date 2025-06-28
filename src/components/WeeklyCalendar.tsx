import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  IconButton,
  Badge,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import type { Language } from "../utils/i18n";
import { useTranslations } from "../utils/i18n";
import type { Streak } from "../types";

interface WeeklyCalendarProps {
  language: Language;
  streaks: Streak[];
}

const WeeklyCalendar: React.FC<WeeklyCalendarProps> = ({ language, streaks }) => {
  const t = useTranslations(language);
  const [weekOffset, setWeekOffset] = useState(0); // 0 = bu hafta, -1 = geçen hafta, +1 = gelecek hafta
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Referans tarihi (bugün + week offset)
  const referenceDate = new Date();
  referenceDate.setDate(referenceDate.getDate() + (weekOffset * 7));
  
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
  const shortDayNames = [
    t.mon,
    t.tue,
    t.wed,
    t.thu,
    t.fri,
    t.sat,
    t.sun,
  ];

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
    
    streaks.forEach(streak => {
      if (!streak.history || streak.history.length === 0) return;
      
      const targetDate = new Date(date);
      targetDate.setHours(0, 0, 0, 0);
      
      // Bu tarihte history'de entry var mı kontrol et
      const hasEntryOnDate = streak.history.some(entry => {
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
      setWeekOffset(prev => prev - 1);
    }
  };

  const handleNextWeek = () => {
    // Don't allow going beyond current week
    if (weekOffset < 0) {
      setWeekOffset(prev => prev + 1);
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
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      const earliestDate = getEarliestStreakDate();
      const proposedDate = new Date(referenceDate);
      proposedDate.setDate(proposedDate.getDate() - 7);
      if (proposedDate >= earliestDate) {
        handlePreviousWeek();
      }
    } else if (e.key === 'ArrowRight') {
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
    const monthName = weekDate.toLocaleDateString(language === 'tr' ? 'tr-TR' : 'en-US', { 
      month: 'long',
      year: 'numeric'
    });
    
    return monthName;
  };

  return (
    <Paper
      elevation={1}
      sx={{
        mx: { xs: 2, sm: 3 },
        mt: 2,
        mb: 3,
        p: { xs: 2, sm: 3 },
        borderRadius: 3,
        backgroundColor: "background.paper",
        border: "1px solid",
        borderColor: "divider",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
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
          mb: 3,
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
            minWidth: { xs: 40, sm: 32 },
            minHeight: { xs: 40, sm: 32 },
            "&:hover": {
              backgroundColor: "action.hover",
            },
            "&:disabled": {
              color: "text.disabled",
            },
          }}
        >
          <ChevronLeftIcon />
        </IconButton>

        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            color: "text.primary",
            fontSize: { xs: "1rem", sm: "1.1rem" },
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          📅 {getWeekTitle()}
        </Typography>

        <IconButton
          onClick={handleNextWeek}
          size="small"
          disabled={weekOffset >= 0} // Can't go beyond current week
          sx={{
            color: "text.secondary",
            minWidth: { xs: 40, sm: 32 },
            minHeight: { xs: 40, sm: 32 },
            "&:hover": {
              backgroundColor: "action.hover",
            },
            "&:disabled": {
              color: "text.disabled",
            },
          }}
        >
          <ChevronRightIcon />
        </IconButton>
      </Box>

      {/* Calendar days */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: { xs: 1, sm: 1.5 },
          overflowX: "auto",
          pb: 1,
          minWidth: "280px", // Ensure minimum width for mobile
          width: "100%",
          touchAction: "pan-x", // Allow horizontal swipe
        }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {weekDays.map((date, index) => {
          const isCurrentDay = isToday(date);
          const completedCount = getCompletedStreaksForDate(date);
          const isFutureDate = date > today;
          
          return (
            <Badge
              key={index}
              badgeContent={completedCount > 0 ? completedCount : undefined}
              color="success"
              overlap="circular"
              sx={{
                "& .MuiBadge-badge": {
                  top: { xs: 10, sm: 10 },
                
                  fontSize: "0.7rem",
                  minWidth: { xs: 16, sm: 18 },
                  height: { xs: 16, sm: 18 },
                  backgroundColor: "success.main",
                  color: "success.contrastText",
                  fontWeight: 600,
                  border: "2px solid",
                  borderColor: "background.paper",
                  zIndex: 1,
                },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  p: { xs: 1, sm: 1.5 },
                  borderRadius: 3,
                  backgroundColor: isCurrentDay 
                    ? "primary.main" 
                    : isFutureDate 
                      ? "action.disabled"
                      : "action.hover",
                  color: isCurrentDay 
                    ? "primary.contrastText" 
                    : isFutureDate 
                      ? "text.disabled"
                      : "text.primary",
                  transition: "all 0.3s ease-in-out",
                  minHeight: { xs: 60, sm: 70 },
                  justifyContent: "center",
                  position: "relative",
                  cursor: isFutureDate ? "default" : "pointer",
                  opacity: isFutureDate ? 0.5 : 1,
                  "&:hover": !isFutureDate ? {
                    backgroundColor: isCurrentDay 
                      ? "primary.dark" 
                      : "action.selected",
                    transform: "translateY(-2px)",
                    boxShadow: isCurrentDay 
                      ? "0 4px 12px rgba(124, 58, 237, 0.3)"
                      : "0 2px 8px rgba(0, 0, 0, 0.1)",
                  } : {},
                  ...(isCurrentDay && {
                    boxShadow: "0 4px 12px rgba(124, 58, 237, 0.3)",
                    transform: "scale(1.05)",
                  }),
                }}
              >
                <Typography
                  variant="caption"
                  sx={{
                    fontSize: { xs: "0.65rem", sm: "0.75rem" },
                    fontWeight: isCurrentDay ? 600 : 500,
                    opacity: isCurrentDay ? 1 : 0.8,
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    mb: 0.5,
                  }}
                >
                  {shortDayNames[index]}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: { xs: "1rem", sm: "1.2rem" },
                    fontWeight: isCurrentDay ? 700 : 600,
                    lineHeight: 1,
                  }}
                >
                  {formatDate(date)}
                </Typography>
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
          mt: 2,
          color: "text.secondary",
          fontSize: "0.75rem",
        }}
      >
        {t.today}: {today.toLocaleDateString(language === 'tr' ? 'tr-TR' : 'en-US', { 
          weekday: 'long', 
          day: 'numeric', 
          month: 'long' 
        })}
      </Typography>
    </Paper>
  );
};

export default WeeklyCalendar;
