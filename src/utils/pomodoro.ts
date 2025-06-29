import type { PomodoroHistoryEntry } from '../types';

const STORAGE_KEY = 'streak_pomodoro_history';
const TOTAL_WORK_MINUTES_KEY = 'streak_pomodoro_total_work_minutes';

export function savePomodoroEntry(entry: PomodoroHistoryEntry) {
    const all = getPomodoroHistory();
    all.push(entry);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
    // Eğer çalışma oturumuysa toplam dakikayı güncelle
    if (entry.type === 'work') {
        const start = new Date(entry.start).getTime();
        const end = new Date(entry.end).getTime();
        const diff = Math.max(0, end - start);
        const minutes = Math.round(diff / 60000);
        const prev = getTotalWorkMinutes();
        localStorage.setItem(TOTAL_WORK_MINUTES_KEY, String(prev + minutes));
    }
}

export function getTotalWorkMinutes(): number {
    const raw = localStorage.getItem(TOTAL_WORK_MINUTES_KEY);
    return raw ? parseInt(raw, 10) : 0;
}

export function getPomodoroHistory(date?: string): PomodoroHistoryEntry[] {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const all: PomodoroHistoryEntry[] = JSON.parse(raw);
    if (date) return all.filter(e => e.date === date);
    return all;
}

// Gün bazlı gruplama: { [date: string]: { entries: PomodoroHistoryEntry[], totalMinutes: number, totalBreakMinutes: number } }
export function getPomodoroHistoryByDay(): Record<string, { entries: PomodoroHistoryEntry[]; totalMinutes: number; totalBreakMinutes: number }> {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const all: PomodoroHistoryEntry[] = JSON.parse(raw);
    const grouped: Record<string, { entries: PomodoroHistoryEntry[]; totalMinutes: number; totalBreakMinutes: number }> = {};
    for (const entry of all) {
        if (!grouped[entry.date]) {
            grouped[entry.date] = { entries: [], totalMinutes: 0, totalBreakMinutes: 0 };
        }
        grouped[entry.date].entries.push(entry);
        const start = new Date(entry.start).getTime();
        const end = new Date(entry.end).getTime();
        const diff = Math.max(0, end - start);
        const minutes = Math.round(diff / 60000);
        if (entry.type === 'work') {
            grouped[entry.date].totalMinutes += minutes;
        } else if (entry.type === 'short' || entry.type === 'long') {
            grouped[entry.date].totalBreakMinutes += minutes;
        }
    }
    return grouped;
}

// Tüm günlerin toplam çalışma ve mola süresi (history bazlı)
export function getTotalWorkAndBreakMinutesFromHistory(): { work: number; break: number } {
    const grouped = getPomodoroHistoryByDay();
    let work = 0, brk = 0;
    Object.values(grouped).forEach(g => {
        work += g.totalMinutes;
        brk += g.totalBreakMinutes;
    });
    return { work, break: brk };
}
