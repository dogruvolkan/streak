import React from "react";
import { Sheet } from "react-modal-sheet";
import {
  IconButton,
  Typography,
  Box,
  Card,
  CardContent,
  Chip,
  LinearProgress,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import type { Streak, StreakCategory } from "../types";
import type { Language } from "../utils/i18n";
import { useTranslations } from "../utils/i18n";
import { getCategoryName, categoryColors } from "../utils/categories";

interface StatisticsProps {
  open: boolean;
  onClose: () => void;
  streaks: Streak[];
  language: Language;
}

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  color = "primary.main",
}) => (
  <Card
    sx={{
      height: "100%",
      background:
        "linear-gradient(135deg, background.paper 0%, background.default 100%)",
    }}
  >
    <CardContent sx={{ textAlign: "center", py: 2 }}>
      <Box sx={{ color: color, mb: 1 }}>{icon}</Box>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5, color: color }}>
        {value}
      </Typography>
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ fontSize: "0.85rem" }}
      >
        {title}
      </Typography>
    </CardContent>
  </Card>
);

const Statistics: React.FC<StatisticsProps> = ({
  open,
  onClose,
  streaks,
  language,
}) => {
  const t = useTranslations(language);
  const theme = useTheme();

  // İstatistikleri hesapla
  const calculateStats = () => {
    const totalStreaks = streaks.length;
    const activeStreaks = streaks.filter((s) => s.count > 0).length;

    // Toplam tamamlanan gün sayısı (tüm streak'lerin count'larının toplamı)
    const totalCompletedDays = streaks.reduce(
      (sum, streak) => sum + streak.count,
      0
    );

    const longestStreak = Math.max(...streaks.map((s) => s.count), 0);

    // Bu haftaki ve bugünkü aktivite için tarih hesaplamaları
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Bugün tamamlanan streak sayısı
    const todayCompletedStreaks = streaks.filter((streak) => {
      const lastUpdate = new Date(streak.lastUpdated);
      lastUpdate.setHours(0, 0, 0, 0);
      return lastUpdate.getTime() === today.getTime() && streak.count > 0;
    }).length;

    // Bu haftaki aktivite
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());
    startOfWeek.setHours(0, 0, 0, 0);

    const thisWeekActivity = streaks.filter((streak) => {
      const lastUpdate = new Date(streak.lastUpdated);
      return lastUpdate >= startOfWeek && streak.count > 0;
    }).length;

    // Kategori dağılımı
    const categoryStats = streaks.reduce((acc, streak) => {
      acc[streak.category] = (acc[streak.category] || 0) + 1;
      return acc;
    }, {} as Record<StreakCategory, number>);

    // Haftalık ortalama (son 4 hafta)
    const averagePerWeek =
      totalCompletedDays > 0 ? Math.round(totalCompletedDays / 4) : 0;

    return {
      totalStreaks,
      activeStreaks,
      totalCompletedDays,
      todayCompletedStreaks,
      longestStreak,
      thisWeekActivity,
      categoryStats,
      averagePerWeek,
    };
  };

  const stats = calculateStats();

  return (
    <Sheet isOpen={open} onClose={onClose} snapPoints={[0.9]} initialSnap={0}>
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
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              📊 {t.statistics}
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
              <CloseIcon />
            </IconButton>
          </Box>
        </Sheet.Header>

        <Sheet.Content
          style={{
            backgroundColor: theme.palette.background.default,
          }}
        >
          <Box sx={{ px: 3, py: 0, overflow: "auto" }}>
            {/* Genel Bakış */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                {t.overview}
              </Typography>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "repeat(2, 1fr)",
                    sm: "repeat(4, 1fr)",
                  },
                  gap: 2,
                }}
              >
                <StatCard
                  title={t.totalStreaks}
                  value={stats.totalStreaks}
                  icon={<CalendarTodayIcon />}
                  color="primary.main"
                />
                <StatCard
                  title={t.activeStreaks}
                  value={stats.activeStreaks}
                  icon={<TrendingUpIcon />}
                  color="success.main"
                />

                <StatCard
                  title={t.longestStreak}
                  value={`${stats.longestStreak} ${t.days}`}
                  icon={<ShowChartIcon />}
                  color="error.main"
                />
              </Box>
            </Box>

            {/* Bu Hafta */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                {t.thisWeek}
              </Typography>
              <Card>
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mb: 1,
                    }}
                  >
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {t.activeStreaks}
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: 700, color: "primary.main" }}
                    >
                      {stats.thisWeekActivity}
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={
                      stats.totalStreaks > 0
                        ? (stats.thisWeekActivity / stats.totalStreaks) * 100
                        : 0
                    }
                    sx={{ height: 8, borderRadius: 4 }}
                  />
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ mt: 1, display: "block" }}
                  >
                    {stats.totalStreaks > 0
                      ? `${Math.round(
                          (stats.thisWeekActivity / stats.totalStreaks) * 100
                        )}% of your streaks are active`
                      : t.noDataAvailable}
                  </Typography>
                </CardContent>
              </Card>
            </Box>

            {/* Kategori Dağılımı */}
            {Object.keys(stats.categoryStats).length > 0 && (
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                  {t.categoryBreakdown}
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {Object.entries(stats.categoryStats).map(
                    ([category, count]) => (
                      <Chip
                        key={category}
                        label={`${getCategoryName(
                          category as StreakCategory,
                          language
                        )} (${count})`}
                        sx={{
                          backgroundColor:
                            categoryColors[category as StreakCategory],
                          color: "white",
                          fontWeight: 500,
                        }}
                      />
                    )
                  )}
                </Box>
              </Box>
            )}

            {/* Veri yoksa */}
            {stats.totalStreaks === 0 && (
              <Box sx={{ textAlign: "center", py: 6 }}>
                <Typography variant="h4" sx={{ mb: 1 }}>
                  📈
                </Typography>
                <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
                  {t.noDataAvailable}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {t.startFirstStreak}
                </Typography>
              </Box>
            )}
          </Box>
        </Sheet.Content>
      </Sheet.Container>
    </Sheet>
  );
};

export default Statistics;
