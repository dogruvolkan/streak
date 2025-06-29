import React, { useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  useTheme,
  Modal,
  Backdrop,
  Slide,
  Button,
  Card,
  CardContent,
  Chip,
  LinearProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import type { Language } from "../utils/i18n";
import { useTranslations } from "../utils/i18n";

interface HelpBottomSheetProps {
  open: boolean;
  onClose: () => void;
  language: Language;
}

const HelpBottomSheet: React.FC<HelpBottomSheetProps> = ({
  open,
  onClose,
  language,
}) => {
  const t = useTranslations(language);
  const theme = useTheme();
  const [currentStep, setCurrentStep] = useState(0);

  const helpSteps = [
    {
      title: t.helpWelcomeTitle,
      description: t.helpWelcomeDesc,
      content: (
        <Box sx={{ textAlign: "center", py: 4 }}>
          <Box
            sx={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              borderRadius: "50%",
              width: 100,
              height: 100,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mx: "auto",
              mb: 3,
              boxShadow: "0 10px 30px rgba(102, 126, 234, 0.3)",
            }}
          >
            <Typography variant="h1" sx={{ fontSize: "3rem", color: "white" }}>
              🎯
            </Typography>
          </Box>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 2, color: "primary.main" }}>
            {t.appTitle}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ fontSize: "1.1rem", lineHeight: 1.6 }}>
            {t.helpWelcomeContent}
          </Typography>
        </Box>
      ),
    },
    {
      title: t.helpCreateStreakTitle,
      description: t.helpCreateStreakDesc,
      content: (
        <Box sx={{ py: 2 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              mb: 3,
              p: 3,
              borderRadius: 3,
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "white",
              boxShadow: "0 8px 25px rgba(102, 126, 234, 0.3)",
            }}
          >
            <Box
              sx={{
                width: 60,
                height: 60,
                borderRadius: "50%",
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backdropFilter: "blur(10px)",
              }}
            >
              <AddIcon sx={{ fontSize: 28, color: "white" }} />
            </Box>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                {t.helpCreateStreakAction}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                {t.helpCreateStreakDesc}
              </Typography>
            </Box>
          </Box>
          <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.6 }}>
            {t.helpCreateStreakContent}
          </Typography>
        </Box>
      ),
    },
    {
      title: t.helpTrackProgressTitle,
      description: t.helpTrackProgressDesc,
      content: (
        <Box sx={{ py: 2 }}>
          <Card
            sx={{
              mb: 3,
              border: "2px solid",
              borderColor: "success.main",
              backgroundColor: "success.50",
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Typography sx={{ fontSize: "1.5em", mr: 2 }}>💧</Typography>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {t.helpExampleStreakName}
                  </Typography>
                  <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                    <Chip
                      label={t.daily}
                      size="small"
                      sx={{
                        backgroundColor: "primary.main",
                        color: "white",
                        fontSize: "0.65rem",
                      }}
                    />
                  </Box>
                </Box>
                <Button
                  variant="contained"
                  sx={{
                    width: 56,
                    height: 56,
                    borderRadius: "50%",
                    minWidth: 0,
                    p: 0,
                  }}
                >
                  <CheckIcon sx={{ fontSize: 24 }} />
                </Button>
              </Box>
            </CardContent>
          </Card>
          <Typography variant="body2" color="text.secondary">
            {t.helpTrackProgressContent}
          </Typography>
        </Box>
      ),
    },
    {
      title: t.helpStreakTypesTitle,
      description: t.helpStreakTypesDesc,
      content: (
        <Box sx={{ py: 2 }}>
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
              ✅ {t.simpleStreak}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              {t.helpSimpleStreakContent}
            </Typography>
            
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
              📊 {t.quantityBasedStreak}
            </Typography>
            <Box sx={{ mb: 2 }}>
              <LinearProgress
                variant="determinate"
                value={75}
                sx={{
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: "action.hover",
                  "& .MuiLinearProgress-bar": {
                    borderRadius: 4,
                    backgroundColor: "primary.main",
                  },
                }}
              />
              <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: "block" }}>
                3/4 {t.helpExampleUnit}
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">
              {t.helpQuantityStreakContent}
            </Typography>
          </Box>
        </Box>
      ),
    },
    {
      title: t.helpRepeatPatternsTitle,
      description: t.helpRepeatPatternsDesc,
      content: (
        <Box sx={{ py: 2 }}>
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
              📅 {t.daily}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              {t.helpDailyContent}
            </Typography>
            
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
              📆 {t.weekly}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              {t.helpWeeklyContent}
            </Typography>
            
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
              🗓️ {t.monthly}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {t.helpMonthlyContent}
            </Typography>
          </Box>
        </Box>
      ),
    },
    {
      title: t.helpFeatureSummaryTitle,
      description: t.helpFeatureSummaryDesc,
      content: (
        <Box sx={{ py: 2 }}>
          <Box sx={{ display: "grid", gap: 2, mb: 3 }}>
            {[
              { icon: "🎯", title: t.helpFeatureTracking, desc: t.helpFeatureTrackingDesc },
              { icon: "📱", title: t.helpFeatureMobile, desc: t.helpFeatureMobileDesc },
              { icon: "🎨", title: t.helpFeatureCustomize, desc: t.helpFeatureCustomizeDesc },
              { icon: "📊", title: t.helpFeatureProgress, desc: t.helpFeatureProgressDesc },
            ].map((feature, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  p: 2,
                  borderRadius: 2,
                  backgroundColor: "action.hover",
                }}
              >
                <Typography sx={{ fontSize: "1.5rem" }}>{feature.icon}</Typography>
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {feature.desc}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>            <Typography variant="body2" color="text.secondary" sx={{ textAlign: "center", fontStyle: "italic", p: 3, backgroundColor: "success.50", borderRadius: 2, border: "1px solid", borderColor: "success.200" }}>
              ✨ {t.helpReadyToStart}
            </Typography>
        </Box>
      ),
    },
    {
      title: t.moodTracker,
      description: t.moodStats,
      content: (
        <Box sx={{ py: 2 }}>
          <Card
            sx={{
              mb: 3,
              border: "2px solid",
              borderColor: "info.main",
              backgroundColor: "info.50",
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Typography sx={{ fontSize: "1.5em", mr: 2 }}>😊</Typography>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {t.moodTracker}
                  </Typography>
                  <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                    <Chip
                      label={t.todaysMood}
                      size="small"
                      sx={{
                        backgroundColor: "info.main",
                        color: "white",
                        fontSize: "0.65rem",
                      }}
                    />
                  </Box>
                </Box>
              </Box>
              <Typography variant="body2" color="text.secondary">
                {t.moodEntrySummary.replace("{count}", "--")}
              </Typography>
            </CardContent>
          </Card>
          <Typography variant="body2" color="text.secondary">
            {t.moodNoteOptional}
          </Typography>
        </Box>
      ),
    },
    {
      title: t.pomodoroTitle,
      description: t.pomodoroHistoryTitle,
      content: (
        <Box sx={{ py: 2 }}>
          <Card
            sx={{
              mb: 3,
              border: "2px solid",
              borderColor: "warning.main",
              backgroundColor: "warning.50",
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Typography sx={{ fontSize: "1.5em", mr: 2 }}>⏲️</Typography>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {t.pomodoroTitle}
                  </Typography>
                  <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                    <Chip
                      label={t.pomodoroWork}
                      size="small"
                      sx={{
                        backgroundColor: "warning.main",
                        color: "white",
                        fontSize: "0.65rem",
                      }}
                    />
                  </Box>
                </Box>
              </Box>
              <Typography variant="body2" color="text.secondary">
                {t.pomodoroHistoryTitle}
              </Typography>
            </CardContent>
          </Card>
          <Typography variant="body2" color="text.secondary">
            {t.pomodoroFocus} / {t.pomodoroShortBreak} / {t.pomodoroLongBreak}
          </Typography>
        </Box>
      ),
    },
  ];

  const handleNext = () => {
    if (currentStep < helpSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleClose = () => {
    setCurrentStep(0);
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
      sx={{
        zIndex: 1300,
        "& .MuiBackdrop-root": {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
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
            backgroundColor: theme.palette.background.paper,
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            maxHeight: "90vh",
            height: "auto",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            paddingBottom: "env(safe-area-inset-bottom)",
          }}
        >
          {/* Handle Bar */}
          <Box
            sx={{
              width: 40,
              height: 4,
              backgroundColor: "text.secondary",
              opacity: 0.3,
              borderRadius: 2,
              mx: "auto",
              my: 2,
              flexShrink: 0,
            }}
          />

          {/* Header */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              px: 3,
              pb: 2,
              flexShrink: 0,
            }}
          >
            <Box>
              <Typography
                variant="h6"
                sx={{ fontWeight: 600, color: "text.primary" }}
              >
                {helpSteps[currentStep].title}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {currentStep + 1} / {helpSteps.length}
              </Typography>
            </Box>
            <IconButton
              onClick={handleClose}
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

          {/* Progress Indicator */}
          <Box sx={{ px: 3, pb: 2 }}>
            <LinearProgress
              variant="determinate"
              value={(currentStep + 1) / helpSteps.length * 100}
              sx={{
                height: 4,
                borderRadius: 2,
                backgroundColor: "action.hover",
                "& .MuiLinearProgress-bar": {
                  borderRadius: 2,
                  backgroundColor: "primary.main",
                },
              }}
            />
          </Box>

          {/* Content */}
          <Box
            sx={{
              flex: 1,
              overflow: "auto",
              backgroundColor: theme.palette.background.default,
              px: 3,
              pb: 3,
            }}
          >
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ mb: 3 }}
            >
              {helpSteps[currentStep].description}
            </Typography>

            {helpSteps[currentStep].content}
          </Box>

          {/* Navigation Buttons */}
          <Box
            sx={{
              display: "flex",
              gap: 1.5,
              p: 3,
              pt: 2,
              backgroundColor: theme.palette.background.paper,
              borderTop: "1px solid",
              borderTopColor: "divider",
              flexShrink: 0,
            }}
          >
            <Button
              onClick={handlePrevious}
              disabled={currentStep === 0}
              variant="outlined"
              startIcon={<ArrowBackIcon />}
              sx={{
                borderRadius: 3,
                py: 1.5,
                px: 3,
                minWidth: 120,
                border: "2px solid",
                borderColor: currentStep === 0 ? "divider" : "primary.main",
                color: currentStep === 0 ? "text.disabled" : "primary.main",
                "&:hover": {
                  borderColor: currentStep === 0 ? "divider" : "primary.dark",
                  backgroundColor: currentStep === 0 ? "transparent" : "primary.50",
                },
              }}
            >
              {t.back}
            </Button>
            
            <Button
              onClick={currentStep === helpSteps.length - 1 ? handleClose : handleNext}
              variant="contained"
              endIcon={
                currentStep === helpSteps.length - 1 ? undefined : <ArrowForwardIcon />
              }
              sx={{
                flex: 1,
                borderRadius: 3,
                py: 1.5,
                fontSize: "1rem",
                fontWeight: 600,
                boxShadow: "0 4px 12px rgba(124, 58, 237, 0.3)",
                "&:hover": {
                  boxShadow: "0 6px 16px rgba(124, 58, 237, 0.4)",
                },
              }}
            >
              {currentStep === helpSteps.length - 1 ? t.done : t.next}
            </Button>
          </Box>
        </Box>
      </Slide>
    </Modal>
  );
};

export default HelpBottomSheet;
