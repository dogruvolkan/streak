import React, { useState, useMemo } from "react";
import {
  Box,
  Typography,
  IconButton,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  ListItemAvatar,
  Divider,
  useTheme,
  ToggleButton,
  ToggleButtonGroup,
  Paper,
  Avatar,
  Chip,
  InputAdornment,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import ArrowUpward from "@mui/icons-material/ArrowUpward";
import ArrowDownward from "@mui/icons-material/ArrowDownward";
import { useTranslations } from "../utils/i18n";
import { Sheet } from "react-modal-sheet";
import MoneyChart from "./MoneyChart";

export interface MoneyEntry {
  id: string;
  type: "income" | "expense";
  amount: number;
  description: string;
  date: string;
  category?: string;
}

interface MoneyTrackerBottomSheetProps {
  open: boolean;
  onClose: () => void;
  moneyList: MoneyEntry[];
  onAdd: (entry: Omit<MoneyEntry, "id">) => void;
  onDelete: (id: string) => void;
  language: string;
  currency?: string;
  onCurrencyChange?: (currency: string) => void;
}

const MoneyTrackerBottomSheet: React.FC<MoneyTrackerBottomSheetProps> = ({
  open,
  onClose,
  moneyList,
  onAdd,
  onDelete,
  language,
  currency = "₺",
}) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const t = useTranslations(language as any);
  const theme = useTheme();

  const [type, setType] = useState<"income" | "expense">("income");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<string>("");

  const handleAdd = () => {
    if (!amount || isNaN(Number(amount))) return;
    // Seçili ay için bir tarih oluştur (gün: 1, saat: şu anki saat)
    const [year, month] = selectedMonth.split("-").map(Number);
    const now = new Date();
    const entryDate = new Date(
      year,
      month - 1,
      1,
      now.getHours(),
      now.getMinutes(),
      now.getSeconds(),
      now.getMilliseconds()
    );
    onAdd({
      type,
      amount: Number(amount),
      description,
      date: entryDate.toISOString(),
      category,
    });
    setAmount("");
    setDescription("");
    setCategory("");
  };

  // Ay filtresi için state ve yardımcı fonksiyonlar
  const [selectedMonth, setSelectedMonth] = useState(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(
      2,
      "0"
    )}`;
  });

  // Son 24 ayı oluştur
  const getLast24Months = () => {
    const months = [];
    const now = new Date();
    for (let i = 0; i < 24; i++) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      months.push({
        value: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
          2,
          "0"
        )}`,
        label: d.toLocaleString(language, { month: "short", year: "2-digit" }),
      });
    }
    return months.reverse();
  };
  const months = getLast24Months();

  // Seçili aya göre filtrele
  const filteredMoneyList = moneyList.filter((entry) => {
    const entryDate = new Date(entry.date);
    const entryMonth = `${entryDate.getFullYear()}-${String(
      entryDate.getMonth() + 1
    ).padStart(2, "0")}`;
    return entryMonth === selectedMonth;
  });

  // Önceki ayın bakiyesini hesapla
  const calculateCarryOverBalance = (monthStr: string) => {
    const monthsArr = months.map((m) => m.value);
    const idx = monthsArr.indexOf(monthStr);
    if (idx <= 0) return 0;
    let balance = 0;
    for (let i = 0; i < idx; i++) {
      const m = monthsArr[i];
      const monthEntries = moneyList.filter((entry) => {
        const entryDate = new Date(entry.date);
        const entryMonth = `${entryDate.getFullYear()}-${String(
          entryDate.getMonth() + 1
        ).padStart(2, "0")}`;
        return entryMonth === m;
      });
      const income = monthEntries
        .filter((e) => e.type === "income")
        .reduce((sum, e) => sum + e.amount, 0);
      const expense = monthEntries
        .filter((e) => e.type === "expense")
        .reduce((sum, e) => sum + e.amount, 0);
      balance += income - expense;
    }
    return balance;
  };

  const carryOverBalance = calculateCarryOverBalance(selectedMonth);
  const totalIncome = filteredMoneyList
    .filter((e) => e.type === "income")
    .reduce((sum, e) => sum + e.amount, 0);
  const totalExpense = filteredMoneyList
    .filter((e) => e.type === "expense")
    .reduce((sum, e) => sum + e.amount, 0);
  const balance = carryOverBalance + totalIncome - totalExpense;

  // Kategori dizilerini dil değişiminde güncelle
  const incomeCategories = useMemo(
    () => [
      { value: "salary", label: t.categorySalary || "Maaş" },
      { value: "freelance", label: t.categoryFreelance || "Serbest Çalışma" },
      { value: "bonus", label: t.categoryBonus || "Prim / Bonus" },
      { value: "interest", label: t.categoryInterest || "Faiz Geliri" },
      { value: "investment", label: t.categoryInvestment || "Yatırım Geliri" },
      { value: "rental", label: t.categoryRental || "Kira Geliri" },
      { value: "gift", label: t.categoryGift || "Hediye" },
      { value: "lottery", label: t.categoryLottery || "İkramiye / Piyango" },
      { value: "sales", label: t.categorySales || "Satış Geliri" },
      { value: "other", label: t.categoryOther || "Diğer" },
    ],
    [t]
  );

  const expenseCategories = useMemo(
    () => [
      { value: "rent", label: t.categoryRent || "Kira" },
      { value: "bills", label: t.categoryBills || "Faturalar" },
      {
        value: "groceries",
        label: t.categoryGroceries || "Market / Alışveriş",
      },
      { value: "transport", label: t.categoryTransport || "Ulaşım" },
      { value: "food", label: t.categoryFood || "Yeme-İçme" },
      {
        value: "subscriptions",
        label: t.categorySubscriptions || "Abonelikler",
      },
      { value: "health", label: t.categoryHealth || "Sağlık" },
      { value: "education", label: t.categoryEducation || "Eğitim" },
      {
        value: "creditcard",
        label: t.categoryCreditCard || "Kredi Kartı Ödemesi",
      },
      {
        value: "entertainment",
        label: t.categoryEntertainment || "Eğlence / Sosyal Yaşam",
      },
      { value: "clothing", label: t.categoryClothing || "Giyim" },
      { value: "travel", label: t.categoryTravel || "Tatil / Seyahat" },
      { value: "donation", label: t.categoryDonation || "Hediye / Bağış" },
      { value: "home", label: t.categoryHome || "Ev Eşyası / Mobilya" },
      { value: "other", label: t.categoryOther || "Diğer" },
    ],
    [t]
  );

  const categoryOptions =
    type === "income" ? incomeCategories : expenseCategories;

  const handleCategoryChange = (
    _event: React.MouseEvent<HTMLElement>,
    newCategory: string
  ) => {
    if (newCategory !== null) setCategory(newCategory);
  };

  return (
    <Sheet isOpen={open} onClose={onClose} snapPoints={[0.9]} initialSnap={0}>
      <Sheet.Container
        style={{
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
        }}
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
              pb: 1,
              gap: 2,
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontWeight: 600, color: "text.primary" }}
            >
              {t.moneyTrackerTitle}
            </Typography>
            <IconButton
              onClick={onClose}
              edge="end"
              sx={{
                backgroundColor: "action.hover",
                width: 32,
                height: 32,
                ml: 1,
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
            sx={{ px: 3, pb: 2, pt: 2, maxHeight: "70vh", overflowY: "auto" }}
          >
            {/* Ay filtresi toggle buttonları */}
            <Box sx={{ overflowX: "auto", mb: 2 }}>
              <ToggleButtonGroup
                value={selectedMonth}
                exclusive
                onChange={(_e, val) => val && setSelectedMonth(val)}
                size="small"
                sx={{ flexWrap: "nowrap", gap: 1 }}
              >
                {months.map((m) => (
                  <ToggleButton
                    key={m.value}
                    value={m.value}
                    sx={{ minWidth: 70 }}
                  >
                    {m.label}
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
            </Box>

            {/* Chart */}
            {filteredMoneyList.length > 0 && (
              <MoneyChart
                moneyList={filteredMoneyList}
                t={t}
                currency={currency}
              />
            )}
            {/* Quick add buttons */}
            <Box display="flex" gap={1} mb={2} flexWrap="wrap">
              {[50, 100, 200, 500, 1000, 5000].map((val) => (
                <Button
                  key={val}
                  variant="outlined"
                  size="small"
                  color={type === "income" ? "success" : "error"}
                  onClick={() =>
                    setAmount((prev) =>
                      prev ? String(Number(prev) + val) : String(val)
                    )
                  }
                  sx={{ minWidth: 0, px: 1.5 }}
                >
                  +{val}
                </Button>
              ))}
            </Box>

            {/* Type selection */}
            <Box display="flex" gap={2} mb={2}>
              <Button
                variant={type === "income" ? "contained" : "outlined"}
                color="success"
                onClick={() => setType("income")}
                sx={{ flex: 1 }}
              >
                {t.income}
              </Button>
              <Button
                variant={type === "expense" ? "contained" : "outlined"}
                color="error"
                onClick={() => setType("expense")}
                sx={{ flex: 1 }}
              >
                {t.expense}
              </Button>
            </Box>

            {/* Category selection */}
            <Box sx={{ overflowX: "auto", py: 1, mb: 2 }}>
              <ToggleButtonGroup
                value={category}
                exclusive
                onChange={handleCategoryChange}
                sx={{ flexWrap: "nowrap", gap: 1 }}
                size="small"
              >
                {categoryOptions.map((opt) => (
                  <ToggleButton
                    key={opt.value}
                    value={opt.value}
                    sx={{ whiteSpace: "nowrap" }}
                  >
                    {opt.label}
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
            </Box>

            {/* Amount & Description */}
            <Box display="flex" gap={1} alignItems="center" mb={3}>
              <TextField
                label={t.amount}
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                fullWidth
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">{currency}</InputAdornment>
                  ),
                }}
              />
              <TextField
                label={t.description}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                fullWidth
                size="small"
              />
              <IconButton
                color="primary"
                onClick={handleAdd}
                disabled={!amount || isNaN(Number(amount))}
                sx={{
                  backgroundColor: "primary.main",
                  color: "primary.contrastText",
                  "&:hover": { backgroundColor: "primary.dark" },
                }}
              >
                <AddIcon />
              </IconButton>
            </Box>

            {/* Summary Cards */}
            <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
              <Paper
                sx={{ p: 2, flex: 1, bgcolor: "success.light" }}
                elevation={0}
              >
                <Typography variant="subtitle2" color="text.secondary">
                  {t.totalIncome}
                </Typography>
                <Typography variant="h6" color="success.dark">
                  {totalIncome} {currency}
                </Typography>
              </Paper>

              <Paper
                sx={{ p: 2, flex: 1, bgcolor: "error.light" }}
                elevation={0}
              >
                <Typography variant="subtitle2" color="text.secondary">
                  {t.totalExpense}
                </Typography>
                <Typography variant="h6" color="error.dark">
                  {totalExpense} {currency}
                </Typography>
              </Paper>

              <Paper
                sx={{ p: 2, flex: 1, bgcolor: "indigo.200" }}
                elevation={0}
              >
                <Typography variant="subtitle2" color="text.secondary">
                  {t.balance}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {"carryOverBalance" in t &&
                  typeof t["carryOverBalance"] === "string"
                    ? (t as unknown as Record<string, string>).carryOverBalance
                    : "Devreden"}
                  : {carryOverBalance} {currency}
                </Typography>
                <Typography
                  variant="h6"
                  color={balance >= 0 ? "success.dark" : "error.dark"}
                >
                  {balance} {currency}
                </Typography>
              </Paper>
            </Box>

            <Divider sx={{ mb: 2 }} />

            {/* Entries List */}
            <List sx={{ mb: 2 }}>
              {filteredMoneyList.length === 0 ? (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    py: 4,
                    textAlign: "center",
                  }}
                >
                  <AccountBalanceWalletIcon
                    sx={{ fontSize: 48, color: "text.disabled", mb: 2 }}
                  />
                  <Typography variant="h6" color="text.secondary">
                    {t.noMoneyEntries}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 1 }}
                  >
                    Start by adding your first{" "}
                    {type === "income" ? "income" : "expense"} entry above
                  </Typography>
                </Box>
              ) : (
                filteredMoneyList.map((entry) => (
                  <Paper
                    key={entry.id}
                    sx={{ mb: 1, overflow: "hidden" }}
                    elevation={0}
                  >
                    <ListItem
                      sx={{
                        bgcolor:
                          entry.type === "income" ? "success.50" : "error.50",
                        borderLeft: `4px solid ${
                          entry.type === "income"
                            ? theme.palette.success.main
                            : theme.palette.error.main
                        }`,
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar
                          sx={{
                            bgcolor:
                              entry.type === "income"
                                ? "success.light"
                                : "error.light",
                            color:
                              entry.type === "income"
                                ? "success.dark"
                                : "error.dark",
                          }}
                        >
                          {entry.type === "income" ? (
                            <ArrowUpward />
                          ) : (
                            <ArrowDownward />
                          )}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Typography variant="subtitle1" fontWeight={600}>
                              {entry.amount} {currency}
                            </Typography>
                            {entry.category && (
                              <Chip
                                label={
                                  (entry.type === "income"
                                    ? incomeCategories
                                    : expenseCategories
                                  ).find((opt) => opt.value === entry.category)
                                    ?.label || entry.category
                                }
                                size="small"
                                sx={{ ml: 1 }}
                              />
                            )}
                          </Box>
                        }
                        secondary={
                          <>
                            <Typography variant="body2" color="text.secondary">
                              {entry.description}
                            </Typography>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              {new Date(entry.date).toLocaleString()}
                            </Typography>
                          </>
                        }
                      />
                      <ListItemSecondaryAction>
                        <IconButton
                          edge="end"
                          onClick={() => onDelete(entry.id)}
                        >
                          <DeleteIcon color="error" />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  </Paper>
                ))
              )}
            </List>
          </Box>
        </Sheet.Content>
      </Sheet.Container>
    </Sheet>
  );
};

export default MoneyTrackerBottomSheet;
