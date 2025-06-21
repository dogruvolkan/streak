# Streak Tracker

React + TypeScript ile geliştirilmiş responsive streak takip uygulaması.

## Özellikler

- ✅ Streak (alışkanlık) oluşturma ve takip etme
- ✅ Günlük, haftalık ve aylık tekrar seçenekleri
- ✅ Haftalık tekrar için özel gün seçimi
- ✅ İlerleme takibi ve sayaç artırma
- ✅ LocalStorage ile veri saklama
- ✅ Mobil öncelikli responsive tasarım
- ✅ Material UI ile modern arayüz

## Teknolojiler

- **Frontend**: React 18 + TypeScript + Vite
- **UI Kütüphanesi**: Material UI (@mui/material)
- **İkonlar**: Material UI Icons (@mui/icons-material)
- **Styling**: Emotion (CSS-in-JS)
- **Veri Saklama**: localStorage

## Kurulum

```bash
# Bağımlılıkları yükle
npm install

# Geliştirme sunucusunu başlat
npm run dev

# Üretim build'i oluştur
npm run build
```

## Kullanım

1. Sağ alttaki + butonuna tıklayarak yeni bir streak oluşturun
2. Streak adını girin
3. Tekrarlanma sıklığını seçin (günlük, haftalık, aylık)
4. Haftalık seçtiyseniz, hangi günlerde tekrarlanacağını belirleyin
5. Ana ekranda streak'lerinizi görün ve + butonuna basarak ilerleme kaydedin

## Proje Yapısı

```
src/
├── components/           # React bileşenleri
│   ├── AddStreakBottomSheet.tsx
│   ├── StreakCard.tsx
│   └── StreakList.tsx
├── types/               # TypeScript tip tanımları
│   └── index.ts
├── utils/               # Yardımcı fonksiyonlar
│   └── localStorage.ts
└── App.tsx             # Ana uygulama bileşeni
```

## Geliştirme

Bu proje React + TypeScript + Vite template'i kullanılarak oluşturulmuştur.
...reactDom.configs.recommended.rules,
},
})

```

```
