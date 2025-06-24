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
import type { Language } from "../utils/i18n";
import { useTranslations } from "../utils/i18n";

interface StreakListProps {
  streaks: Streak[];
  onIncrement: (streakId: string, quantity?: number) => void;
  onDelete: (streakId: string) => void;
  onReset: (streakId: string) => void;
  onEdit: (streakId: string) => void;
  onReorder: (streaks: Streak[]) => void;
  language: Language;
}

const StreakList: React.FC<StreakListProps> = ({
  streaks,
  onIncrement,
  onDelete,
  onReset,
  onEdit,
  onReorder,
  language,
}) => {
  const t = useTranslations(language);
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
      onReorder(reorderedStreaks);
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
          {t.noStreaks}
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{
            maxWidth: 280,
            lineHeight: 1.6,
          }}
        >
          {t.startFirstStreak}
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
          display: "flex",
          flexDirection: "column",
          minHeight: 0, // Important for flex shrinking
        }}
      >
        <Box
          sx={{
            flex: 1,
            overflowY: "auto",
            overflowX: "hidden",
            px: 2,
            py: 1,
            paddingBottom: 10, // FAB için alan bırak
            WebkitOverflowScrolling: "touch", // iOS için smooth scroll
            minHeight: 0, // Important for flex shrinking

            // Scrollbar styling
            "&::-webkit-scrollbar": {
              width: "4px",
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
            },
          }}
        >
          <SortableContext
            items={streaks}
            strategy={verticalListSortingStrategy}
          >
            {streaks.map((streak) => (
              <StreakCard
                key={streak.id}
                streak={streak}
                onIncrement={onIncrement}
                onDelete={onDelete}
                onReset={onReset}
                onEdit={onEdit}
                language={language}
              />
            ))}
          </SortableContext>
        </Box>
      </Box>
    </DndContext>
  );
};

export default StreakList;
