// Language support utility

export type Language = 'en' | 'tr';

export interface Translations {
    // App title and header
    appTitle: string;

    // Bottom sheet (Add streak form)
    addStreak: string;
    streakName: string;
    streakNamePlaceholder: string;
    repeatPattern: string;
    daily: string;
    weekly: string;
    monthly: string;
    selectDays: string;
    sunday: string;
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    create: string;
    cancel: string;

    // Streak card actions
    delete: string;
    reset: string;

    // Repeat type display
    everyDay: string;
    everyWeek: string;
    everyMonth: string;
    selectedDays: string;

    // Days short names
    sun: string;
    mon: string;
    tue: string;
    wed: string;
    thu: string;
    fri: string;
    sat: string;

    // Messages
    noStreaks: string;
    startFirstStreak: string;

    // Form validation
    nameRequired: string;
    selectAtLeastOneDay: string;

    // Additional translations
    back: string;
    next: string;

    // Settings
    settings: string;
    language: string;
    appearance: string;
    themeColor: string;
    lightMode: string;
    darkMode: string;
    done: string;
    clearData: string;
    clearAllData: string;
    clearDataConfirm: string;
    clearDataWarning: string;
    dataCleared: string;

    // Statistics
    statistics: string;
    overview: string;
    totalStreaks: string;
    activeStreaks: string;
    completedDays: string;
    todayCompleted: string;
    longestStreak: string;
    currentStreak: string;
    averagePerWeek: string;
    thisWeek: string;
    thisMonth: string;
    categoryBreakdown: string;
    noDataAvailable: string;
    days: string;

    // Category and emoji selection
    selectCategory: string;
    selectEmoji: string;
    category: string;
    emoji: string;
    popularEmojis: string;
    suggestedEmojis: string;

    // Quantity-based streaks
    streakType: string;
    simpleStreak: string;
    quantityBasedStreak: string;
    simpleStreakDesc: string;
    quantityBasedStreakDesc: string;
    dailyGoalSettings: string;
    targetAmount: string;
    unit: string;
    dailyGoal: string;
    dailyProgress: string;
    currentProgress: string;
    addQuantity: string;
    goalCompleted: string;

    // Edit streak
    editStreak: string;
    totalCount: string;
    save: string;
    quantityBased: string;
    enterStreakName: string;
    todayProgress: string;

    // Settings
    light: string;
    dark: string;
    dangerZone: string;
    confirmClearData: string;

    // Free Day
    freeDay: string;
    freeDaySettings: string;
    enableFreeDay: string;
    freeDayDescription: string;
    selectFreeDayOfWeek: string;
    todayIsFreeDay: string;
    freeDayMessage: string;
    celebrateAndRelax: string;

    // Weekly frequency options
    weeklyOnce: string;
    weeklyOnceDesc: string;
    specificDays: string;
    specificDaysDesc: string;
}

