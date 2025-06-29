import React from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Chip,
  IconButton,
  useTheme,
} from "@mui/material";
import { Sheet } from "react-modal-sheet";
import type { PomodoroHistoryEntry } from "../types";
import {
  getPomodoroHistoryByDay,
  getTotalWorkAndBreakMinutesFromHistory,
} from "../utils/pomodoro";
import CloseIcon from "@mui/icons-material/Close";
import { getCurrentLanguage, useTranslations } from "../utils/i18n";

interface Props {
  open: boolean;
  onClose: () => void;
  entries: PomodoroHistoryEntry[];
  date: string;
}

const typeColor = {
  work: "primary",
  short: "success",
  long: "secondary",
};

const PomodoroHistoryBottomSheet: React.FC<Props> = ({
  open,
  onClose,
  date,
}) => {
  // Günlük ve toplam çalışma süreleri
  const grouped = getPomodoroHistoryByDay();
  const dayData = grouped[date] || {
    entries: [],
    totalMinutes: 0,
    totalBreakMinutes: 0,
  };
  const total = getTotalWorkAndBreakMinutesFromHistory();

  const theme = useTheme();
  const language = getCurrentLanguage();
  const t = useTranslations(language);

  // Sheet.Container'da sx yerine style kullanılmalı, entries prop'u kaldırıldı
  return (
    <Sheet isOpen={open} onClose={onClose} snapPoints={[0.6]} initialSnap={0}>
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
              {t.pomodoroHistoryTitle} - {date}
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
          <Box
            sx={{ px: 3, pb: 2, pt: 2, maxHeight: "50vh", overflowY: "auto" }}
          >
            <Typography color="primary" fontWeight={600} mb={1}>
              {t.pomodoroToday}: {dayData.totalMinutes} min {t.pomodoroWork}, {dayData.totalBreakMinutes} min {t.pomodoroShortBreak}
              <br />
              {t.pomodoroTotal}: {total.work} min {t.pomodoroWork}, {total.break} min {t.pomodoroShortBreak}
            </Typography>
            {dayData.entries.length === 0 ? (
              <Typography color="text.secondary">
                {t.pomodoroNoRecords}
              </Typography>
            ) : (
              <List style={{ overflowY: "auto" }}>
                {dayData.entries.map((e) => (
                  <ListItem key={e.id} disableGutters>
                    <Chip
                      label={
                        e.type === "work"
                          ? t.pomodoroWork
                          : e.type === "short"
                          ? t.pomodoroShort
                          : t.pomodoroLong
                      }
                      color={typeColor[e.type] as "primary" | "success" | "secondary"}
                      size="small"
                      sx={{ mr: 1 }}
                    />
                    <ListItemText
                      primary={
                        e.start.slice(11, 16) + " - " + e.end.slice(11, 16)
                      }
                      secondary={
                        e.type === "work"
                          ? t.pomodoroFocus
                          : e.type === "short"
                          ? t.pomodoroShortBreak
                          : t.pomodoroLongBreak
                      }
                    />
                  </ListItem>
                ))}
              </List>
            )}
          </Box>
        </Sheet.Content>
      </Sheet.Container>
    </Sheet>
  );
};

export default PomodoroHistoryBottomSheet;
