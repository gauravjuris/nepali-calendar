# 🗓️ नेपाली पात्रो — Nepali Calendar

A beautiful, standalone Nepali (Bikram Sambat) calendar widget you can drop into any website — zero dependencies, zero build step.

[![Daily Date Update](https://github.com/gauravjuris/nepali-calendar/actions/workflows/daily-update.yml/badge.svg)](https://github.com/gauravjuris/nepali-calendar/actions/workflows/daily-update.yml)

---

## ✨ Features

- **Bikram Sambat ↔ Gregorian** date conversion (years 2000–2090 BS)
- **Today highlighted** automatically
- **Public holidays & festivals** marked (Dashain, Tihar, Shivaratri, Holi, New Year, and more)
- **Nepali numerals** (देवनागरी) throughout
- **Keyboard navigation** — `←` / `→` to change months, `Home` to jump to today
- **Fully responsive** — works on mobile, tablet, desktop
- **Zero dependencies** — single `index.html`, no npm, no bundler
- **🤖 Daily GitHub Actions** auto-commit keeps your contribution graph green every day

---

## 🚀 Quick Start

### Option 1 — Drop the file in your site

Copy `index.html` into your project and open it in a browser. Done.

### Option 2 — Embed as an `<iframe>`

```html
<iframe
  src="https://YOUR_USERNAME.github.io/nepali-calendar/"
  width="100%"
  height="700"
  frameborder="0"
  title="Nepali Calendar"
></iframe>
```

### Option 3 — GitHub Pages (free hosting)

1. Push this repo to GitHub
2. Go to **Settings → Pages → Source → `main` branch → `/` (root)**
3. Your calendar is live at `https://gauravjuris.github.io/nepali-calendar/`

---

## 🤖 Auto-Commit (Daily GitHub Contributions)

The repo ships with a **GitHub Actions workflow** that runs every day at ~00:15 Nepal time.

It:
1. Converts today's AD date to Bikram Sambat
2. Writes the result to `data/today.json`
3. Commits & pushes if the file changed

This generates **one green square per day** on your GitHub contribution graph — automatically.

**`data/today.json` example:**
```json
{
  "generated_at": "2026-03-22T00:30:00.000Z",
  "ad": { "year": 2026, "month": 3, "day": 22, "weekday_en": "Sunday" },
  "bs": {
    "year": 2083, "month": 12, "day": 10,
    "month_name_en": "Chaitra", "month_name_ne": "चैत्र",
    "weekday_en": "Sunday", "weekday_ne": "आइतबार",
    "full_date_en": "10 Chaitra 2083 BS",
    "full_date_ne": "10 चैत्र 2083"
  }
}
```

No secrets or tokens needed — GitHub Actions has write permission by default.

---

## 📅 BS Months Reference

| # | नेपाली | English | Approx. AD |
|---|--------|---------|------------|
| 1 | बैशाख | Baisakh | Apr – May |
| 2 | जेठ | Jestha | May – Jun |
| 3 | असार | Ashadh | Jun – Jul |
| 4 | श्रावण | Shrawan | Jul – Aug |
| 5 | भाद्र | Bhadra | Aug – Sep |
| 6 | आश्विन | Ashwin | Sep – Oct |
| 7 | कार्तिक | Kartik | Oct – Nov |
| 8 | मंसिर | Mangsir | Nov – Dec |
| 9 | पौष | Poush | Dec – Jan |
| 10 | माघ | Magh | Jan – Feb |
| 11 | फाल्गुन | Falgun | Feb – Mar |
| 12 | चैत्र | Chaitra | Mar – Apr |

---

## 📁 Project Structure

```
nepali-calendar/
├── index.html                    # Calendar app (standalone, no deps)
├── data/
│   └── today.json                # Auto-updated daily by GitHub Actions
├── scripts/
│   └── update-today.js           # Node script: generates today.json
└── .github/
    └── workflows/
        └── daily-update.yml      # Runs every day at midnight NPT
```

---

## 🛠️ Customisation

All styles live in the `<style>` block at the top of `index.html` using CSS variables:

```css
--crimson:    #C0392B;   /* primary brand color */
--gold:       #D4A017;   /* accent / heading gradient */
--bg:         #0d0a0b;   /* page background */
```

To add your own holidays, edit the `HOLIDAYS` object in the `<script>` block:

```js
const HOLIDAYS = {
  '1-1':  { name: 'नयाँ वर्ष', en: 'Nepali New Year', type: 'holiday' },
  // Add more: 'month-day': { name, en, type: 'holiday' | 'festival' }
};
```

---

## 📜 License

MIT — free to use, modify, and distribute.

---

*Made with ❤️ for Nepal 🇳🇵*
