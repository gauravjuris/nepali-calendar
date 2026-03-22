#!/usr/bin/env node
// scripts/update-today.js
// Generates data/today.json with today's Nepali date.
// Run daily by GitHub Actions to generate a commit → green contribution square.

const fs = require('fs');
const path = require('path');

// ── BS month data (days per month) ──
const BS_MONTH_DATA = {
  2070:[31,32,31,32,31,30,30,30,29,29,30,31],
  2071:[31,31,31,32,31,31,29,30,30,29,30,30],
  2072:[31,31,32,31,31,31,30,29,30,29,30,30],
  2073:[31,32,31,32,31,30,30,29,30,29,30,30],
  2074:[31,32,31,32,31,30,30,30,29,29,30,31],
  2075:[31,31,31,32,31,31,29,30,30,29,30,30],
  2076:[31,31,32,31,31,31,30,29,30,29,30,30],
  2077:[31,31,32,32,31,30,30,29,30,29,30,30],
  2078:[31,32,31,32,31,30,30,30,29,29,30,31],
  2079:[31,31,31,32,31,31,29,30,30,29,30,30],
  2080:[31,31,32,31,31,31,30,29,30,29,30,30],
  2081:[31,32,31,32,31,30,30,29,30,29,30,30],
  2082:[31,32,31,32,31,30,30,30,29,30,29,31],
  2083:[31,31,31,32,31,31,30,29,30,29,30,30],
  2084:[31,31,32,31,31,31,30,29,30,29,30,30],
  2085:[31,32,31,32,31,30,30,30,29,29,30,31],
  2086:[30,32,31,32,31,30,30,30,29,30,29,31],
  2087:[31,31,32,31,31,31,30,29,30,29,30,30],
  2088:[31,31,32,32,31,30,30,29,30,29,30,30],
  2089:[31,32,31,32,31,30,30,30,29,29,30,31],
  2090:[31,32,31,32,31,30,30,30,29,30,29,31],
};

const BS_MONTHS_EN = ['Baisakh','Jestha','Ashadh','Shrawan','Bhadra','Ashwin','Kartik','Mangsir','Poush','Magh','Falgun','Chaitra'];
const BS_MONTHS_NE = ['बैशाख','जेठ','असार','श्रावण','भाद्र','आश्विन','कार्तिक','मंसिर','पौष','माघ','फाल्गुन','चैत्र'];
const DAYS_EN = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const DAYS_NE = ['आइतबार','सोमबार','मंगलबार','बुधबार','बिहीबार','शुक्रबार','शनिबार'];

function adToBS(adYear, adMonth, adDay) {
  const refAD = new Date(1943, 3, 14);
  const target = new Date(adYear, adMonth - 1, adDay);
  let totalDays = Math.round((target - refAD) / 86400000);
  let bsY = 2000, bsM = 1, bsD = 1;
  let yearData = BS_MONTH_DATA[bsY] || Array(12).fill(30);
  while (totalDays >= yearData[bsM - 1]) {
    totalDays -= yearData[bsM - 1];
    bsM++;
    if (bsM > 12) { bsM = 1; bsY++; yearData = BS_MONTH_DATA[bsY] || Array(12).fill(30); }
  }
  bsD += totalDays;
  if (bsD > yearData[bsM - 1]) { bsD -= yearData[bsM - 1]; bsM++; if (bsM > 12) { bsM = 1; bsY++; } }
  return { year: bsY, month: bsM, day: bsD };
}

const now = new Date();
const bs = adToBS(now.getFullYear(), now.getMonth() + 1, now.getDate());
const dow = now.getDay();

const data = {
  generated_at: now.toISOString(),
  ad: {
    year: now.getFullYear(),
    month: now.getMonth() + 1,
    day: now.getDate(),
    weekday_en: DAYS_EN[dow],
  },
  bs: {
    year: bs.year,
    month: bs.month,
    day: bs.day,
    month_name_en: BS_MONTHS_EN[bs.month - 1],
    month_name_ne: BS_MONTHS_NE[bs.month - 1],
    weekday_en: DAYS_EN[dow],
    weekday_ne: DAYS_NE[dow],
    full_date_en: `${bs.day} ${BS_MONTHS_EN[bs.month - 1]} ${bs.year} BS`,
    full_date_ne: `${bs.day} ${BS_MONTHS_NE[bs.month - 1]} ${bs.year}`,
  }
};

const outPath = path.join(__dirname, '..', 'data', 'today.json');
fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, JSON.stringify(data, null, 2));
console.log(`✅  Updated: ${data.bs.full_date_en}  (${data.ad.year}-${String(data.ad.month).padStart(2,'0')}-${String(data.ad.day).padStart(2,'0')})`);
