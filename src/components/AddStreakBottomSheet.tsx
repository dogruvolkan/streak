import React, { useState } from "react";
import {
  TextField,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Box,
  Chip,
  Typography,
  IconButton,
  useTheme,
} from "@mui/material";
import { Sheet } from "react-modal-sheet";
import CloseIcon from "@mui/icons-material/Close";
import type {
  CreateStreakFormData,
  RepeatType,
  StreakCategory,
} from "../types";
import type { Language } from "../utils/i18n";
import { useTranslations } from "../utils/i18n";
import {
  getCategoryName,
  categoryColors,
  categoryEmojis,
} from "../utils/categories";

interface AddStreakBottomSheetProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: CreateStreakFormData) => void;
  language: Language;
}

const AddStreakBottomSheet: React.FC<AddStreakBottomSheetProps> = ({
  open,
  onClose,
  onSubmit,
  language,
}) => {
  const t = useTranslations(language);
  const theme = useTheme();

  // Get day names based on current language
  const dayNames = [
    t.sunday,
    t.monday,
    t.tuesday,
    t.wednesday,
    t.thursday,
    t.friday,
    t.saturday,
  ];
  const [step, setStep] = useState<
    "category" | "emoji" | "name" | "type" | "repeat" | "days"
  >("category");
  const [formData, setFormData] = useState<CreateStreakFormData>({
    name: "",
    repeatType: "day",
    selectedDays: [],
    category: "other",
    emoji: "📋",
    isQuantityBased: false,
    dailyGoal: 1,
    unit: "",
  });

  const handleClose = () => {
    setStep("category");
    setFormData({
      name: "",
      repeatType: "day",
      selectedDays: [],
      category: "other",
      emoji: "📋",
      isQuantityBased: false,
      dailyGoal: 1,
      unit: "",
    });
    onClose();
  };

  const handleNext = () => {
    if (step === "category") {
      setStep("emoji");
    } else if (step === "emoji") {
      setStep("name");
    } else if (step === "name") {
      setStep("type");
    } else if (step === "type") {
      setStep("repeat");
    } else if (step === "repeat") {
      if (formData.repeatType === "week") {
        setStep("days");
      } else {
        handleSubmit();
      }
    }
  };

  const handleBack = () => {
    if (step === "emoji") {
      setStep("category");
    } else if (step === "name") {
      setStep("emoji");
    } else if (step === "type") {
      setStep("name");
    } else if (step === "repeat") {
      setStep("type");
    } else if (step === "days") {
      setStep("repeat");
    }
  };

  const handleSubmit = () => {
    onSubmit(formData);
    handleClose();
  };

  const handleDayToggle = (dayIndex: number) => {
    const selectedDays = formData.selectedDays || [];
    const newSelectedDays = selectedDays.includes(dayIndex)
      ? selectedDays.filter((day) => day !== dayIndex)
      : [...selectedDays, dayIndex];

    setFormData({
      ...formData,
      selectedDays: newSelectedDays,
    });
  };

  const isValid = () => {
    if (step === "category") return true; // Her zaman bir kategori seçili
    if (step === "emoji") return formData.emoji !== "";
    if (step === "name") return formData.name.trim().length > 0;
    if (step === "type") return true;
    if (step === "repeat") return true;
    if (step === "days") return (formData.selectedDays?.length || 0) > 0;
    return true;
  };

  const getTitle = () => {
    switch (step) {
      case "category":
        return t.selectCategory;
      case "emoji":
        return t.selectEmoji;
      case "name":
        return t.addStreak;
      case "type":
        return t.streakType;
      case "repeat":
        return t.repeatPattern;
      case "days":
        return t.selectDays;
      default:
        return t.addStreak;
    }
  };

  return (
    <Sheet
      isOpen={open}
      onClose={handleClose}
      snapPoints={[0.85, 0.6, 0.4]}
      initialSnap={1}
    >
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
              {getTitle()}
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
          <Box sx={{ px: 3, pb: 2 }}>
            {/* Content */}
            {step === "category" && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="body1" gutterBottom>
                  {t.selectCategory}
                </Typography>
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 2,
                    mt: 1,
                  }}
                >
                  {(Object.keys(categoryColors) as StreakCategory[]).map(
                    (category) => (
                      <Chip
                        key={category}
                        label={
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <Box sx={{ fontSize: "1.2em" }}>
                              {categoryEmojis[category]}
                            </Box>
                            {getCategoryName(category, language)}
                          </Box>
                        }
                        onClick={() => setFormData({ ...formData, category })}
                        color={
                          formData.category === category ? "primary" : "default"
                        }
                        variant={
                          formData.category === category ? "filled" : "outlined"
                        }
                        sx={{
                          width: "100%",
                          height: 48,
                          fontSize: "0.9rem",
                          borderColor:
                            formData.category === category
                              ? categoryColors[category]
                              : "divider",
                          backgroundColor:
                            formData.category === category
                              ? `${categoryColors[category]}20`
                              : "transparent",
                          color:
                            formData.category === category
                              ? "text.primary"
                              : "text.primary",
                          "&:hover": {
                            backgroundColor: `${categoryColors[category]}30`,
                          },
                        }}
                      />
                    )
                  )}
                </Box>
              </Box>
            )}

            {step === "emoji" && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="body1" gutterBottom>
                  {t.selectEmoji}
                </Typography>

                <TextField
                  autoFocus
                  fullWidth
                  label={t.selectEmoji}
                  value={formData.emoji}
                  onChange={(e) => {
                    // Sadece emoji karakterlerini kabul et (basit kontrol)
                    const value = e.target.value;
                    if (value.length <= 2) {
                      // En fazla 2 karakter (bazı emojiler 2 char)
                      setFormData({ ...formData, emoji: value });
                    }
                  }}
                  placeholder="😊"
                  variant="filled"
                  inputProps={{
                    style: { fontSize: "2rem", textAlign: "center" },
                  }}
                  sx={{
                    mt: 2,
                    "& .MuiFilledInput-root": {
                      border: "none",
                      backgroundColor: "action.hover",
                      "&:hover": {
                        backgroundColor: "action.selected",
                      },
                      "&.Mui-focused": {
                        backgroundColor: "action.hover",
                        border: "none",
                      },
                      "&:before": {
                        display: "none",
                      },
                      "&:after": {
                        display: "none",
                      },
                    },
                  }}
                />
              </Box>
            )}

            {step === "name" && (
              <TextField
                autoFocus
                fullWidth
                label={t.streakName}
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder={t.streakNamePlaceholder}
                variant="filled"
                sx={{
                  mt: 2,
                  "& .MuiFilledInput-root": {
                    border: "none",
                    backgroundColor: "action.hover",
                    "&:hover": {
                      backgroundColor: "action.selected",
                    },
                    "&.Mui-focused": {
                      backgroundColor: "action.hover",
                      border: "none",
                    },
                    "&:before": {
                      display: "none",
                    },
                    "&:after": {
                      display: "none",
                    },
                  },
                }}
              />
            )}

            {step === "type" && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="body1" gutterBottom>
                  {t.streakType}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    mt: 2,
                  }}
                >
                  <Chip
                    label={
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          py: 1,
                          width: "100%",
                          textAlign: "left",
                        }}
                      >
                        <Box sx={{ fontSize: "1.2em" }}>✅</Box>
                        <Box sx={{ flex: 1, textAlign: "left" }}>
                          <Typography
                            variant="body1"
                            sx={{
                              fontWeight: 500,
                              color: !formData.isQuantityBased
                                ? "primary.contrastText"
                                : "text.primary",
                            }}
                          >
                            {t.simpleStreak}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              color: !formData.isQuantityBased
                                ? "primary.contrastText"
                                : "text.secondary",
                              opacity: !formData.isQuantityBased ? 0.8 : 1,
                            }}
                          >
                            {t.simpleStreakDesc}
                          </Typography>
                        </Box>
                      </Box>
                    }
                    onClick={() =>
                      setFormData({ ...formData, isQuantityBased: false })
                    }
                    color={!formData.isQuantityBased ? "primary" : "default"}
                    variant={!formData.isQuantityBased ? "filled" : "outlined"}
                    sx={{
                      width: "100%",
                      height: "auto",
                      minHeight: 64,
                      fontSize: "0.9rem",
                      backgroundColor: !formData.isQuantityBased
                        ? "primary.50"
                        : "transparent",
                      "&:hover": {
                        backgroundColor: !formData.isQuantityBased
                          ? "primary.100"
                          : "action.hover",
                      },
                    }}
                  />
                  <Chip
                    label={
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          py: 1,
                          width: "100%",
                          textAlign: "left",
                        }}
                      >
                        <Box sx={{ fontSize: "1.2em" }}>📊</Box>
                        <Box sx={{ flex: 1, textAlign: "left" }}>
                          <Typography
                            variant="body1"
                            sx={{
                              fontWeight: 500,
                              color: formData.isQuantityBased
                                ? "primary.contrastText"
                                : "text.primary",
                            }}
                          >
                            {t.quantityBasedStreak}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              color: formData.isQuantityBased
                                ? "primary.contrastText"
                                : "text.secondary",
                              opacity: formData.isQuantityBased ? 0.8 : 1,
                            }}
                          >
                            {t.quantityBasedStreakDesc}
                          </Typography>
                        </Box>
                      </Box>
                    }
                    onClick={() =>
                      setFormData({ ...formData, isQuantityBased: true })
                    }
                    color={formData.isQuantityBased ? "primary" : "default"}
                    variant={formData.isQuantityBased ? "filled" : "outlined"}
                    sx={{
                      width: "100%",
                      height: "auto",
                      minHeight: 64,
                      fontSize: "0.9rem",
                      backgroundColor: formData.isQuantityBased
                        ? "primary.50"
                        : "transparent",
                      "&:hover": {
                        backgroundColor: formData.isQuantityBased
                          ? "primary.100"
                          : "action.hover",
                      },
                    }}
                  />
                </Box>

                {formData.isQuantityBased && (
                  <Box sx={{ mt: 3 }}>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      gutterBottom
                    >
                      {t.dailyGoalSettings}
                    </Typography>
                    <Box sx={{ display: "flex", gap: 2, mt: 1 }}>
                      <TextField
                        label={t.targetAmount}
                        type="number"
                        value={formData.dailyGoal}
                        onChange={(e) => {
                          const value = parseInt(e.target.value) || 1;
                          setFormData({
                            ...formData,
                            dailyGoal: value,
                          });
                        }}
                        variant="filled"
                        sx={{ flex: 1 }}
                        inputProps={{ min: 1, pattern: "[0-9]*" }}
                      />
                      <TextField
                        label={t.unit}
                        value={formData.unit}
                        onChange={(e) =>
                          setFormData({ ...formData, unit: e.target.value })
                        }
                        placeholder="bardak, sayfa, dakika..."
                        variant="filled"
                        sx={{ flex: 1 }}
                      />
                    </Box>
                  </Box>
                )}
              </Box>
            )}

            {step === "repeat" && (
              <FormControl sx={{ mt: 2 }}>
                <FormLabel>{t.repeatPattern}</FormLabel>
                <RadioGroup
                  value={formData.repeatType}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      repeatType: e.target.value as RepeatType,
                    })
                  }
                >
                  <FormControlLabel
                    value="day"
                    control={<Radio />}
                    label={t.daily}
                  />
                  <FormControlLabel
                    value="week"
                    control={<Radio />}
                    label={t.weekly}
                  />
                  <FormControlLabel
                    value="month"
                    control={<Radio />}
                    label={t.monthly}
                  />
                </RadioGroup>
              </FormControl>
            )}

            {step === "days" && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="body1" gutterBottom>
                  {t.selectDays}
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 2 }}>
                  {dayNames.map((dayName, index) => (
                    <Chip
                      key={index}
                      label={dayName}
                      onClick={() => handleDayToggle(index)}
                      color={
                        formData.selectedDays?.includes(index)
                          ? "primary"
                          : "default"
                      }
                      variant={
                        formData.selectedDays?.includes(index)
                          ? "filled"
                          : "outlined"
                      }
                    />
                  ))}
                </Box>
              </Box>
            )}

            {/* Action Buttons */}
            <Box
              sx={{
                display: "flex",
                gap: 1.5,
                p: 3,
                pt: 2,
                backdropFilter: "blur(10px)",
                borderTop: "1px solid",
                borderTopColor: "divider",
                position: "sticky",
                bottom: 0,
                mt: 3,
              }}
            >
              {step !== "category" && (
                <Button
                  onClick={handleBack}
                  variant="outlined"
                  sx={{
                    borderRadius: 3,
                    py: 1.5,
                    px: 3,
                    minWidth: 100,
                    border: "2px solid",
                    borderColor: "divider",
                    color: "text.secondary",
                    "&:hover": {
                      borderColor: "text.secondary",
                      backgroundColor: "action.hover",
                    },
                  }}
                >
                  {t.back}
                </Button>
              )}
              <Button
                onClick={
                  step === "days" ||
                  (step === "repeat" && formData.repeatType !== "week")
                    ? handleSubmit
                    : handleNext
                }
                variant="contained"
                disabled={!isValid()}
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
                  "&:disabled": {
                    backgroundColor: "action.disabledBackground",
                    color: "action.disabled",
                    boxShadow: "none",
                  },
                }}
              >
                {step === "days" ||
                (step === "repeat" && formData.repeatType !== "week")
                  ? t.create
                  : t.next}
              </Button>
            </Box>
          </Box>
        </Sheet.Content>
      </Sheet.Container>
    </Sheet>
  );
};

export default AddStreakBottomSheet;
