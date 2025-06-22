import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  IconButton,
  Divider,
  Container,
  Alert,
  Button,
} from "@mui/material";
import {
  ArrowBack as ArrowBackIcon,
  Visibility as VisibilityIcon,
} from "@mui/icons-material";
import type { SharedStreakData } from "../utils/sharing";
import { useTranslations } from "../utils/i18n";
import { getCategoryName, categoryColors } from "../utils/categories";

interface SharedStreakViewerProps {
  sharedData: SharedStreakData;
  onBack: () => void;
}

const SharedStreakViewer = ({
  sharedData,
  onBack,
}: SharedStreakViewerProps) => {
  const [daysSinceShared, setDaysSinceShared] = useState(0);
  // Use the language from the shared data
  const language = sharedData.language;
  const t = useTranslations(language);

  useEffect(() => {
    const sharedDate = new Date(sharedData.sharedAt);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - sharedDate.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    setDaysSinceShared(diffDays);
  }, [sharedData.sharedAt]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(language === "tr" ? "tr-TR" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getRepeatTypeDisplay = () => {
    switch (sharedData.repeatType) {
      case "day":
        return t.everyDay;
      case "week":
        if (sharedData.selectedDays && sharedData.selectedDays.length > 0) {
          const dayNames = sharedData.selectedDays.map((day) => {
            const days = [
              t.sunday,
              t.monday,
              t.tuesday,
              t.wednesday,
              t.thursday,
              t.friday,
              t.saturday,
            ];
            return days[day];
          });
          return dayNames.join(", ");
        }
        return t.everyWeek;
      case "month":
        return t.everyMonth;
      default:
        return "";
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 2 }}>
      {/* Header */}
      <Box display="flex" alignItems="center" mb={3}>
        <IconButton onClick={onBack} sx={{ mr: 1 }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h6" fontWeight="medium">
          {t.sharedStreak}
        </Typography>
      </Box>

      {/* View Only Alert */}
      <Alert severity="info" icon={<VisibilityIcon />} sx={{ mb: 3 }}>
        {t.viewOnly} - {t.shareDescription}
      </Alert>

      {/* Main Streak Card */}
      <Card
        sx={{
          borderRadius: 3,
          borderLeft: `6px solid ${categoryColors[sharedData.category]}`,
          boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
          mb: 3,
        }}
      >
        <CardContent sx={{ p: 3 }}>
          {/* Streak Header */}
          <Box display="flex" alignItems="center" gap={2} mb={2}>
            <Typography variant="h4" component="span">
              {sharedData.emoji}
            </Typography>
            <Box flex={1}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                {sharedData.name}
              </Typography>
              <Chip
                label={getCategoryName(sharedData.category, language)}
                size="small"
                sx={{
                  backgroundColor: categoryColors[sharedData.category] + "20",
                  color: categoryColors[sharedData.category],
                  fontWeight: "medium",
                }}
              />
            </Box>
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* Streak Stats */}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={3}
          >
            <Box textAlign="center">
              <Typography variant="h3" fontWeight="bold" color="primary.main">
                {sharedData.count}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {sharedData.count === 1 ? "Day" : "Days"}
              </Typography>
            </Box>
            <Box textAlign="center">
              <Typography variant="body1" fontWeight="medium">
                {getRepeatTypeDisplay()}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {t.repeatPattern}
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* Dates */}
          <Box>
            <Box display="flex" justifyContent="space-between" mb={1}>
              <Typography variant="body2" color="text.secondary">
                Started:
              </Typography>
              <Typography variant="body2">
                {formatDate(sharedData.createdAt)}
              </Typography>
            </Box>
            <Box display="flex" justifyContent="space-between" mb={1}>
              <Typography variant="body2" color="text.secondary">
                Last Updated:
              </Typography>
              <Typography variant="body2">
                {formatDate(sharedData.lastUpdated)}
              </Typography>
            </Box>
            <Box display="flex" justifyContent="space-between">
              <Typography variant="body2" color="text.secondary">
                Shared:
              </Typography>
              <Typography variant="body2">
                {daysSinceShared === 0
                  ? "Today"
                  : `${daysSinceShared} days ago`}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Back to App Button */}
      <Box textAlign="center">
        <Button onClick={onBack} variant="outlined" size="large" sx={{ px: 4 }}>
          {t.appTitle}
        </Button>
      </Box>
    </Container>
  );
};

export default SharedStreakViewer;
