import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Divider,
  IconButton,
  Slide,
  Alert,
  AlertTitle,
} from "@mui/material";
import type { TransitionProps } from "@mui/material/transitions";
import CloseIcon from "@mui/icons-material/Close";
import LanguageIcon from "@mui/icons-material/Language";
import PaletteIcon from "@mui/icons-material/Palette";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import DeleteIcon from "@mui/icons-material/Delete";
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
    <Dialog
      open={open}
      onClose={onClose}
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
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
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
      </DialogTitle>

      <DialogContent
        sx={{ px: 3, pb: 2, maxHeight: "70vh", overflowY: "auto" }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {/* Language Selection */}
          <Box>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <LanguageIcon sx={{ mr: 1, color: "primary.main" }} />
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                {t.language}
              </Typography>
            </Box>
            <FormControl>
              <RadioGroup
                value={language}
                onChange={(e) => onLanguageChange(e.target.value as Language)}
              >
                <FormControlLabel
                  value="en"
                  control={<Radio />}
                  label={
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Box sx={{ mr: 1 }}>🇺🇸</Box>
                      English
                    </Box>
                  }
                />
                <FormControlLabel
                  value="tr"
                  control={<Radio />}
                  label={
                    <Box sx={{ display: "flex", alignItems: "center" }}>
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
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                {t.appearance}
              </Typography>
            </Box>
            <FormControl>
              <RadioGroup
                value={themeMode}
                onChange={(e) => onThemeModeChange(e.target.value as ThemeMode)}
              >
                <FormControlLabel
                  value="light"
                  control={<Radio />}
                  label={
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <LightModeIcon sx={{ mr: 1, fontSize: 20 }} />
                      {t.lightMode}
                    </Box>
                  }
                />
                <FormControlLabel
                  value="dark"
                  control={<Radio />}
                  label={
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <DarkModeIcon sx={{ mr: 1, fontSize: 20 }} />
                      {t.darkMode}
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
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                {t.themeColor}
              </Typography>
            </Box>
            <FormControl>
              <RadioGroup
                value={themeColor}
                onChange={(e) =>
                  onThemeColorChange(e.target.value as ThemeColor)
                }
              >
                {themeColors.map((color) => (
                  <FormControlLabel
                    key={color.key}
                    value={color.key}
                    control={<Radio />}
                    label={
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Box
                          sx={{
                            width: 20,
                            height: 20,
                            borderRadius: "50%",
                            backgroundColor: color.color,
                            mr: 1,
                            border: "2px solid",
                            borderColor: "divider",
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
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              {t.clearData}
            </Typography>
          </Box>

          {showClearConfirm ? (
            <Box>
              <Alert severity="warning" sx={{ mb: 2 }}>
                <AlertTitle>{t.clearDataWarning}</AlertTitle>
                {t.clearDataConfirm}
              </Alert>
              <Box sx={{ display: "flex", gap: 1 }}>
                <Button
                  variant="outlined"
                  onClick={() => setShowClearConfirm(false)}
                  sx={{ flex: 1 }}
                >
                  {t.cancel}
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => {
                    onClearData();
                    setShowClearConfirm(false);
                    onClose();
                  }}
                  sx={{ flex: 1 }}
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
              }}
            >
              {t.clearAllData}
            </Button>
          )}
        </Box>
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
        <Button
          onClick={onClose}
          variant="contained"
          fullWidth
          sx={{
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
          {t.done}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Settings;
