import React, { useState } from "react";
import { Sheet } from "react-modal-sheet";
import "react-modal-sheet/dist/styles.css";
import {
  Button,
  Box,
  Typography,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Divider,
  IconButton,
  Alert,
  AlertTitle,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import LanguageIcon from "@mui/icons-material/Language";
import PaletteIcon from "@mui/icons-material/Palette";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import DeleteIcon from "@mui/icons-material/Delete";
import type { Language } from "../utils/i18n";
import { useTranslations } from "../utils/i18n";

export type ThemeMode = "light" | "dark";
export type ThemeColor = "purple" | "blue" | "green" | "orange" | "pink";

interface SettingsProps {
  open: boolean;
  onClose: () => void;
  language: Language;
  onLanguageChange: (language: Language) => void;
  themeMode: ThemeMode;
  onThemeModeChange: (mode: ThemeMode) => void;
  themeColor: ThemeColor;
  onThemeColorChange: (color: ThemeColor) => void;
  onClearData: () => void;
}

const Settings: React.FC<SettingsProps> = ({
  open,
  onClose,
  language,
  onLanguageChange,
  themeMode,
  onThemeModeChange,
  themeColor,
  onThemeColorChange,
  onClearData,
}) => {
  const t = useTranslations(language);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const themeColors = [
    {
      key: "purple" as ThemeColor,
      name: language === "tr" ? "Mor" : "Purple",
      color: "#7c3aed",
    },
    {
      key: "blue" as ThemeColor,
      name: language === "tr" ? "Mavi" : "Blue",
      color: "#3b82f6",
    },
    {
      key: "green" as ThemeColor,
      name: language === "tr" ? "Yeşil" : "Green",
      color: "#10b981",
    },
    {
      key: "orange" as ThemeColor,
      name: language === "tr" ? "Turuncu" : "Orange",
      color: "#f59e0b",
    },
    {
      key: "pink" as ThemeColor,
      name: language === "tr" ? "Pembe" : "Pink",
      color: "#ec4899",
    },
  ];

  return (
    <Sheet isOpen={open} onClose={onClose} snapPoints={[0.9]} initialSnap={0}>
      <Sheet.Container>
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
              {t.settings}
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

        <Sheet.Content>
          <Box sx={{ px: 3, pb: 2, maxHeight: "70vh", overflowY: "auto" }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              {/* Language Selection */}
              <Box>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <LanguageIcon sx={{ mr: 1, color: "primary.main" }} />
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 600, color: "text.primary" }}
                  >
                    {t.language}
                  </Typography>
                </Box>
                <FormControl>
                  <RadioGroup
                    value={language}
                    onChange={(e) =>
                      onLanguageChange(e.target.value as Language)
                    }
                    sx={{
                      "& .MuiFormControlLabel-label": {
                        color: "text.primary",
                      },
                    }}
                  >
                    <FormControlLabel
                      value="en"
                      control={
                        <Radio
                          sx={{
                            color: "text.secondary",
                            "&.Mui-checked": { color: "primary.main" },
                          }}
                        />
                      }
                      label={
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            color: "text.primary",
                          }}
                        >
                          <Box sx={{ mr: 1 }}>🇺🇸</Box>
                          English
                        </Box>
                      }
                    />
                    <FormControlLabel
                      value="tr"
                      control={
                        <Radio
                          sx={{
                            color: "text.secondary",
                            "&.Mui-checked": { color: "primary.main" },
                          }}
                        />
                      }
                      label={
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            color: "text.primary",
                          }}
                        >
                          <Box sx={{ mr: 1 }}>🇹🇷</Box>
                          Türkçe
                        </Box>
                      }
                    />
                  </RadioGroup>
                </FormControl>
              </Box>

              <Divider />

              {/* Theme Mode */}
              <Box>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  {themeMode === "dark" ? (
                    <DarkModeIcon sx={{ mr: 1, color: "primary.main" }} />
                  ) : (
                    <LightModeIcon sx={{ mr: 1, color: "primary.main" }} />
                  )}
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 600, color: "text.primary" }}
                  >
                    {t.appearance}
                  </Typography>
                </Box>
                <FormControl>
                  <RadioGroup
                    value={themeMode}
                    onChange={(e) =>
                      onThemeModeChange(e.target.value as ThemeMode)
                    }
                    sx={{
                      "& .MuiFormControlLabel-label": {
                        color: "text.primary",
                      },
                    }}
                  >
                    <FormControlLabel
                      value="light"
                      control={
                        <Radio
                          sx={{
                            color: "text.secondary",
                            "&.Mui-checked": { color: "primary.main" },
                          }}
                        />
                      }
                      label={
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            color: "text.primary",
                          }}
                        >
                          <LightModeIcon sx={{ mr: 1, fontSize: 20 }} />
                          {t.light}
                        </Box>
                      }
                    />
                    <FormControlLabel
                      value="dark"
                      control={
                        <Radio
                          sx={{
                            color: "text.secondary",
                            "&.Mui-checked": { color: "primary.main" },
                          }}
                        />
                      }
                      label={
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            color: "text.primary",
                          }}
                        >
                          <DarkModeIcon sx={{ mr: 1, fontSize: 20 }} />
                          {t.dark}
                        </Box>
                      }
                    />
                  </RadioGroup>
                </FormControl>
              </Box>

              <Divider />

              {/* Theme Color */}
              <Box>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <PaletteIcon sx={{ mr: 1, color: "primary.main" }} />
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 600, color: "text.primary" }}
                  >
                    {t.themeColor}
                  </Typography>
                </Box>
                <FormControl>
                  <RadioGroup
                    value={themeColor}
                    onChange={(e) =>
                      onThemeColorChange(e.target.value as ThemeColor)
                    }
                    sx={{
                      "& .MuiFormControlLabel-label": {
                        color: "text.primary",
                      },
                    }}
                  >
                    {themeColors.map((color) => (
                      <FormControlLabel
                        key={color.key}
                        value={color.key}
                        control={
                          <Radio
                            sx={{
                              color: "text.secondary",
                              "&.Mui-checked": { color: color.color },
                            }}
                          />
                        }
                        label={
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              color: "text.primary",
                            }}
                          >
                            <Box
                              sx={{
                                width: 20,
                                height: 20,
                                borderRadius: "50%",
                                backgroundColor: color.color,
                                mr: 1,
                              }}
                            />
                            {color.name}
                          </Box>
                        }
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              </Box>
            </Box>

            {/* Clear Data Section */}
            <Box sx={{ mt: 3 }}>
              <Divider sx={{ mb: 3 }} />
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <DeleteIcon sx={{ mr: 1, color: "error.main" }} />
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: 600, color: "text.primary" }}
                >
                  {t.dangerZone}
                </Typography>
              </Box>

              {showClearConfirm ? (
                <Box>
                  <Alert severity="warning" sx={{ mb: 2 }}>
                    <AlertTitle>{t.confirmClearData}</AlertTitle>
                    {t.clearDataWarning}
                  </Alert>
                  <Box sx={{ display: "flex", gap: 2 }}>
                    <Button
                      variant="outlined"
                      onClick={() => setShowClearConfirm(false)}
                      fullWidth
                      sx={{
                        borderRadius: 2,
                        py: 1.5,
                        textTransform: "none",
                        fontWeight: 500,
                      }}
                    >
                      {t.cancel}
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => {
                        onClearData();
                        setShowClearConfirm(false);
                      }}
                      fullWidth
                      sx={{
                        borderRadius: 2,
                        py: 1.5,
                        textTransform: "none",
                        fontWeight: 500,
                      }}
                    >
                      {t.clearAllData}
                    </Button>
                  </Box>
                </Box>
              ) : (
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<DeleteIcon />}
                  onClick={() => setShowClearConfirm(true)}
                  fullWidth
                  sx={{
                    borderRadius: 2,
                    py: 1.5,
                    textTransform: "none",
                    fontWeight: 500,
                    borderColor: "error.main",
                    color: "error.main",
                    "&:hover": {
                      borderColor: "error.dark",
                      backgroundColor: "error.50",
                    },
                  }}
                >
                  {t.clearAllData}
                </Button>
              )}
            </Box>

            {/* Done Button */}
            <Box sx={{ mt: 4, mb: 2 }}>
              <Button
                onClick={onClose}
                variant="contained"
                fullWidth
                sx={{
                  borderRadius: 3,
                  py: 1.5,
                  fontSize: "1rem",
                  fontWeight: 600,
                  backgroundColor: "primary.main",
                  color: "primary.contrastText",
                  boxShadow: (theme) =>
                    `0 4px 12px ${
                      theme.palette.mode === "dark"
                        ? "rgba(124, 58, 237, 0.4)"
                        : "rgba(124, 58, 237, 0.3)"
                    }`,
                  "&:hover": {
                    backgroundColor: "primary.dark",
                    boxShadow: (theme) =>
                      `0 6px 16px ${
                        theme.palette.mode === "dark"
                          ? "rgba(124, 58, 237, 0.5)"
                          : "rgba(124, 58, 237, 0.4)"
                      }`,
                  },
                }}
              >
                {t.done}
              </Button>
            </Box>
          </Box>
        </Sheet.Content>
      </Sheet.Container>
    </Sheet>
  );
};

export default Settings;
