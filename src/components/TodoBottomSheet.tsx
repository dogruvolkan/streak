import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Typography,
  IconButton,
  Button,
  TextField,
  useTheme,
} from "@mui/material";
import { Sheet } from "react-modal-sheet";
import CloseIcon from "@mui/icons-material/Close";
import type { TodoItem } from "../types";
import { useTranslations, type Language } from "../utils/i18n";

interface TodoBottomSheetProps {
  open: boolean;
  onClose: () => void;
  todoList: TodoItem[];
  onAdd: (text: string) => void;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
  language: Language;
}

const TodoBottomSheet: React.FC<TodoBottomSheetProps> = ({
  open,
  onClose,
  todoList,
  onAdd,
  onToggle,
  onDelete,
  onEdit,
  language,
}) => {
  const theme = useTheme();
  const t = useTranslations(language);
  const [editingId, setEditingId] = React.useState<string | null>(null);
  const [editingText, setEditingText] = React.useState("");
  const [todoInput, setTodoInput] = React.useState("");
  const [filter, setFilter] = useState<"all" | "active" | "done">("all");
  const [isEditing, setIsEditing] = useState(false);

  // Her todo için ref tut
  const itemRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Edit moduna girildiğinde ilgili satırı merkeze kaydır
  useEffect(() => {
    if (editingId && itemRefs.current[editingId]) {
      itemRefs.current[editingId]?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [editingId]);

  // Filtrelenmiş todo'lar (arama ve sıralama yok)
  const filteredTodos = todoList.filter((t) => {
    if (filter === "active") return !t.done;
    if (filter === "done") return t.done;
    return true;
  });

  const completedCount = todoList.filter((t) => t.done).length;

  const listScrollable = filteredTodos.length > 4;

  return (
    <Sheet
      isOpen={open}
      onClose={onClose}
      snapPoints={[0.98, 0.7, 0.4]}
      initialSnap={0}
    >
      <Sheet.Container
        style={{ backgroundColor: theme.palette.background.paper }}
      >
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
              pb: 2,
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontWeight: 700, letterSpacing: 0.2 }}
            >
              {t.todoTitle}
            </Typography>
            <IconButton
              onClick={onClose}
              edge="end"
              sx={{ backgroundColor: "action.hover", width: 36, height: 36 }}
            >
              <CloseIcon sx={{ fontSize: 22 }} />
            </IconButton>
          </Box>
        </Sheet.Header>
        <Sheet.Content
          style={{
            backgroundColor: theme.palette.background.default,
            paddingBottom: isEditing ? 120 : undefined,
          }}
        >
          <Box sx={{ p: { xs: 2, sm: 3 } }}>
            {/* Todo Input */}
            <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
              <TextField
                fullWidth
                size="medium"
                placeholder={t.todoAddPlaceholder}
                value={todoInput}
                onChange={(e) => setTodoInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && todoInput.trim()) {
                    onAdd(todoInput);
                    setTodoInput("");
                  }
                }}
                variant="outlined"
                inputProps={{
                  "aria-label": t.todoAddPlaceholder,
                  style: { fontSize: 16 },
                }}
                sx={{
                  background: theme.palette.background.paper,
                  borderRadius: 2,
                }}
              />
              <Button
                variant="contained"
                onClick={() => {
                  if (!todoInput.trim()) return;
                  onAdd(todoInput);
                  setTodoInput("");
                }}
                disabled={!todoInput.trim()}
                aria-label={t.todoAddPlaceholder}
                sx={{
                  minWidth: 48,
                  fontSize: 22,
                  fontWeight: 700,
                  borderRadius: 2,
                }}
              >
                +
              </Button>
            </Box>
            {/* Filter Buttons */}
            <Box
              sx={{ display: "flex", gap: 1, mb: 2, justifyContent: "center" }}
            >
              <Button
                size="small"
                variant={filter === "all" ? "contained" : "outlined"}
                onClick={() => setFilter("all")}
                sx={{
                  borderRadius: 2,
                  fontWeight: filter === "all" ? 700 : 400,
                }}
              >
                {t.todoFilterAll}
              </Button>
              <Button
                size="small"
                variant={filter === "active" ? "contained" : "outlined"}
                onClick={() => setFilter("active")}
                sx={{
                  borderRadius: 2,
                  fontWeight: filter === "active" ? 700 : 400,
                }}
              >
                {t.todoFilterActive}
              </Button>
              <Button
                size="small"
                variant={filter === "done" ? "contained" : "outlined"}
                onClick={() => setFilter("done")}
                sx={{
                  borderRadius: 2,
                  fontWeight: filter === "done" ? 700 : 400,
                }}
              >
                {t.todoFilterDone}
              </Button>
            </Box>
            {/* Clear Completed */}
            {completedCount > 0 && (
              <Button
                size="small"
                color="error"
                variant="outlined"
                sx={{ mb: 2, width: "100%", borderRadius: 2, fontWeight: 600 }}
                onClick={() => {
                  todoList.filter((t) => t.done).forEach((t) => onDelete(t.id));
                }}
              >
                {t.todoClearCompleted.replace(
                  "{count}",
                  String(completedCount)
                )}
              </Button>
            )}
            {/* Todo List */}
            {filteredTodos.length === 0 ? (
              <Typography
                color="text.secondary"
                sx={{ mt: 2, textAlign: "center", fontSize: 16 }}
              >
                {filter === "done"
                  ? t.todoNoCompleted
                  : filter === "active"
                  ? t.todoAllDone
                  : t.todoNoTodos}
              </Typography>
            ) : (
              <Box
                sx={
                  listScrollable
                    ? {
                        maxHeight: 320,
                        overflowY: "auto",
                        pr: 1,
                        transition: "max-height 0.2s",
                      }
                    : {}
                }
              >
                {filteredTodos.map((todo) => (
                  <Box
                    key={todo.id}
                    ref={(el) => {
                      itemRefs.current[todo.id] = el as HTMLDivElement | null;
                    }}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mb: 1.5,
                      p: 1,
                      borderRadius: 2,
                      background: todo.done
                        ? theme.palette.action.selected
                        : theme.palette.background.paper,
                      boxShadow: todo.done ? 0 : 1,
                      border: todo.done
                        ? `1px solid ${theme.palette.action.selected}`
                        : `1px solid ${theme.palette.divider}`,
                      transition: "background 0.2s, box-shadow 0.2s",
                    }}
                  >
                    <Button
                      size="small"
                      variant={todo.done ? "contained" : "outlined"}
                      color={todo.done ? "success" : "primary"}
                      onClick={() => onToggle(todo.id)}
                      sx={{ minWidth: 32, px: 1, borderRadius: 2 }}
                      aria-label={
                        todo.done ? t.todoMarkDoneAria : t.todoMarkActiveAria
                      }
                    >
                      ✓
                    </Button>
                    {editingId === todo.id ? (
                      <>
                        <TextField
                          size="small"
                          value={editingText}
                          onChange={(e) => setEditingText(e.target.value)}
                          onFocus={() => setIsEditing(true)}
                          onBlur={() => setIsEditing(false)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              onEdit(todo.id, editingText);
                              setEditingId(null);
                              setEditingText("");
                              setIsEditing(false);
                            }
                            if (e.key === "Escape") {
                              setEditingId(null);
                              setEditingText("");
                              setIsEditing(false);
                            }
                          }}
                          autoFocus
                          sx={{
                            flex: 1,
                            mx: 1,
                            background: theme.palette.background.paper,
                            borderRadius: 2,
                          }}
                          inputProps={{
                            "aria-label": t.todoEditAria,
                            style: { fontSize: 15 },
                          }}
                          multiline
                          maxRows={3}
                        />
                        <Button
                          size="small"
                          color="success"
                          onClick={() => {
                            onEdit(todo.id, editingText);
                            setEditingId(null);
                            setEditingText("");
                            setIsEditing(false);
                          }}
                          sx={{ minWidth: 32, px: 1, borderRadius: 2 }}
                        >
                          ✓
                        </Button>
                        <Button
                          size="small"
                          color="inherit"
                          onClick={() => {
                            setEditingId(null);
                            setEditingText("");
                            setIsEditing(false);
                          }}
                          sx={{ minWidth: 32, px: 1, borderRadius: 2 }}
                        >
                          ✕
                        </Button>
                      </>
                    ) : (
                      <>
                        <Typography
                          sx={{
                            textDecoration: todo.done ? "line-through" : "none",
                            flex: 1,
                            color: todo.done
                              ? "text.secondary"
                              : "text.primary",
                            cursor: "pointer",
                            wordBreak: "break-word",
                            whiteSpace: "pre-line",
                            fontSize: 15,
                            mx: 1,
                          }}
                          variant="body2"
                          onClick={() => {
                            setEditingId(todo.id);
                            setEditingText(todo.text);
                          }}
                          aria-label={t.todoEditAria}
                        >
                          {todo.text}
                        </Typography>
                        <Button
                          size="small"
                          color="error"
                          onClick={() => onDelete(todo.id)}
                          sx={{ minWidth: 32, px: 1, borderRadius: 2 }}
                          aria-label={t.todoDeleteAria}
                        >
                          ✕
                        </Button>
                      </>
                    )}
                  </Box>
                ))}
              </Box>
            )}
          </Box>
        </Sheet.Content>
      </Sheet.Container>
    </Sheet>
  );
};

export default TodoBottomSheet;