const englishTranslations: Translations = {
    // App title and header
    appTitle: "Streak Tracker",

    // Bottom sheet (Add streak form)
    addStreak: "Add New Streak",
    streakName: "Streak Name",
    streakNamePlaceholder: "Enter streak name...",
    repeatPattern: "Repeat Pattern",
    daily: "Daily",
    weekly: "Weekly",
    monthly: "Monthly",
    selectDays: "Select Days",
    sunday: "Sunday",
    monday: "Monday",
    tuesday: "Tuesday",
    wednesday: "Wednesday",
    thursday: "Thursday",
    friday: "Friday",
    saturday: "Saturday",
    create: "Create",
    cancel: "Cancel",

    // Streak card actions
    delete: "Delete",
    reset: "Reset",

    // Repeat type display
    everyDay: "Every day",
    everyWeek: "Every week",
    everyMonth: "Every month",
    selectedDays: "Selected days",

    // Days short names
    sun: "Sun",
    mon: "Mon",
    tue: "Tue",
    wed: "Wed",
    thu: "Thu",
    fri: "Fri",
    sat: "Sat",

    // Messages
    noStreaks: "No streaks yet",
    startFirstStreak: "Create your first streak to get started!",

    // Form validation
    nameRequired: "Streak name is required",
    selectAtLeastOneDay: "Please select at least one day",

    // Additional translations
    back: "Back",
    next: "Next",

    // Settings
    settings: "Settings",
    language: "Language",
    appearance: "Appearance",
    themeColor: "Theme Color",
    lightMode: "Light Mode",
    darkMode: "Dark Mode",
    done: "Done",
    clearData: "Clear Data",
    clearAllData: "Clear All Data",
    clearDataConfirm: "Are you sure you want to clear all data? This action cannot be undone.",
    clearDataWarning: "This will delete all your streaks and settings.",
    dataCleared: "All data has been cleared successfully!",

    // Statistics
    statistics: "Statistics",
    overview: "Overview",
    totalStreaks: "Total Streaks",
    activeStreaks: "Active Streaks",
    completedDays: "Completed Days",
    todayCompleted: "Completed Today",
    longestStreak: "Longest Streak",
    currentStreak: "Current Streak",
    averagePerWeek: "Average per Week",
    thisWeek: "This Week",
    thisMonth: "This Month",
    categoryBreakdown: "Category Breakdown",
    noDataAvailable: "No data available",
    days: "days",

    // Category and emoji selection
    selectCategory: "Select Category",
    selectEmoji: "Select Emoji",
    category: "Category",
    emoji: "Emoji",
    popularEmojis: "Popular Emojis",
    suggestedEmojis: "Suggested for this category",

    // Quantity-based streaks
    streakType: "Streak Type",
    simpleStreak: "Simple Streak",
    quantityBasedStreak: "Quantity-Based Streak",
    simpleStreakDesc: "Track whether you do it daily",
    quantityBasedStreakDesc: "Track daily target amounts (water, pages, etc.)",
    dailyGoalSettings: "Daily Goal Settings",
    targetAmount: "Target Amount",
    unit: "Unit",
    dailyGoal: "Daily Goal",
    dailyProgress: "Daily Progress",
    currentProgress: "Current Progress",
    addQuantity: "Add Quantity",
    goalCompleted: "Goal Completed",

    // Edit streak
    editStreak: "Edit Streak",
    totalCount: "Total Count",
    save: "Save",
    quantityBased: "Quantity-Based",
    enterStreakName: "Enter streak name...",
    todayProgress: "Today's Progress",

    // Settings
    light: "Light",
    dark: "Dark",
    dangerZone: "Danger Zone",
    confirmClearData: "Confirm Clear Data",

    // Free Day
    freeDay: "Free Day",
    freeDaySettings: "Free Day Settings",
    enableFreeDay: "Enable Free Day",
    freeDayDescription: "Choose a day to relax without breaking your streaks",
    selectFreeDayOfWeek: "Select Free Day",
    todayIsFreeDay: "Today is Free Day!",
    freeDayMessage: "Relax and Enjoy! 🎉",
    celebrateAndRelax: "No pressure today - celebrate and relax!",

    // Weekly frequency options
    weeklyOnce: "Once a Week",
    weeklyOnceDesc: "You can click on any day",
    specificDays: "Specific Days",
    specificDaysDesc: "You can only click on selected days",
};

