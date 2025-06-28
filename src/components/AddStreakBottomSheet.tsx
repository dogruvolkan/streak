import React, { useState, useEffect } from "react";
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
  Modal,
  Backdrop,
  Slide,
} from "@mui/material";
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

  // State for keyboard handling
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);

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

  // Handle keyboard appearance/disappearance
  useEffect(() => {
    const handleResize = () => {
      const currentHeight = window.innerHeight;
      const heightDifference = viewportHeight - currentHeight;

      // If height decreased by more than 150px, keyboard is probably open
      setIsKeyboardOpen(heightDifference > 150);

      // Update viewport height
      setViewportHeight(currentHeight);
    };

    const handleVisualViewportChange = () => {
      if (window.visualViewport) {
        const keyboardHeight =
          window.innerHeight - window.visualViewport.height;
        setIsKeyboardOpen(keyboardHeight > 100);
      }
    };

    // Listen for viewport changes
    window.addEventListener("resize", handleResize);

    // Use visual viewport API if available (better for mobile)
    if (window.visualViewport) {
      window.visualViewport.addEventListener(
        "resize",
        handleVisualViewportChange
      );
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      if (window.visualViewport) {
        window.visualViewport.removeEventListener(
          "resize",
          handleVisualViewportChange
        );
      }
    };
  }, [viewportHeight]);
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
    if (step === "days") return true; // Artık hiç gün seçmemek de geçerli (haftada bir kere için)
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
            maxHeight: isKeyboardOpen ? "95vh" : "90vh",
            height: isKeyboardOpen ? "95vh" : "auto",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            // iOS specific safe area handling
            paddingBottom: "env(safe-area-inset-bottom)",
            // Force the modal to be on top when keyboard is open
            transform: isKeyboardOpen ? "translateY(-10px)" : "translateY(0)",
            transition: "transform 0.3s ease-in-out",
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
            <Typography
              variant="h6"
              sx={{ fontWeight: 600, color: "text.primary" }}
            >
              {getTitle()}
            </Typography>
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

          {/* Scrollable Content */}
          <Box
            sx={{
              flex: 1,
              overflow: "auto",
              backgroundColor: theme.palette.background.default,
              px: 3,
              pb: isKeyboardOpen ? 2 : 3,
              // Add bottom padding to ensure content is not hidden behind keyboard
              marginBottom: isKeyboardOpen ? "80px" : "0px",
            }}
          >
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
                  <Button
                    onClick={() =>
                      setFormData({ ...formData, isQuantityBased: false })
                    }
                    variant={
                      !formData.isQuantityBased ? "contained" : "outlined"
                    }
                    sx={{
                      width: "100%",
                      minHeight: 64,
                      justifyContent: "flex-start",
                      textAlign: "left",
                      p: 2,
                      borderRadius: 1,
                      backgroundColor: !formData.isQuantityBased
                        ? "primary.main"
                        : "transparent",
                      borderColor: !formData.isQuantityBased
                        ? "primary.main"
                        : "divider",
                      "&:hover": {
                        backgroundColor: !formData.isQuantityBased
                          ? "primary.dark"
                          : "action.hover",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1.5,
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
                            textAlign: "left",
                          }}
                        >
                          {t.simpleStreak}
                        </Typography>
                      </Box>
                    </Box>
                  </Button>
                  <Button
                    onClick={() =>
                      setFormData({ ...formData, isQuantityBased: true })
                    }
                    variant={
                      formData.isQuantityBased ? "contained" : "outlined"
                    }
                    sx={{
                      width: "100%",
                      minHeight: 64,
                      justifyContent: "flex-start",
                      textAlign: "left",
                      p: 2,
                      borderRadius: 1,
                      backgroundColor: formData.isQuantityBased
                        ? "primary.main"
                        : "transparent",
                      borderColor: formData.isQuantityBased
                        ? "primary.main"
                        : "divider",
                      "&:hover": {
                        backgroundColor: formData.isQuantityBased
                          ? "primary.dark"
                          : "action.hover",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1.5,
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
                            textAlign: "left",
                          }}
                        >
                          {t.quantityBasedStreak}
                        </Typography>
                      </Box>
                    </Box>
                  </Button>
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
                        value={
                          formData.dailyGoal === 1 ? "" : formData.dailyGoal
                        }
                        onChange={(e) => {
                          const value =
                            e.target.value === ""
                              ? 1
                              : parseInt(e.target.value) || 1;
                          setFormData({
                            ...formData,
                            dailyGoal: value,
                          });
                        }}
                        placeholder="1"
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
                
                {/* Weekly frequency options */}
                <Box sx={{ mb: 3 }}>
                  <Button
                    onClick={() => setFormData({ ...formData, selectedDays: [] })}
                    variant={(!formData.selectedDays || formData.selectedDays.length === 0) ? "contained" : "outlined"}
                    sx={{
                      width: "100%",
                      mb: 1,
                      justifyContent: "flex-start",
                      p: 2,
                    }}
                  >
                    <Box sx={{ textAlign: "left" }}>
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>
                        📅 {t.weeklyOnce}
                      </Typography>
                      <Typography variant="caption" >
                        {t.weeklyOnceDesc}
                      </Typography>
                    </Box>
                  </Button>
                  
                  <Button
                    onClick={() => {
                      // If no days selected, default to today
                      if (!formData.selectedDays || formData.selectedDays.length === 0) {
                        const today = new Date().getDay();
                        setFormData({ ...formData, selectedDays: [today] });
                      }
                    }}
                    variant={(formData.selectedDays && formData.selectedDays.length > 0) ? "contained" : "outlined"}
                    sx={{
                      width: "100%",
                      justifyContent: "flex-start",
                      p: 2,
                    }}
                  >
                    <Box sx={{ textAlign: "left" }}>
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>
                        🗓️ {t.specificDays}
                      </Typography>
                      <Typography variant="caption" >
                        {t.specificDaysDesc}
                      </Typography>
                    </Box>
                  </Button>
                </Box>

                {/* Day selection chips - only show if specific days mode is selected */}
                {formData.selectedDays && formData.selectedDays.length > 0 && (
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
                )}
              </Box>
            )}
          </Box>

          {/* Fixed Action Buttons */}
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
              // Ensure buttons are always visible above keyboard
              position: "relative",
              zIndex: 10,
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
      </Slide>
    </Modal>
  );
};

export default AddStreakBottomSheet;
