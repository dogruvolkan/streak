import type { StreakCategory } from "../types";
import type { Language } from "../utils/i18n";

// Kategori renkleri (Material Design color palette)
export const categoryColors: Record<StreakCategory, string> = {
    health: "#f44336",     // Red
    fitness: "#ff9800",    // Orange  
    nutrition: "#4caf50",  // Green
    productivity: "#2196f3", // Blue
    learning: "#9c27b0",   // Purple
    hobby: "#ff5722",      // Deep Orange
    personal: "#795548",   // Brown
    social: "#e91e63",     // Pink
    finance: "#009688",    // Teal
    other: "#607d8b",      // Blue Grey
};

// Kategori emoji'leri
export const categoryEmojis: Record<StreakCategory, string> = {
    health: "🏥",
    fitness: "🏃‍♂️",
    nutrition: "🥗",
    productivity: "📈",
    learning: "📚",
    hobby: "🎨",
    personal: "🧘‍♀️",
    social: "👥",
    finance: "💰",
    other: "📋",
};

// Kategori isimleri (çok dilli)
export const getCategoryName = (category: StreakCategory, language: Language): string => {
    const names = {
        en: {
            health: "Health",
            fitness: "Fitness",
            nutrition: "Nutrition",
            productivity: "Productivity",
            learning: "Learning",
            hobby: "Hobby",
            personal: "Personal",
            social: "Social",
            finance: "Finance",
            other: "Other",
        },
        tr: {
            health: "Sağlık",
            fitness: "Spor",
            nutrition: "Beslenme",
            productivity: "Verimlilik",
            learning: "Öğrenme",
            hobby: "Hobi",
            personal: "Kişisel",
            social: "Sosyal",
            finance: "Finans",
            other: "Diğer",
        },
    };

    return names[language][category];
};

// Popüler emoji seçenekleri
export const popularEmojis = [
    // Spor & Sağlık
    "🏃‍♂️", "🏃‍♀️", "💪", "🏋️‍♂️", "🏋️‍♀️", "🧘‍♂️", "🧘‍♀️", "🚴‍♂️", "🚴‍♀️", "🏊‍♂️", "🏊‍♀️",
    "⚽", "🏀", "🎾", "🏓", "🥊", "🤸‍♂️", "🤸‍♀️", "🏆", "🥇", "❤️", "🫀", "🏥",

    // Beslenme
    "🥗", "🍎", "🥕", "🥦", "🍌", "🍓", "🥑", "🥤", "💧", "🍵", "☕", "🥛",

    // Öğrenme & Verimlilik
    "📚", "📖", "✍️", "📝", "💻", "📊", "📈", "🎯", "⏰", "📅", "✅", "💡",
    "🧠", "🎓", "📜", "🔬", "🧮", "📐", "✏️", "🖊️", "📋", "📌",

    // Kişisel & Yaşam Tarzı
    "🌅", "🌙", "😴", "🛏️", "🚿", "🪥", "🧴", "💄", "🪞", "👕", "🧽", "🏠",
    "🌱", "🌻", "🌈", "⭐", "🔥", "💫", "✨", "🎉", "🎊", "🎁",

    // Sosyal & İletişim
    "👥", "👨‍👩‍👧‍👦", "🤝", "💬", "📞", "📱", "💌", "🎭", "🎪", "🎵", "🎶", "🎸",

    // Finans & İş
    "💰", "💳", "📊", "📈", "💼", "🏢", "💸", "🪙", "💎", "🎯", "📋", "📑",

    // Hobi & Yaratıcılık
    "🎨", "🖌️", "✏️", "📷", "🎬", "🎭", "🎪", "🧩", "🎲", "🃏", "🎯", "🎳",
    "🧶", "✂️", "🪡", "🎼", "🎹", "🥁", "🎻", "🎺", "🎸", "🎤",

    // Diğer
    "📱", "🌍", "🌎", "🌏", "🚗", "🚲", "✈️", "🎒", "🗺️", "📍", "🔑", "🎁"
];

// Kategori bazında önerilen emoji'ler
export const getSuggestedEmojis = (category: StreakCategory): string[] => {
    const suggestions: Record<StreakCategory, string[]> = {
        health: ["❤️", "🫀", "🏥", "💊", "🩺", "🌡️", "😴", "🧘‍♂️", "🧘‍♀️", "💪"],
        fitness: ["🏃‍♂️", "🏃‍♀️", "💪", "🏋️‍♂️", "🏋️‍♀️", "🚴‍♂️", "🚴‍♀️", "🏊‍♂️", "🏊‍♀️", "⚽", "🏀", "🎾"],
        nutrition: ["🥗", "🍎", "🥕", "🥦", "🍌", "🍓", "🥑", "💧", "🥤", "🍵", "🥛", "🥜"],
        productivity: ["📈", "📊", "🎯", "⏰", "📅", "✅", "💻", "📝", "💡", "🚀", "⚡", "🔥"],
        learning: ["📚", "📖", "🎓", "🧠", "💡", "✍️", "📝", "🔬", "🧮", "📜", "🎯", "⭐"],
        hobby: ["🎨", "🖌️", "📷", "🎬", "🎵", "🎸", "🧩", "🎲", "🧶", "✂️", "🎭", "🎪"],
        personal: ["🌅", "🌙", "😴", "🚿", "🪥", "🧴", "🌱", "🌻", "✨", "🎉", "🔑", "💫"],
        social: ["👥", "👨‍👩‍👧‍👦", "🤝", "💬", "📞", "💌", "🎭", "🎪", "🎉", "🎊", "💕", "🌈"],
        finance: ["💰", "💳", "📊", "📈", "💼", "🏢", "💸", "🪙", "💎", "📋", "📑", "🎯"],
        other: ["📋", "⭐", "🔥", "💫", "✨", "🎁", "🌈", "🎯", "📌", "🔑", "💡", "⚡"],
    };

    return suggestions[category] || [];
};
