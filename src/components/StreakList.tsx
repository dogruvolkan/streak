import React from "react";
import { Typography, Box } from "@mui/material";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import type { DragEndEvent } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import StreakCard from "./StreakCard";
import type { Streak } from "../types";

interface StreakListProps {
  streaks: Streak[];
  onIncrementStreak: (streakId: string) => void;
  onDeleteStreak: (streakId: string) => void;
  onResetStreak: (streakId: string) => void;
  onReorderStreaks: (streaks: Streak[]) => void; // Yeni prop
}

const StreakList: React.FC<StreakListProps> = ({
  streaks,
  onIncrementStreak,
  onDeleteStreak,
  onResetStreak,
  onReorderStreaks,
}) => {
  // Drag sensors
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // 8px'den fazla hareket etmek gerekir
        tolerance: 5, // Tolerance eklendi
        delay: 100, // Kısa delay ile scroll/swipe çakışmasını önle
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Drag end handler
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = streaks.findIndex((streak) => streak.id === active.id);
      const newIndex = streaks.findIndex((streak) => streak.id === over.id);

      const reorderedStreaks = arrayMove(streaks, oldIndex, newIndex);
      onReorderStreaks(reorderedStreaks);
    }
  };
  if (streaks.length === 0) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "calc(100vh - 200px)",
          px: 3,
          textAlign: "center",
        }}
      >
        <Box
          sx={{
            width: 80,
            height: 80,
            borderRadius: "50%",
            backgroundColor: "primary.main",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mb: 3,
            opacity: 0.1,
          }}
        >
          <Typography variant="h2" sx={{ color: "white" }}>
            📊
          </Typography>
        </Box>
        <Typography
          variant="h5"
          color="text.primary"
          sx={{
            fontWeight: 600,
            mb: 1,
          }}
        >
          Henüz hiç streak'iniz yok
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{
            maxWidth: 280,
            lineHeight: 1.6,
          }}
        >
          Yeni bir alışkanlık takibi başlatmak için sağ alttaki + butonuna
          tıklayın
        </Typography>
      </Box>
    );
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      modifiers={[restrictToVerticalAxis]}
    >
      <Box
        sx={{
          width: "100%",
          height: "100%",
          overflowY: "auto",
          overflowX: "hidden",
          px: 2,
          py: 1,
          paddingBottom: 10, // FAB için alan bırak
          WebkitOverflowScrolling: "touch", // iOS için smooth scroll

          // Mobil scroll optimizasyonu
          scrollBehavior: "smooth",
          touchAction: "pan-y", // Sadece Y ekseninde scroll

          // Scrollbar styling - genişletilmiş
          "&::-webkit-scrollbar": {
            width: "2px", // Daha geniş scrollbar
          },
          "&::-webkit-scrollbar-track": {
            background: "rgba(0, 0, 0, 0.05)",
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "rgba(0, 0, 0, 0.3)",
            borderRadius: "4px",
            "&:hover": {
              background: "rgba(0, 0, 0, 0.5)",
            },
            "&:active": {
              background: "rgba(0, 0, 0, 0.6)",
            },
          },

          // Mobil için ek optimizasyon
          "@media (max-width: 768px)": {
            "&::-webkit-scrollbar": {
              width: "2px", // Mobilde daha da geniş
            },
            // Momentum scrolling
            overscrollBehavior: "contain",
          },
        }}
      >
        <SortableContext items={streaks} strategy={verticalListSortingStrategy}>
          {streaks.map((streak) => (
            <StreakCard
              key={streak.id}
              streak={streak}
              onIncrement={onIncrementStreak}
              onDelete={onDeleteStreak}
              onReset={onResetStreak}
            />
          ))}
        </SortableContext>
      </Box>
    </DndContext>
  );
};

export default StreakList;
