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

    // Category and emoji selection
    selectCategory: string;
    selectEmoji: string;
    category: string;
    emoji: string;
    popularEmojis: string;
    suggestedEmojis: string;

    // Sharing
    share: string;
    shareStreak: string;
    copyLink: string;
    linkCopied: string;
    shareDescription: string;
    sharedStreak: string;
    viewOnly: string;
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

    // Category and emoji selection
    selectCategory: "Select Category",
    selectEmoji: "Select Emoji",
    category: "Category",
    emoji: "Emoji",
    popularEmojis: "Popular Emojis",
    suggestedEmojis: "Suggested for this category",

    // Sharing
    share: "Share",
    shareStreak: "Share Streak",
    copyLink: "Copy Link",
    linkCopied: "Link copied to clipboard!",
    shareDescription: "Share your streak progress with others. They'll be able to view your streak in read-only mode.",
    sharedStreak: "Shared Streak",
    viewOnly: "View Only",
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

    // Category and emoji selection
    selectCategory: "Kategori Seç",
    selectEmoji: "Emoji Seç",
    category: "Kategori",
    emoji: "Emoji",
    popularEmojis: "Popüler Emojiler",
    suggestedEmojis: "Bu kategori için önerililer",

    // Sharing
    share: "Paylaş",
    shareStreak: "Alışkanlığı Paylaş",
    copyLink: "Linki Kopyala",
    linkCopied: "Link panoya kopyalandı!",
    shareDescription: "Alışkanlık ilerlemeni başkalarıyla paylaş. Sadece görüntüleme modunda alışkanlığını görebilecekler.",
    sharedStreak: "Paylaşılan Alışkanlık",
    viewOnly: "Sadece Görüntüleme",
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