const turkishTranslations: Translations = {
    // App title and header
    appTitle: "Alışkanlık Takibi",

    // Bottom sheet (Add streak form)
    addStreak: "Yeni Alışkanlık Ekle",
    streakName: "Alışkanlık Adı",
    streakNamePlaceholder: "Alışkanlık adını girin...",
    repeatPattern: "Tekrar Düzeni",
    daily: "Günlük",
    weekly: "Haftalık",
    monthly: "Aylık",
    selectDays: "Gün Seçin",
    sunday: "Pazar",
    monday: "Pazartesi",
    tuesday: "Salı",
    wednesday: "Çarşamba",
    thursday: "Perşembe",
    friday: "Cuma",
    saturday: "Cumartesi",
    create: "Oluştur",
    cancel: "İptal",

    // Streak card actions
    delete: "Sil",
    reset: "Sıfırla",

    // Repeat type display
    everyDay: "Her gün",
    everyWeek: "Her hafta",
    everyMonth: "Her ay",
    selectedDays: "Seçili günler",

    // Days short names
    sun: "Paz",
    mon: "Pzt",
    tue: "Sal",
    wed: "Çar",
    thu: "Per",
    fri: "Cum",
    sat: "Cmt",

    // Messages
    noStreaks: "Henüz alışkanlık yok",
    startFirstStreak: "Başlamak için ilk alışkanlığınızı oluşturun!",

    // Form validation
    nameRequired: "Alışkanlık adı gerekli",
    selectAtLeastOneDay: "Lütfen en az bir gün seçin",

    // Additional translations
    back: "Geri",
    next: "İleri",

    // Settings
    settings: "Ayarlar",
    language: "Dil",
    appearance: "Görünüm",
    themeColor: "Renk Teması",
    lightMode: "Açık Tema",
    darkMode: "Koyu Tema",
    done: "Tamam",
    clearData: "Verileri Temizle",
    clearAllData: "Tüm Verileri Temizle",
    clearDataConfirm: "Tüm verileri silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.",
    clearDataWarning: "Bu işlem tüm alışkanlıklarınızı ve ayarlarınızı silecektir.",
    dataCleared: "Tüm veriler başarıyla temizlendi!",

    // Statistics
    statistics: "İstatistikler",
    overview: "Genel Bakış",
    totalStreaks: "Toplam Alışkanlık",
    activeStreaks: "Aktif Alışkanlık",
    completedDays: "Tamamlanan Gün",
    todayCompleted: "Bugün Tamamlanan",
    longestStreak: "En Uzun Seri",
    currentStreak: "Mevcut Seri",
    averagePerWeek: "Haftalık Ortalama",
    thisWeek: "Bu Hafta",
    thisMonth: "Bu Ay",
    categoryBreakdown: "Kategori Dağılımı",
    noDataAvailable: "Veri bulunamadı",
    days: "gün",

    // Category and emoji selection
    selectCategory: "Kategori Seç",
    selectEmoji: "Emoji Seç",
    category: "Kategori",
    emoji: "Emoji",
    popularEmojis: "Popüler Emojiler",
    suggestedEmojis: "Bu kategori için önerililer",

    // Quantity-based streaks
    streakType: "Streak Türü",
    simpleStreak: "Basit Streak",
    quantityBasedStreak: "Miktar Bazlı Streak",
    simpleStreakDesc: "Günlük yapıp yapmadığınızı takip edin",
    quantityBasedStreakDesc: "Günlük hedef miktarı takip edin (su, sayfa, vb.)",
    dailyGoalSettings: "Günlük Hedef Ayarları",
    targetAmount: "Hedef Miktar",
    unit: "Birim",
    dailyGoal: "Günlük Hedef",
    dailyProgress: "Günlük İlerleme",
    currentProgress: "Mevcut İlerleme",
    addQuantity: "Miktar Ekle",
    goalCompleted: "Hedef Tamamlandı",

    // Edit streak
    editStreak: "Alışkanlığı Düzenle",
    totalCount: "Toplam Sayaç",
    save: "Kaydet",
    quantityBased: "Miktar Bazlı",
    enterStreakName: "Alışkanlık adını girin...",
    todayProgress: "Bugünün İlerlemesi",

    // Settings
    light: "Açık",
    dark: "Koyu",
    dangerZone: "Tehlike Bölgesi",
    confirmClearData: "Veri Silmeyi Onayla",

    // Free Day
    freeDay: "Serbest Gün",
    freeDaySettings: "Serbest Gün Ayarları",
    enableFreeDay: "Serbest Günü Etkinleştir",
    freeDayDescription: "Alışkanlıklarını bozmadan dinlenebileceğin bir gün seç",
    selectFreeDayOfWeek: "Serbest Günü Seç",
    todayIsFreeDay: "Bugün Serbest Gün!",
    freeDayMessage: "Coş ve Eğlen! 🎉",
    celebrateAndRelax: "Bugün baskı yok - kutla ve dinlen!",

    // Weekly frequency options
    weeklyOnce: "Haftada Bir Kere",
    weeklyOnceDesc: "Herhangi bir gün tıklayabilirsin",
    specificDays: "Belirli Günlerde",
    specificDaysDesc: "Sadece seçilen günlerde tıklayabilirsin",
};

const translations: Record<Language, Translations> = {
    en: englishTranslations,
    tr: turkishTranslations,
};

// Get current language from localStorage or default to English
export const getCurrentLanguage = (): Language => {
    try {
        const saved = localStorage.getItem('streakApp_language');
        if (saved && (saved === 'en' || saved === 'tr')) {
            return saved as Language;
        }
    } catch (error) {
        console.warn('Failed to load language preference:', error);
    }
    return 'en'; // Default to English
};

// Save language preference to localStorage
export const setLanguage = (language: Language): void => {
    try {
        localStorage.setItem('streakApp_language', language);
    } catch (error) {
        console.warn('Failed to save language preference:', error);
    }
};

// Get translations for current language
export const getTranslations = (language: Language): Translations => {
    return translations[language] || translations.en;
};

// Hook for using translations
export const useTranslations = (language: Language) => {
    return getTranslations(language);
};
