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
    today: string;
    longestStreak: string;
    currentStreak: string;
    averagePerWeek: string;
    thisWeek: string;
    thisMonth: string;
    categoryBreakdown: string;
    noDataAvailable: string;
    days: string;

    // Week navigation
    lastWeek: string;
    nextWeek: string;
    weeksAgo: string;
    weeksAhead: string;

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
    help: string;
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

    moodTracker: string;
    howAreYouFeeling: string;
    todaysMood: string;
    selectMood: string;
    moodNote: string;
    moodNoteOptional: string;
    moodVeryBad: string;
    moodBad: string;
    moodNeutral: string;
    moodGood: string;
    moodVeryGood: string;
    moodSaved: string;
    moodStats: string;
    averageMood: string;
    trackingStreak: string;
    moodDistribution: string;
    notableDays: string;
    bestDay: string;
    toughestDay: string;
    noMoodData: string;
    moodEntrySummary: string;

    // Help/Tutorial content
    helpWelcomeTitle: string;
    helpWelcomeDesc: string;
    helpWelcomeContent: string;
    helpCreateStreakTitle: string;
    helpCreateStreakDesc: string;
    helpCreateStreakAction: string;
    helpCreateStreakContent: string;
    helpTrackProgressTitle: string;
    helpTrackProgressDesc: string;
    helpTrackProgressContent: string;
    helpExampleStreakName: string;
    helpStreakTypesTitle: string;
    helpStreakTypesDesc: string;
    helpSimpleStreakContent: string;
    helpQuantityStreakContent: string;
    helpExampleUnit: string;
    helpRepeatPatternsTitle: string;
    helpRepeatPatternsDesc: string;
    helpDailyContent: string;
    helpWeeklyContent: string;
    helpMonthlyContent: string;
    helpFeatureSummaryTitle: string;
    helpFeatureSummaryDesc: string;
    helpFeatureTracking: string;
    helpFeatureTrackingDesc: string;
    helpFeatureMobile: string;
    helpFeatureMobileDesc: string;
    helpFeatureCustomize: string;
    helpFeatureCustomizeDesc: string;
    helpFeatureProgress: string;
    helpFeatureProgressDesc: string;
    helpReadyToStart: string;

    // Pomodoro
    pomodoroTitle: string;
    pomodoroHistoryTitle: string;
    pomodoroWork: string;
    pomodoroShort: string;
    pomodoroLong: string;
    pomodoroFocus: string;
    pomodoroShortBreak: string;
    pomodoroLongBreak: string;
    pomodoroToday: string;
    pomodoroTotal: string;
    pomodoroNoRecords: string;
    pomodoroStart: string;
    pomodoroPause: string;
    pomodoroReset: string;

    // TodoBottomSheet
    todoTitle: string;
    todoAddPlaceholder: string;
    todoFilterAll: string;
    todoFilterActive: string;
    todoFilterDone: string;
    todoClearCompleted: string;
    todoNoTodos: string;
    todoNoCompleted: string;
    todoAllDone: string;
    todoEditAria: string;
    todoDeleteAria: string;
    todoMarkDoneAria: string;
    todoMarkActiveAria: string;
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
    noStreaks: "No habits yet",
    startFirstStreak: "Create your first habit to get started!",

    // Form validation
    nameRequired: "Habit name is required",
    selectAtLeastOneDay: "Please select at least one day",

    // Additional translations
    back: "Back",
    next: "Next",

    // Settings
    help: "Help",
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
    today: "Today",
    longestStreak: "Longest Streak",
    currentStreak: "Current Streak",
    averagePerWeek: "Average per Week",
    thisWeek: "This Week",
    thisMonth: "This Month",
    categoryBreakdown: "Category Breakdown",
    noDataAvailable: "No data available",
    days: "days",

    // Week navigation
    lastWeek: "Last Week",
    nextWeek: "Next Week",
    weeksAgo: "weeks ago",
    weeksAhead: "weeks ahead",

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

    // Mood Tracking
    moodTracker: "Mood Tracker",
    howAreYouFeeling: "How Are You Feeling?",
    todaysMood: "Today's mood:",
    selectMood: "How are you feeling today?",
    moodNote: "Note (optional)",
    moodNoteOptional: "What happened today? How did you feel?",
    moodVeryBad: "Very Bad",
    moodBad: "Bad",
    moodNeutral: "Neutral",
    moodGood: "Good",
    moodVeryGood: "Very Good",
    moodSaved: "Mood saved successfully!",
    moodStats: "Mood Statistics",
    averageMood: "Average Mood",
    trackingStreak: "Tracking Streak",
    moodDistribution: "Mood Distribution",
    notableDays: "Notable Days",
    bestDay: "Best:",
    toughestDay: "Toughest:",
    noMoodData: "No mood entries yet. Start tracking your mood today!",
    moodEntrySummary: "You've tracked your mood for {count} days in the last 30 days. Keep it up! 🌟",

    // Help/Tutorial content
    helpWelcomeTitle: "Welcome to Streak Tracker! 🎯",
    helpWelcomeDesc: "Your personal companion for building life-changing habits",
    helpWelcomeContent: "Transform your daily routines into powerful habits with our intuitive tracking system. Whether you're aiming to drink more water, exercise regularly, or learn something new - we're here to support your journey to consistency and growth.",
    helpCreateStreakTitle: "Creating Your First Streak ✨",
    helpCreateStreakDesc: "Building habits starts with a single step - let's take it together",
    helpCreateStreakAction: "Tap the + button to begin your journey",
    helpCreateStreakContent: "Start by choosing a category that resonates with your goal (Health, Productivity, Learning, etc.). Pick a fun emoji that represents your habit, give it a meaningful name, and decide how often you want to practice it. The more specific and personal you make it, the more motivated you'll stay!",
    helpTrackProgressTitle: "Tracking Your Daily Progress 📈",
    helpTrackProgressDesc: "Consistency is key - every small action counts towards your bigger goal",
    helpTrackProgressContent: "Each time you complete your habit, simply tap the button on your streak card. Watch your streak counter grow day by day and feel the incredible satisfaction of building momentum. Remember: progress, not perfection!",
    helpExampleStreakName: "Drink 8 Glasses of Water",
    helpStreakTypesTitle: "Two Powerful Tracking Styles 🔄",
    helpStreakTypesDesc: "Choose the approach that best fits your habit and lifestyle",
    helpSimpleStreakContent: "Perfect for binary habits like 'Did I meditate today?' or 'Did I call a friend?' Simple, clean, and motivating - just one tap when you've completed your habit for the day.",
    helpQuantityStreakContent: "Ideal for measurable goals like drinking water, reading pages, or workout minutes. Set your daily target, then incrementally track your progress throughout the day. Visual progress bars keep you motivated!",
    helpExampleUnit: "glasses",
    helpRepeatPatternsTitle: "Flexible Scheduling Options 📅",
    helpRepeatPatternsDesc: "Life is unpredictable - customize your habits to fit your real lifestyle",
    helpDailyContent: "Practice every single day. Perfect for foundational habits you want to make automatic and non-negotiable in your life.",
    helpWeeklyContent: "Choose specific weekdays that work best for you, or set a 'once per week' goal for maximum flexibility. Great for busy schedules and weekend activities.",
    helpMonthlyContent: "Ideal for bigger projects and goals like 'Read one book,' 'Deep clean the house,' or 'Complete a monthly review.' Give yourself the whole month to succeed.",
    helpFeatureSummaryTitle: "Everything You Need to Succeed 🚀",
    helpFeatureSummaryDesc: "Powerful features designed to support your habit-building journey",
    helpFeatureTracking: "Smart & Reliable Tracking",
    helpFeatureTrackingDesc: "Never lose your progress with our bulletproof tracking system",
    helpFeatureMobile: "Mobile-First Experience",
    helpFeatureMobileDesc: "Seamlessly track habits anywhere, anytime with our beautiful mobile interface",
    helpFeatureCustomize: "Completely Personalized",
    helpFeatureCustomizeDesc: "Custom categories, emojis, themes, and even free days - make it truly yours",
    helpFeatureProgress: "Motivating Visual Feedback",
    helpFeatureProgressDesc: "Beautiful progress indicators and streak counters that celebrate your wins",
    helpReadyToStart: "Ready to transform your life one habit at a time? Your journey to lasting change starts with just one tap on that + button. You've got this! 💪",

    // Pomodoro
    pomodoroTitle: "Pomodoro Timer",
    pomodoroHistoryTitle: "Pomodoro History",
    pomodoroWork: "Work",
    pomodoroShort: "Short Break",
    pomodoroLong: "Long Break",
    pomodoroFocus: "Focus",
    pomodoroShortBreak: "Short break",
    pomodoroLongBreak: "Long break",
    pomodoroToday: "Today",
    pomodoroTotal: "Total",
    pomodoroNoRecords: "No records.",
    pomodoroStart: "Start",
    pomodoroPause: "Pause",
    pomodoroReset: "Reset",

    // TodoBottomSheet
    todoTitle: "Todos",
    todoAddPlaceholder: "Add a new todo...",
    todoFilterAll: "All",
    todoFilterActive: "Active",
    todoFilterDone: "Completed",
    todoClearCompleted: "Clear Completed ({count})",
    todoNoTodos: "No todos yet.",
    todoNoCompleted: "No completed todos.",
    todoAllDone: "All todos completed!",
    todoEditAria: "Edit todo",
    todoDeleteAria: "Delete",
    todoMarkDoneAria: "Mark as done",
    todoMarkActiveAria: "Mark as active",
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
    help: "Yardım",
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
    today: "Bugün",
    longestStreak: "En Uzun Seri",
    currentStreak: "Mevcut Seri",
    averagePerWeek: "Haftalık Ortalama",
    thisWeek: "Bu Hafta",
    thisMonth: "Bu Ay",
    categoryBreakdown: "Kategori Dağılımı",
    noDataAvailable: "Veri bulunamadı",
    days: "gün",

    // Week navigation
    lastWeek: "Geçen Hafta",
    nextWeek: "Gelecek Hafta",
    weeksAgo: "hafta önce",
    weeksAhead: "hafta sonra",

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

    moodTracker: "Ruh Hali Takibi",
    howAreYouFeeling: "Ruh Halim",
    todaysMood: "Bugünkü ruh halin:",
    selectMood: "Bugün nasıl hissediyorsun?",
    moodNote: "Not (opsiyonel)",
    moodNoteOptional: "Bugün neler yaşadın, neler hissettin?",
    moodVeryBad: "Çok Kötü",
    moodBad: "Kötü",
    moodNeutral: "Normal",
    moodGood: "İyi",
    moodVeryGood: "Çok İyi",
    moodSaved: "Ruh hali başarıyla kaydedildi!",
    moodStats: "Ruh Hali İstatistikleri",
    averageMood: "Ortalama Ruh Hali",
    trackingStreak: "Kayıt Serisi",
    moodDistribution: "Ruh Hali Dağılımı",
    notableDays: "Önemli Günler",
    bestDay: "En İyi:",
    toughestDay: "En Zor:",
    noMoodData: "Henüz ruh hali kaydın yok. İlk ruh halini kaydetmeye başla!",
    moodEntrySummary: "Son 30 günde {count} gün ruh halini kaydettiniz. Devam edin! 🌟",

    // Help/Tutorial content
    helpWelcomeTitle: "Streak Tracker'a Hoş Geldin! 🎯",
    helpWelcomeDesc: "Hayat değiştiren alışkanlıklar oluşturmak için kişisel yardımcın",
    helpWelcomeContent: "Günlük rutinlerini güçlü alışkanlıklara dönüştür! Su içmek, düzenli egzersiz yapmak ya da yeni bir şeyler öğrenmek istiyorsan - tutarlılık ve gelişim yolculuğunda yanındayız.",
    helpCreateStreakTitle: "İlk Alışkanlığını Oluştur ✨",
    helpCreateStreakDesc: "Alışkanlık oluşturmak tek bir adımla başlar - hadi birlikte atalım",
    helpCreateStreakAction: "Yolculuğuna başlamak için + butonuna dokun",
    helpCreateStreakContent: "Hedefine uygun bir kategori seç (Sağlık, Verimlilik, Öğrenim vs.). Alışkanlığını temsil eden eğlenceli bir emoji seç, anlamlı bir isim ver ve ne sıklıkla yapmak istediğine karar ver. Ne kadar kişisel ve spesifik yaparsan, o kadar motive kalırsın!",
    helpTrackProgressTitle: "Günlük İlerlemeni Takip Et 📈",
    helpTrackProgressDesc: "Tutarlılık anahtar - her küçük eylem büyük hedefinize katkıda bulunur",
    helpTrackProgressContent: "Tamamlandı olarak işaretlemek için her alışkanlık kartındaki butona dokun. Tutarlılık oluşturdukça sayının artışını izle!",
    helpExampleStreakName: "Su İçmek",
    helpStreakTypesTitle: "Alışkanlık Türleri",
    helpStreakTypesDesc: "Basit alışkanlıklar veya miktar bazlı hedefler arasında seçim yap.",
    helpSimpleStreakContent: "Meditasyon, egzersiz veya okuma gibi evet/hayır alışkanlıkları için mükemmel. Tamamlandı olarak işaretlemek için günde bir kez dokun.",
    helpQuantityStreakContent: "Su içmek, sayfa okumak veya egzersiz dakikaları gibi ölçülebilir hedefler için harika. Günlük hedef belirle ve ilerlemeyi takip et.",
    helpExampleUnit: "bardak",
    helpRepeatPatternsTitle: "Tekrar Kalıpları",
    helpRepeatPatternsDesc: "Alışkanlığını ne sıklıkla uygulamak istediğini özelleştir.",
    helpDailyContent: "Her gün uygula. Tutarlı günlük rutinler oluşturmak için mükemmel.",
    helpWeeklyContent: "Belirli günleri seç veya haftanın herhangi bir gününe izin ver. Esnek programlama için harika.",
    helpMonthlyContent: "Ayda bir kez. Kitap okuma veya detaylı temizlik gibi aylık hedefler için ideal.",
    helpFeatureSummaryTitle: "Hazırsın!",
    helpFeatureSummaryDesc: "Streak Tracker'ı özel kılan özellikler:",
    helpFeatureTracking: "Kolay Takip",
    helpFeatureTrackingDesc: "Tek dokunuşla ilerleme güncellemeleri",
    helpFeatureMobile: "Mobil Optimize",
    helpFeatureMobileDesc: "Hareket halindeyken takip için mükemmel",
    helpFeatureCustomize: "Özelleştirilebilir",
    helpFeatureCustomizeDesc: "Kategoriler, emojiler ve temalar",
    helpFeatureProgress: "Görsel İlerleme",
    helpFeatureProgressDesc: "Zaman içindeki büyümeni gör",
    helpReadyToStart: "Daha iyi alışkanlıklar oluşturmaya hazır mısın? İlk alışkanlığını oluşturmak için + butonuna dokun!",

    // Pomodoro
    pomodoroTitle: "Pomodoro Zamanlayıcı",
    pomodoroHistoryTitle: "Pomodoro Geçmişi",
    pomodoroWork: "Çalışma",
    pomodoroShort: "Kısa Mola",
    pomodoroLong: "Uzun Mola",
    pomodoroFocus: "Odaklanma",
    pomodoroShortBreak: "Kısa mola",
    pomodoroLongBreak: "Uzun mola",
    pomodoroToday: "Bu gün",
    pomodoroTotal: "Toplam",
    pomodoroNoRecords: "Kayıt yok.",
    pomodoroStart: "Başlat",
    pomodoroPause: "Duraklat",
    pomodoroReset: "Sıfırla",

    // TodoBottomSheet
    todoTitle: "Yapılacaklar",
    todoAddPlaceholder: "Yeni yapılacak ekle...",
    todoFilterAll: "Tümü",
    todoFilterActive: "Aktif",
    todoFilterDone: "Tamamlanan",
    todoClearCompleted: "Tamamlananları Temizle ({count})",
    todoNoTodos: "Henüz yapılacak yok.",
    todoNoCompleted: "Tamamlanan yapılacak yok.",
    todoAllDone: "Tüm yapılacaklar tamamlandı!",
    todoEditAria: "Yapılacak düzenle",
    todoDeleteAria: "Sil",
    todoMarkDoneAria: "Tamamlandı olarak işaretle",
    todoMarkActiveAria: "Aktif olarak işaretle",
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
