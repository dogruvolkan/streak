import React from "react";
import {
  Box,
  Typography,
  IconButton,
  Paper,
  Chip,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import TimerIcon from "@mui/icons-material/Timer";
import { Sheet } from "react-modal-sheet";

interface SummaryBottomSheetProps {
  open: boolean;
  onClose: () => void;
  date: string; // ISO string (yyyy-mm-dd)
  streaksCompleted: number;
  todosCompleted: number;
  mood?: { mood: string; note?: string; emoji?: string };
  income: number;
  expense: number;
  pomodoroMinutes: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  t: any;
  currency: string;
}

const SummaryBottomSheet: React.FC<SummaryBottomSheetProps> = ({
  open,
  onClose,
  date,
  streaksCompleted,
  todosCompleted,
  mood,
  income,
  expense,
  pomodoroMinutes,
  t,
  currency,
}) => {
  const theme = useTheme();
  const balance = income - expense;
  const dateObj = new Date(date);
  return (
    <Sheet isOpen={open} onClose={onClose} snapPoints={[0.7]} initialSnap={0}>
      <Sheet.Container style={{ background: theme.palette.background.paper }}>
        <Sheet.Header>
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
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              px: 3,
              pb: 1,
              gap: 2,
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {dateObj.toLocaleDateString(undefined, {
                weekday: "long",
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </Typography>
            <IconButton
              onClick={onClose}
              edge="end"
              sx={{
                backgroundColor: "action.hover",
                width: 32,
                height: 32,
                ml: 1,
              }}
            >
              <CloseIcon sx={{ fontSize: 20 }} />
            </IconButton>
          </Box>
        </Sheet.Header>
        <Sheet.Content style={{ background: theme.palette.background.default }}>
          <Box sx={{ px: 3, pt: 2, pb: 2 }}>
            <Paper sx={{ p: 2, mb: 2 }} elevation={0}>
              <Box display="flex" alignItems="center" gap={2}>
                <CheckCircleIcon color="success" />
                <Typography variant="subtitle1">
                  {t.streaksCompleted || "Streaks Completed"}:{" "}
                  <b>{streaksCompleted}</b>
                </Typography>
              </Box>
            </Paper>
            <Paper sx={{ p: 2, mb: 2 }} elevation={0}>
              <Box display="flex" alignItems="center" gap={2}>
                <AssignmentTurnedInIcon color="primary" />
                <Typography variant="subtitle1">
                  {t.todosCompleted || "Todos Completed"}:{" "}
                  <b>{todosCompleted}</b>
                </Typography>
              </Box>
            </Paper>
            <Paper sx={{ p: 2, mb: 2 }} elevation={0}>
              <Box display="flex" alignItems="center" gap={2}>
                <EmojiEmotionsIcon color="warning" />
                <Typography variant="subtitle1">
                  {t.mood || "Mood"}: <b>{mood?.emoji || "-"}</b>{" "}
                  {mood?.mood ? `(${mood.mood})` : ""}
                </Typography>
              </Box>
              {mood?.note && (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 1 }}
                >
                  {mood.note}
                </Typography>
              )}
            </Paper>
            <Paper sx={{ p: 2, mb: 2 }} elevation={0}>
              <Box display="flex" alignItems="center" gap={2}>
                <MonetizationOnIcon color="success" />
                <Typography variant="subtitle1">
                  {t.income || "Income"}:{" "}
                  <b>
                    {income} {currency}
                  </b>
                </Typography>
                <MonetizationOnIcon color="error" />
                <Typography variant="subtitle1">
                  {t.expense || "Expense"}:{" "}
                  <b>
                    {expense} {currency}
                  </b>
                </Typography>
                <Chip
                  label={`${t.balance || "Balance"}: ${balance} ${currency}`}
                  color={balance >= 0 ? "success" : "error"}
                  size="small"
                  sx={{ ml: 2 }}
                />
              </Box>
            </Paper>
            <Paper sx={{ p: 2, mb: 2 }} elevation={0}>
              <Box display="flex" alignItems="center" gap={2}>
                <TimerIcon color="secondary" />
                <Typography variant="subtitle1">
                  {t.pomodoroMinutes || "Pomodoro Minutes"}:{" "}
                  <b>{pomodoroMinutes}</b>
                </Typography>
              </Box>
            </Paper>
          </Box>
        </Sheet.Content>
      </Sheet.Container>
    </Sheet>
  );
};

export default SummaryBottomSheet;
