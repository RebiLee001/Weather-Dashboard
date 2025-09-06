export const UNITS = {
metric: { code: 'metric', temp: '°C', speed: 'm/s' },
imperial: { code: 'imperial', temp: '°F', speed: 'mph' },
};


export function toDay(ts, locale = 'en-US') {
return new Date(ts).toLocaleDateString(locale, { weekday: 'short' });
}


export function groupForecastByDay(list = [], locale = 'en-US') {
const byDay = {};
list.forEach((item) => {
const day = new Date(item.dt * 1000).toLocaleDateString(locale);
if (!byDay[day]) byDay[day] = [];
byDay[day].push(item);
});
// Summarize per day (min/max and an icon from midday or first)
return Object.entries(byDay).map(([date, entries]) => {
const temps = entries.map((e) => e.main.temp);
const min = Math.min(...temps);
const max = Math.max(...temps);
const midday = entries.find((e) => new Date(e.dt * 1000).getHours() === 12) || entries[0];
return {
date,
min,
max,
icon: midday.weather?.[0]?.icon,
description: midday.weather?.[0]?.description,
};
});
}