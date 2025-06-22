import React from "react";
import {
  Drawer,
  IconButton,
  Typography,
  Card,
  CardContent,
  Box,
  Chip,
  LinearProgress,
  AppBar,
  Toolbar,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import LockIcon from "@mui/icons-material/Lock";
import type { UserBadges } from "../types";
import { getBadgeRarityColor, getBadgeRarityText } from "../utils/badges";

interface BadgeViewerProps {
  open: boolean;
  onClose: () => void;
  userBadges: UserBadges;
}

const BadgeViewer: React.FC<BadgeViewerProps> = ({
  open,
  onClose,
  userBadges,
}) => {
  const unlockedBadges = userBadges.badges.filter((badge) => badge.isUnlocked);
  const lockedBadges = userBadges.badges.filter((badge) => !badge.isUnlocked);
  const completionPercentage =
    (userBadges.totalUnlocked / userBadges.badges.length) * 100;

  return (
    <Drawer
      anchor="bottom"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          maxHeight: "90vh",
          overflow: "hidden",
        },
      }}
    >
      {/* Header */}
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          backgroundColor: "background.paper",
          color: "text.primary",
          borderBottom: 1,
          borderColor: "divider",
        }}
      >
        <Toolbar>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            width="100%"
          >
            <Typography variant="h5" component="h2" fontWeight="bold">
              🏆 Rozetler
            </Typography>
            <IconButton onClick={onClose} size="small">
              <CloseIcon />
            </IconButton>
          </Box>
        </Toolbar>

        <Box px={2} pb={2}>
          <Typography variant="body2" color="text.secondary" mb={1}>
            {userBadges.totalUnlocked} / {userBadges.badges.length} rozet
            kazanıldı
          </Typography>
          <LinearProgress
            variant="determinate"
            value={completionPercentage}
            sx={{ height: 8, borderRadius: 4 }}
          />
        </Box>
      </AppBar>

      {/* Content */}
      <Box sx={{ p: 2, overflow: "auto", maxHeight: "calc(90vh - 120px)" }}>
        {/* Unlocked Badges */}
        {unlockedBadges.length > 0 && (
          <Box mb={4}>
            <Typography variant="h6" fontWeight="bold" mb={2} color="primary">
              ✨ Kazanılan Rozetler
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
                      label={getBadgeRarityText(badge.rarity)}
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
              🔒 Henüz Kazanılmayan Rozetler
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
                      label={getBadgeRarityText(badge.rarity)}
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
              Henüz rozet yok!
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Streak'lerinizi tamamlayarak rozetler kazanın
            </Typography>
          </Box>
        )}
      </Box>
    </Drawer>
  );
};

export default BadgeViewer;
