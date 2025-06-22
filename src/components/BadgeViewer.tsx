import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Card,
  CardContent,
  Box,
  Chip,
  LinearProgress,
  Slide,
} from "@mui/material";
import type { TransitionProps } from "@mui/material/transitions";
import CloseIcon from "@mui/icons-material/Close";
import LockIcon from "@mui/icons-material/Lock";
import type { UserBadges } from "../types";
import { getBadgeRarityColor, getBadgeRarityText } from "../utils/badges";
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

interface BadgeViewerProps {
  open: boolean;
  onClose: () => void;
  userBadges: UserBadges;
  language: Language;
}

const BadgeViewer: React.FC<BadgeViewerProps> = ({
  open,
  onClose,
  userBadges,
  language,
}) => {
  const t = useTranslations(language);
  const unlockedBadges = userBadges.badges.filter((badge) => badge.isUnlocked);
  const lockedBadges = userBadges.badges.filter((badge) => !badge.isUnlocked);
  const completionPercentage =
    (userBadges.totalUnlocked / userBadges.badges.length) * 100;

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
          🏆 {t.badges}
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
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <Box px={3} pb={2}>
        <Typography variant="body2" color="text.secondary" mb={1}>
          {userBadges.totalUnlocked} / {userBadges.badges.length}{" "}
          {t.badgesEarned}
        </Typography>
        <LinearProgress
          variant="determinate"
          value={completionPercentage}
          sx={{ height: 8, borderRadius: 4 }}
        />
      </Box>

      <DialogContent sx={{ px: 3, py: 0, overflow: "auto" }}>
        {/* Unlocked Badges */}
        {unlockedBadges.length > 0 && (
          <Box mb={4}>
            <Typography variant="h6" fontWeight="bold" mb={2} color="primary">
              {t.earnedBadges}
            </Typography>
            <Box
              display="flex"
              flexWrap="wrap"
              gap={1.5}
              sx={{
                "& > *": {
                  flex: "1 1 160px",
                  minWidth: "160px",
                  maxWidth: {
                    xs: "calc(50% - 6px)",
                    sm: "calc(33.333% - 8px)",
                    md: "calc(25% - 9px)",
                  },
                },
              }}
            >
              {unlockedBadges.map((badge) => (
                <Card
                  key={badge.id}
                  sx={{
                    border: 2,
                    borderColor: getBadgeRarityColor(badge.rarity),
                    position: "relative",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      transition: "transform 0.2s ease",
                    },
                  }}
                >
                  <CardContent sx={{ textAlign: "center", p: 1.5 }}>
                    <Typography variant="h3" mb={0.5} sx={{ fontSize: "2rem" }}>
                      {badge.emoji}
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      fontWeight="bold"
                      mb={0.5}
                      sx={{ fontSize: "0.9rem" }}
                    >
                      {badge.name}
                    </Typography>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      mb={1}
                      sx={{
                        minHeight: 32,
                        display: "block",
                        fontSize: "0.75rem",
                        lineHeight: 1.2,
                      }}
                    >
                      {badge.description}
                    </Typography>
                    <Chip
                      label={getBadgeRarityText(badge.rarity, language)}
                      size="small"
                      sx={{
                        backgroundColor: getBadgeRarityColor(badge.rarity),
                        color: "white",
                        fontWeight: "bold",
                        fontSize: "0.7rem",
                        height: 20,
                      }}
                    />
                    {badge.unlockedAt && (
                      <Typography
                        variant="caption"
                        display="block"
                        mt={0.5}
                        color="text.secondary"
                        sx={{ fontSize: "0.65rem" }}
                      >
                        {new Date(badge.unlockedAt).toLocaleDateString("tr-TR")}
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Box>
        )}

        {/* Locked Badges */}
        {lockedBadges.length > 0 && (
          <Box>
            <Typography
              variant="h6"
              fontWeight="bold"
              mb={2}
              color="text.secondary"
            >
              {t.lockedBadges}
            </Typography>
            <Box
              display="flex"
              flexWrap="wrap"
              gap={1.5}
              sx={{
                "& > *": {
                  flex: "1 1 160px",
                  minWidth: "160px",
                  maxWidth: {
                    xs: "calc(50% - 6px)",
                    sm: "calc(33.333% - 8px)",
                    md: "calc(25% - 9px)",
                  },
                },
              }}
            >
              {lockedBadges.map((badge) => (
                <Card
                  key={badge.id}
                  sx={{
                    opacity: 0.6,
                    border: 1,
                    borderColor: "divider",
                    position: "relative",
                  }}
                >
                  <CardContent sx={{ textAlign: "center", p: 1.5 }}>
                    <Box position="relative">
                      <Typography
                        variant="h3"
                        mb={0.5}
                        sx={{ filter: "grayscale(100%)", fontSize: "2rem" }}
                      >
                        {badge.emoji}
                      </Typography>
                      <LockIcon
                        sx={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          fontSize: 18,
                          color: "text.secondary",
                        }}
                      />
                    </Box>
                    <Typography
                      variant="subtitle2"
                      fontWeight="bold"
                      mb={0.5}
                      color="text.secondary"
                      sx={{ fontSize: "0.9rem" }}
                    >
                      {badge.name}
                    </Typography>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      mb={1}
                      sx={{
                        minHeight: 32,
                        display: "block",
                        fontSize: "0.75rem",
                        lineHeight: 1.2,
                      }}
                    >
                      {badge.description}
                    </Typography>
                    <Chip
                      label={getBadgeRarityText(badge.rarity, language)}
                      size="small"
                      variant="outlined"
                      sx={{
                        borderColor: getBadgeRarityColor(badge.rarity),
                        color: getBadgeRarityColor(badge.rarity),
                        fontSize: "0.7rem",
                        height: 20,
                      }}
                    />
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Box>
        )}

        {userBadges.badges.length === 0 && (
          <Box textAlign="center" py={3}>
            <Typography variant="h4" mb={1}>
              🎯
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" mb={1}>
              {t.noBadgesYet}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {t.completeBadgesMessage}
            </Typography>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BadgeViewer;
