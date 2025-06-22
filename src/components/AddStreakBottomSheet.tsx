import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
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
  Slide,
  IconButton,
} from "@mui/material";
import type { TransitionProps } from "@mui/material/transitions";
import CloseIcon from "@mui/icons-material/Close";
import type { CreateStreakFormData, RepeatType } from "../types";
import type { Language } from "../utils/i18n";
import { useTranslations } from "../utils/i18n";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

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
  const [step, setStep] = useState<"name" | "repeat" | "days">("name");
  const [formData, setFormData] = useState<CreateStreakFormData>({
    name: "",
    repeatType: "day",
    selectedDays: [],
  });

  const handleClose = () => {
    setStep("name");
    setFormData({
      name: "",
      repeatType: "day",
      selectedDays: [],
    });
    onClose();
  };

  const handleNext = () => {
    if (step === "name") {
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
    if (step === "repeat") {
      setStep("name");
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
    if (step === "name") return formData.name.trim().length > 0;
    if (step === "repeat") return true;
    if (step === "days") return (formData.selectedDays?.length || 0) > 0;
    return true;
  };

  const getTitle = () => {
    switch (step) {
      case "name":
        return t.addStreak;
      case "repeat":
        return t.repeatPattern;
      case "days":
        return t.selectDays;
      default:
        return t.addStreak;
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
      maxWidth={false}
      fullWidth
      PaperProps={{
        sx: {
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          m: 0,
          width: "100%",
          maxWidth: "100vw",
          borderRadius: "20px 20px 0 0",
          maxHeight: "85vh",
          paddingBottom: "env(safe-area-inset-bottom)",
          background:
            "linear-gradient(to bottom, background.paper 0%, background.default 100%)",
        },
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
          mt: 1.5,
          mb: 2,
        }}
      />

      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          pb: 1,
          px: 3,
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
      </DialogTitle>

      <DialogContent sx={{ px: 3, pb: 2 }}>
        {step === "name" && (
          <TextField
            autoFocus
            fullWidth
            label={t.streakName}
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
      </DialogContent>

      <DialogActions
        sx={{
          p: 3,
          pt: 2,
          gap: 1.5,
          backgroundColor: "background.paper",
          backdropFilter: "blur(10px)",
          borderTop: "1px solid",
          borderTopColor: "divider",
        }}
      >
        {step !== "name" && (
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
      </DialogActions>
    </Dialog>
  );
};

export default AddStreakBottomSheet;
