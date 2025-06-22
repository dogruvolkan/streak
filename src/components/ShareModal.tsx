import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  Box,
  IconButton,
  Snackbar,
  Alert,
  Chip,
  Slide,
} from "@mui/material";
import type { TransitionProps } from "@mui/material/transitions";
import {
  Close as CloseIcon,
  ContentCopy as CopyIcon,
  Share as ShareIcon,
} from "@mui/icons-material";
import type { Streak } from "../types";
import type { Language } from "../utils/i18n";
import { useTranslations } from "../utils/i18n";
import { generateShareURL, copyToClipboard } from "../utils/sharing";
import { getCategoryName, categoryColors } from "../utils/categories";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface ShareModalProps {
  open: boolean;
  onClose: () => void;
  streak: Streak;
  language: Language;
}

const ShareModal = ({ open, onClose, streak, language }: ShareModalProps) => {
  const [shareURL, setShareURL] = useState("");
  const [showCopySuccess, setShowCopySuccess] = useState(false);
  const t = useTranslations(language);

  // Generate share URL when modal opens
  useEffect(() => {
    if (open) {
      const url = generateShareURL(streak, language);
      setShareURL(url);
    }
  }, [open, streak, language]);

  const handleCopyLink = async () => {
    const success = await copyToClipboard(shareURL);
    if (success) {
      setShowCopySuccess(true);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${streak.emoji} ${streak.name} - ${t.sharedStreak}`,
          text: `Check out my streak progress: ${streak.name}`,
          url: shareURL,
        });
      } catch {
        // User cancelled or share failed, fallback to copy
        handleCopyLink();
      }
    } else {
      // Fallback to copy if Web Share API not available
      handleCopyLink();
    }
  };

  return (
    <>
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

        <DialogTitle>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="h6" component="h2" sx={{ fontWeight: 600 }}>
              {t.shareStreak}
            </Typography>
            <IconButton onClick={onClose} size="small">
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>

        <DialogContent>
          {/* Streak Preview */}
          <Box
            sx={{
              p: 2,
              mb: 3,
              borderRadius: 2,
              border: "1px solid",
              borderColor: "divider",
              backgroundColor: "background.paper",
            }}
          >
            <Box display="flex" alignItems="center" gap={2} mb={1}>
              <Typography variant="h6" component="span">
                {streak.emoji}
              </Typography>
              <Box flex={1}>
                <Typography variant="subtitle1" fontWeight="medium">
                  {streak.name}
                </Typography>
                <Box display="flex" alignItems="center" gap={1} mt={0.5}>
                  <Chip
                    label={getCategoryName(streak.category, language)}
                    size="small"
                    sx={{
                      backgroundColor: categoryColors[streak.category] + "20",
                      color: categoryColors[streak.category],
                      fontWeight: "medium",
                      fontSize: "0.75rem",
                    }}
                  />
                  <Typography variant="body2" color="text.secondary">
                    • {streak.count} days
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>

          {/* Description */}
          <Typography variant="body2" color="text.secondary" mb={3}>
            {t.shareDescription}
          </Typography>

          {/* Share URL */}
          <TextField
            fullWidth
            label={t.shareStreak}
            value={shareURL}
            variant="outlined"
            InputProps={{
              readOnly: true,
              endAdornment: (
                <IconButton onClick={handleCopyLink} edge="end">
                  <CopyIcon />
                </IconButton>
              ),
            }}
            sx={{ mb: 2 }}
          />
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
          <Button
            onClick={onClose}
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
            {t.cancel}
          </Button>
          <Button
            onClick={handleNativeShare}
            variant="contained"
            startIcon={<ShareIcon />}
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
            {t.share}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Copy Success Snackbar */}
      <Snackbar
        open={showCopySuccess}
        autoHideDuration={3000}
        onClose={() => setShowCopySuccess(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setShowCopySuccess(false)}
          severity="success"
          variant="filled"
        >
          {t.linkCopied}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ShareModal;
