import React from "react";
import { Sheet } from "react-modal-sheet";
import "react-modal-sheet/dist/styles.css";
import {
  Box,
  Typography,
  IconButton,
  Divider,
  Chip,
  List,
  ListItem,
  Paper,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import type { Streak } from "../types";
import type { Language } from "../utils/i18n";
import { getCategoryName, categoryColors } from "../utils/categories";
import { getRepeatTypeDisplayText } from "../utils/localStorage";

interface StreakDetailBottomSheetProps {
  open: boolean;
  onClose: () => void;
  streak: Streak | null;
  language: Language;
}

const StreakDetailBottomSheet: React.FC<StreakDetailBottomSheetProps> = ({
  open,
  onClose,
  streak,
  language,
}) => {
  if (!streak) return null;

  // History'yi tarihe göre ters sırala (en yeni önce)
  const sortedHistory = [...(streak.history || [])].sort(
    (a, b) => b.timestamp.getTime() - a.timestamp.getTime()
  );

  // Günlük grouping için history'yi grupla
  const groupedHistory = sortedHistory.reduce((groups, entry) => {
    const dateKey = entry.date.toDateString();
    if (!groups[dateKey]) {
      groups[dateKey] = [];
    }
    groups[dateKey].push(entry);
    return groups;
  }, {} as Record<string, typeof sortedHistory>);

  // İstatistikler
  const totalEntries = sortedHistory.length;
  const totalDays = Object.keys(groupedHistory).length;
  const currentStreak = streak.count;
  const averagePerDay =
    totalDays > 0 ? (totalEntries / totalDays).toFixed(1) : "0";

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString(language === "tr" ? "tr-TR" : "en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString(language === "tr" ? "tr-TR" : "en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Sheet isOpen={open} onClose={onClose} snapPoints={[1]} initialSnap={0}>
      <Sheet.Container>
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
        </Sheet.Header>

        <Sheet.Content>
          <Box sx={{ px: 2, pb: 2 }}>
            {/* Title */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, pb: 2 }}>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, flex: 1 }}
              >
                <Typography
                  component="span"
                  sx={{
                    fontSize: "1.5em",
                    lineHeight: 1,
                  }}
                >
                  {streak.emoji}
                </Typography>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ fontWeight: 600 }}
                >
                  {streak.name}
                </Typography>
              </Box>
              <IconButton
                edge="end"
                color="inherit"
                onClick={onClose}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
            </Box>

            {/* Kategori ve Tekrar Tipi */}
            <Box sx={{ display: "flex", gap: 1, mb: 3 }}>
              <Chip
                label={getCategoryName(streak.category, language)}
                size="small"
                sx={{
                  backgroundColor: categoryColors[streak.category],
                  color: "white",
                  fontWeight: 500,
                }}
              />
              <Chip
                label={getRepeatTypeDisplayText(
                  streak.repeatType,
                  streak.selectedDays,
                  language
                )}
                size="small"
                sx={{
                  backgroundColor: "primary.main",
                  color: "white",
                  fontWeight: 500,
                }}
              />
            </Box>

            {/* İstatistikler */}
            <Paper sx={{ p: 2, mb: 3 }}>
              <Typography
                variant="h6"
                gutterBottom
                sx={{ display: "flex", alignItems: "center", gap: 1 }}
              >
                <TrendingUpIcon color="primary" />
                {language === "tr" ? "İstatistikler" : "Statistics"}
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                <Box sx={{ flex: "1 1 150px", textAlign: "center" }}>
                  <Typography variant="h4" color="primary" fontWeight="bold">
                    {currentStreak}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {language === "tr" ? "Mevcut Streak" : "Current Streak"}
                  </Typography>
                </Box>
                <Box sx={{ flex: "1 1 150px", textAlign: "center" }}>
                  <Typography variant="h4" color="secondary" fontWeight="bold">
                    {totalEntries}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {language === "tr" ? "Toplam Tıklama" : "Total Clicks"}
                  </Typography>
                </Box>
                <Box sx={{ flex: "1 1 150px", textAlign: "center" }}>
                  <Typography
                    variant="h4"
                    color="success.main"
                    fontWeight="bold"
                  >
                    {totalDays}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {language === "tr" ? "Aktif Gün" : "Active Days"}
                  </Typography>
                </Box>
                <Box sx={{ flex: "1 1 150px", textAlign: "center" }}>
                  <Typography variant="h4" color="info.main" fontWeight="bold">
                    {averagePerDay}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {language === "tr" ? "Günlük Ort." : "Daily Avg."}
                  </Typography>
                </Box>
              </Box>
            </Paper>

            {/* Geçmiş */}
            <Paper sx={{ p: 2 }}>
              <Typography
                variant="h6"
                gutterBottom
                sx={{ display: "flex", alignItems: "center", gap: 1 }}
              >
                <CalendarTodayIcon color="primary" />
                {language === "tr" ? "Geçmiş" : "History"}
              </Typography>

              {sortedHistory.length === 0 ? (
                <Box sx={{ textAlign: "center", py: 4 }}>
                  <Typography variant="body2" color="text.secondary">
                    {language === "tr"
                      ? "Henüz hiç tıklama kaydı yok."
                      : "No click history yet."}
                  </Typography>
                </Box>
              ) : (
                <List sx={{ maxHeight: "60vh", overflow: "auto" }}>
                  {Object.entries(groupedHistory).map(([dateKey, entries]) => (
                    <React.Fragment key={dateKey}>
                      <ListItem
                        sx={{
                          backgroundColor: "action.hover",
                          borderRadius: 1,
                          mb: 1,
                          flexDirection: "column",
                          alignItems: "flex-start",
                        }}
                      >
                        <Box sx={{ width: "100%", mb: 1 }}>
                          <Typography variant="subtitle2" fontWeight="bold">
                            {formatDate(entries[0].date)}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {entries.length}{" "}
                            {language === "tr" ? "tıklama" : "clicks"}
                            {streak.isQuantityBased && (
                              <span>
                                {" • "}
                                {entries.reduce(
                                  (sum, entry) => sum + (entry.quantity || 1),
                                  0
                                )}{" "}
                                {streak.unit}
                              </span>
                            )}
                          </Typography>
                        </Box>

                        {/* Günün tıklamaları */}
                        <Box sx={{ width: "100%", pl: 2 }}>
                          {entries.map((entry, index) => (
                            <Box
                              key={index}
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                                py: 0.5,
                              }}
                            >
                              <AccessTimeIcon
                                sx={{ fontSize: 16, color: "text.secondary" }}
                              />
                              <Typography variant="body2">
                                {formatTime(entry.timestamp)}
                              </Typography>
                              {streak.isQuantityBased && (
                                <Chip
                                  label={`+${entry.quantity || 1} ${
                                    streak.unit
                                  }`}
                                  size="small"
                                  variant="outlined"
                                  sx={{ ml: "auto" }}
                                />
                              )}
                            </Box>
                          ))}
                        </Box>
                      </ListItem>
                      <Divider sx={{ my: 1 }} />
                    </React.Fragment>
                  ))}
                </List>
              )}
            </Paper>
          </Box>
        </Sheet.Content>
      </Sheet.Container>
    </Sheet>
  );
};

export default StreakDetailBottomSheet;
