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

    // Badges
    badges: string;
    badgesEarned: string;
    earnedBadges: string;
    lockedBadges: string;
    noBadgesYet: string;
    completeBadgesMessage: string;

    // Badge rarities
    common: string;
    rare: string;
    epic: string;
    legendary: string;

    // Badge names
    badgeFirstStep: string;
    badgeTripleThreat: string;
    badgeWeeklyWarrior: string;
    badgeStreakMaster: string;
    badgeCenturyClub: string;
    badgeMultiTasker: string;
    badgePersistence: string;
    badgeDedication: string;
    badgePerfectionist: string;
    badgeFireStarter: string;
    badgeConsistencyMaster: string;
    badgeUnstoppable: string;
    badgeLegend: string;
    badgeExplorer: string;
    badgeSpeedDemon: string;
    badgeMarathonRunner: string;
    badgeHabitArchitect: string;

    // Badge descriptions
    badgeFirstStepDesc: string;
    badgeTripleThreatDesc: string;
    badgeWeeklyWarriorDesc: string;
    badgeStreakMasterDesc: string;
    badgeCenturyClubDesc: string;
    badgeMultiTaskerDesc: string;
    badgePersistenceDesc: string;
    badgeDedicationDesc: string;
    badgePerfectionistDesc: string;
    badgeFireStarterDesc: string;
    badgeConsistencyMasterDesc: string;
    badgeUnstoppableDesc: string;
    badgeLegendDesc: string;
    badgeExplorerDesc: string;
    badgeSpeedDemonDesc: string;
    badgeMarathonRunnerDesc: string;
    badgeHabitArchitectDesc: string;
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
    clearDataWarning: "This will delete all your streaks, badges, and settings.",
    dataCleared: "All data has been cleared successfully!",

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

    // Badges
    badges: "Badges",
    badgesEarned: "badges earned",
    earnedBadges: "✨ Earned Badges",
    lockedBadges: "🔒 Locked Badges",
    noBadgesYet: "No badges yet!",
    completeBadgesMessage: "Complete your streaks to earn badges",

    // Badge rarities
    common: "Common",
    rare: "Rare",
    epic: "Epic",
    legendary: "Legendary",

    // Badge names
    badgeFirstStep: "First Step",
    badgeTripleThreat: "Triple Threat",
    badgeWeeklyWarrior: "Weekly Warrior",
    badgeStreakMaster: "Streak Master",
    badgeCenturyClub: "Century Club",
    badgeMultiTasker: "Multi Tasker",
    badgePersistence: "Persistent",
    badgeDedication: "Dedicated",
    badgePerfectionist: "Perfectionist",
    badgeFireStarter: "Fire Starter",
    badgeConsistencyMaster: "Consistency Master",
    badgeUnstoppable: "Unstoppable",
    badgeLegend: "Legend",
    badgeExplorer: "Explorer",
    badgeSpeedDemon: "Speed Demon",
    badgeMarathonRunner: "Marathon Runner",
    badgeHabitArchitect: "Habit Architect",

    // Badge descriptions
    badgeFirstStepDesc: "Created your first streak!",
    badgeTripleThreatDesc: "Completed 3 consecutive days!",
    badgeWeeklyWarriorDesc: "Completed 7 consecutive days!",
    badgeStreakMasterDesc: "Completed 30 consecutive days!",
    badgeCenturyClubDesc: "Completed 100 consecutive days!",
    badgeMultiTaskerDesc: "Have 5 active streaks simultaneously!",
    badgePersistenceDesc: "Completed 10 different streaks!",
    badgeDedicationDesc: "Completed a total of 365 days!",
    badgePerfectionistDesc: "15 days without missing any!",
    badgeFireStarterDesc: "Completed 3 different streaks on the same day!",
    badgeConsistencyMasterDesc: "21 days of consistent streaks!",
    badgeUnstoppableDesc: "Completed 50 consecutive days!",
    badgeLegendDesc: "Completed 200 consecutive days!",
    badgeExplorerDesc: "Created streaks in 7 different categories!",
    badgeSpeedDemonDesc: "Completed 5 streaks in one day!",
    badgeMarathonRunnerDesc: "Completed a total of 1000 days!",
    badgeHabitArchitectDesc: "Created 10 different streaks!",
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
    clearDataWarning: "Bu işlem tüm alışkanlıklarınızı, rozetlerinizi ve ayarlarınızı silecektir.",
    dataCleared: "Tüm veriler başarıyla temizlendi!",

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

    // Badges
    badges: "Rozetler",
    badgesEarned: "rozet kazanıldı",
    earnedBadges: "✨ Kazanılan Rozetler",
    lockedBadges: "🔒 Henüz Kazanılmayan Rozetler",
    noBadgesYet: "Henüz rozet yok!",
    completeBadgesMessage: "Streak'lerinizi tamamlayarak rozetler kazanın",

    // Badge rarities
    common: "Yaygın",
    rare: "Nadir",
    epic: "Epik",
    legendary: "Efsanevi",

    // Badge names
    badgeFirstStep: "İlk Adım",
    badgeTripleThreat: "Üçlü Güç",
    badgeWeeklyWarrior: "Haftalık Savaşçı",
    badgeStreakMaster: "Streak Ustası",
    badgeCenturyClub: "Yüzler Kulübü",
    badgeMultiTasker: "Çok Görevli",
    badgePersistence: "Azimli",
    badgeDedication: "Adanmış",
    badgePerfectionist: "Mükemmeliyetçi",
    badgeFireStarter: "Ateş Başlatıcı",
    badgeConsistencyMaster: "Tutarlılık Ustası",
    badgeUnstoppable: "Durdurulamaz",
    badgeLegend: "Efsane",
    badgeExplorer: "Kaşif",
    badgeSpeedDemon: "Hız Şeytanı",
    badgeMarathonRunner: "Maraton Koşucusu",
    badgeHabitArchitect: "Alışkanlık Mimarı",

    // Badge descriptions
    badgeFirstStepDesc: "İlk streak'ini oluşturdun!",
    badgeTripleThreatDesc: "3 gün üst üste streak tamamladın!",
    badgeWeeklyWarriorDesc: "7 gün üst üste streak tamamladın!",
    badgeStreakMasterDesc: "30 gün üst üste streak tamamladın!",
    badgeCenturyClubDesc: "100 gün üst üste streak tamamladın!",
    badgeMultiTaskerDesc: "Aynı anda 5 aktif streak'in var!",
    badgePersistenceDesc: "10 farklı streak tamamladın!",
    badgeDedicationDesc: "Toplam 365 gün streak tamamladın!",
    badgePerfectionistDesc: "15 gün boyunca hiç kaçırmadan streak yaptın!",
    badgeFireStarterDesc: "Aynı gün 3 farklı streak tamamladın!",
    badgeConsistencyMasterDesc: "21 gün boyunca düzenli streak yaptın!",
    badgeUnstoppableDesc: "50 gün üst üste streak tamamladın!",
    badgeLegendDesc: "200 gün üst üste streak tamamladın!",
    badgeExplorerDesc: "7 farklı kategoride streak oluşturdun!",
    badgeSpeedDemonDesc: "Bir günde 5 streak tamamladın!",
    badgeMarathonRunnerDesc: "Toplam 1000 gün streak tamamladın!",
    badgeHabitArchitectDesc: "10 farklı streak oluşturdun!",
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
