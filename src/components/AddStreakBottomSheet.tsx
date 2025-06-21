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
}

const dayNames = [
  "Pazar",
  "Pazartesi",
  "Salı",
  "Çarşamba",
  "Perşembe",
  "Cuma",
  "Cumartesi",
];

const AddStreakBottomSheet: React.FC<AddStreakBottomSheetProps> = ({
  open,
  onClose,
  onSubmit,
}) => {
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
        return "Yeni Streak";
      case "repeat":
        return "Tekrarlanma";
      case "days":
        return "Günler";
      default:
        return "Yeni Streak";
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
          background: "linear-gradient(to bottom, #ffffff 0%, #fafafa 100%)",
        },
      }}
    >
      {/* Handle Bar */}
      <Box
        sx={{
          width: 40,
          height: 4,
          backgroundColor: "grey.300",
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
            backgroundColor: "grey.100",
            width: 32,
            height: 32,
            "&:hover": {
              backgroundColor: "grey.200",
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
            label="Streak Adı"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Örn: Su içmek, Egzersiz yapmak"
            variant="filled"
            sx={{
              mt: 2,
              "& .MuiFilledInput-root": {
                border: "none",
                backgroundColor: "grey.100",
                "&:hover": {
                  backgroundColor: "grey.200",
                },
                "&.Mui-focused": {
                  backgroundColor: "grey.100",
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
            <FormLabel>Ne sıklıkla tekrarlanacak?</FormLabel>
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
                label="Her gün"
              />
              <FormControlLabel
                value="week"
                control={<Radio />}
                label="Haftada belirli günlerde"
              />
              <FormControlLabel
                value="month"
                control={<Radio />}
                label="Aylık"
              />
            </RadioGroup>
          </FormControl>
        )}

        {step === "days" && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="body1" gutterBottom>
              Hangi günlerde tekrarlanacak?
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
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          backdropFilter: "blur(10px)",
          borderTop: "1px solid rgba(0, 0, 0, 0.06)",
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
              borderColor: "grey.300",
              color: "text.secondary",
              "&:hover": {
                borderColor: "grey.400",
                backgroundColor: "grey.50",
              },
            }}
          >
            Geri
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
              backgroundColor: "grey.300",
              boxShadow: "none",
            },
          }}
        >
          {step === "days" ||
          (step === "repeat" && formData.repeatType !== "week")
            ? "Tamamla"
            : "İleri"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddStreakBottomSheet;
