import type { MoneyEntry } from "../components/MoneyTrackerBottomSheet";

const MONEY_KEY = "streakApp_money";

export function loadMoneyEntries(): MoneyEntry[] {
    try {
        const data = localStorage.getItem(MONEY_KEY);
        if (!data) return [];
        return JSON.parse(data);
    } catch {
        return [];
    }
}

export function saveMoneyEntries(entries: MoneyEntry[]) {
    try {
        localStorage.setItem(MONEY_KEY, JSON.stringify(entries));
    } catch {
        // ignore
    }
}
