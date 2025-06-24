import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Divider,
  Chip,
  Slide,
} from "@mui/material";
import type { TransitionProps } from "@mui/material/transitions";
import CloseIcon from "@mui/icons-material/Close";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import type { Streak } from "../types";
import type { Language } from "../utils/i18n";
import { useTranslations } from "../utils/i18n";
import { getCategoryName, categoryColors } from "../utils/categories";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface EditStreakBottomSheetProps {
  open: boolean;
  onClose: () => void;
  streak: Streak | null;
  onSave: (streakId: string, updates: Partial<Streak>) => void;
  language: Language;
}

const EditStreakBottomSheet: React.FC<EditStreakBottomSheetProps> = ({
  open,
  onClose,
  streak,
  onSave,
  language,
}) => {
  const [name, setName] = useState("");
  const [count, setCount] = useState(0);
  const [dailyGoal, setDailyGoal] = useState(1);
  const [dailyProgress, setDailyProgress] = useState(0);

  const t = useTranslations(language);

  useEffect(() => {
    if (streak) {
      setName(streak.name);
      setCount(streak.count);
      setDailyGoal(streak.dailyGoal || 1);
      setDailyProgress(streak.dailyProgress || 0);
    }
  }, [streak]);

  const handleSave = () => {
    if (!streak) return;

    const updates: Partial<Streak> = {
      name: name.trim(),
      count: Math.max(0, count),
    };

    if (streak.isQuantityBased) {
      updates.dailyGoal = Math.max(1, dailyGoal);
      updates.dailyProgress = Math.max(0, dailyProgress);
    }

    onSave(streak.id, updates);
    onClose();
  };

  const handleClose = () => {
    onClose();
  };

  const adjustCount = (delta: number) => {
    setCount(Math.max(0, count + delta));
  };

  const adjustDailyGoal = (delta: number) => {
    setDailyGoal(Math.max(1, dailyGoal + delta));
  };

  const adjustDailyProgress = (delta: number) => {
    setDailyProgress(Math.max(0, dailyProgress + delta));
  };

  if (!open || !streak) return null;

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
          maxHeight: "90vh",
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
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography
            component="span"
            sx={{
              fontSize: "2rem",
              lineHeight: 1,
            }}
          >
            {streak.emoji}
          </Typography>
          <Typography variant="h5" component="h2" fontWeight="bold">
            {t.editStreak}
          </Typography>
        </Box>
        <IconButton onClick={handleClose} size="large">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent
        sx={{ px: 3, pb: 2, maxHeight: "70vh", overflowY: "auto" }}
      >
        {/* Category and Type Info */}
        <Box sx={{ display: "flex", gap: 1, mb: 3 }}>
          <Chip
            label={getCategoryName(streak.category, language)}
            sx={{
              backgroundColor: categoryColors[streak.category],
              color: "white",
              fontWeight: 500,
            }}
          />
          {streak.isQuantityBased && (
            <Chip
              label={t.quantityBased}
              variant="outlined"
              sx={{
                borderColor: "primary.main",
                color: "primary.main",
              }}
            />
          )}
        </Box>

        <Divider sx={{ mb: 3 }} />

        {/* Name Field */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" fontWeight="medium" sx={{ mb: 1 }}>
            {t.streakName}
          </Typography>
          <TextField
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t.enterStreakName}
            variant="outlined"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
              },
            }}
          />
        </Box>

        {/* Count Adjustment */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" fontWeight="medium" sx={{ mb: 2 }}>
            {t.totalCount}
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 2,
              p: 2,
              border: "2px solid",
              borderColor: "primary.main",
              borderRadius: 2,
              backgroundColor: "primary.50",
            }}
          >
            <IconButton
              onClick={() => adjustCount(-1)}
              disabled={count <= 0}
              sx={{
                border: "1px solid",
                borderColor: "primary.main",
                "&:hover": {
                  backgroundColor: "primary.50",
                },
              }}
            >
              <RemoveIcon />
            </IconButton>
            <Typography
              variant="h4"
              fontWeight="bold"
              sx={{
                minWidth: 80,
                textAlign: "center",
                color: "primary.main",
              }}
            >
              {count}
            </Typography>
            <IconButton
              onClick={() => adjustCount(1)}
              sx={{
                border: "1px solid",
                borderColor: "primary.main",
                "&:hover": {
                  backgroundColor: "primary.50",
                },
              }}
            >
              <AddIcon />
            </IconButton>
          </Box>
        </Box>

        {/* Quantity-based specific controls */}
        {streak.isQuantityBased && (
          <>
            {/* Daily Goal */}
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="subtitle1"
                fontWeight="medium"
                sx={{ mb: 2 }}
              >
                {t.dailyGoal} ({streak.unit})
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 2,
                  p: 2,
                  border: "2px solid",
                  borderColor: "warning.main",
                  borderRadius: 2,
                  backgroundColor: "warning.50",
                }}
              >
                <IconButton
                  onClick={() => adjustDailyGoal(-1)}
                  disabled={dailyGoal <= 1}
                  sx={{
                    border: "1px solid",
                    borderColor: "warning.main",
                    "&:hover": {
                      backgroundColor: "warning.50",
                    },
                    "&:disabled": {
                      backgroundColor: "action.disabledBackground",
                      borderColor: "action.disabled",
                    },
                  }}
                >
                  <RemoveIcon />
                </IconButton>
                <Typography
                  variant="h4"
                  fontWeight="bold"
                  sx={{
                    minWidth: 80,
                    textAlign: "center",
                    color: "warning.main",
                  }}
                >
                  {dailyGoal}
                </Typography>
                <IconButton
                  onClick={() => adjustDailyGoal(1)}
                  sx={{
                    border: "1px solid",
                    borderColor: "warning.main",
                    "&:hover": {
                      backgroundColor: "warning.50",
                    },
                  }}
                >
                  <AddIcon />
                </IconButton>
              </Box>
            </Box>

            {/* Daily Progress */}
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="subtitle1"
                fontWeight="medium"
                sx={{ mb: 2 }}
              >
                {t.todayProgress} ({streak.unit})
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 2,
                  p: 2,
                  border: "2px solid",
                  borderColor: "success.main",
                  borderRadius: 2,
                  backgroundColor: "success.50",
                }}
              >
                <IconButton
                  onClick={() => adjustDailyProgress(-1)}
                  disabled={dailyProgress <= 0}
                  sx={{
                    border: "1px solid",
                    borderColor: "success.main",
                    "&:hover": {
                      backgroundColor: "success.50",
                    },
                    "&:disabled": {
                      backgroundColor: "action.disabledBackground",
                      borderColor: "action.disabled",
                    },
                  }}
                >
                  <RemoveIcon />
                </IconButton>
                <Typography
                  variant="h4"
                  fontWeight="bold"
                  sx={{
                    minWidth: 80,
                    textAlign: "center",
                    color: "success.main",
                  }}
                >
                  {dailyProgress}
                </Typography>
                <IconButton
                  onClick={() => adjustDailyProgress(1)}
                  sx={{
                    border: "1px solid",
                    borderColor: "success.main",
                    "&:hover": {
                      backgroundColor: "success.50",
                    },
                  }}
                >
                  <AddIcon />
                </IconButton>
              </Box>
            </Box>
          </>
        )}
      </DialogContent>

      <DialogActions
        sx={{
          p: 3,
          pt: 2,
          backgroundColor: "background.paper",
          backdropFilter: "blur(10px)",
          borderTop: "1px solid",
          borderTopColor: "divider",
        }}
      >
        {/* Action Buttons */}
        <Box sx={{ display: "flex", gap: 2, width: "100%" }}>
          <Button
            variant="outlined"
            onClick={handleClose}
            fullWidth
            size="large"
            sx={{
              borderRadius: 2,
              py: 1.5,
              borderColor: "text.primary",
              color: "text.primary",
              "&:hover": {
                borderColor: "primary.main",
                backgroundColor: "action.hover",
              },
            }}
          >
            {t.cancel}
          </Button>
          <Button
            variant="contained"
            onClick={handleSave}
            fullWidth
            size="large"
            disabled={!name.trim()}
            sx={{
              borderRadius: 2,
              py: 1.5,
              backgroundColor: "primary.main",
              color: "primary.contrastText",
              "&:hover": {
                backgroundColor: "primary.dark",
              },
            }}
          >
            {t.save}
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default EditStreakBottomSheet;
