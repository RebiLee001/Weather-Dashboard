import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
// Save recent search
try {
const recent = JSON.parse(localStorage.getItem('recentCities') || '[]');
const next = [q, ...recent.filter((r) => r.toLowerCase() !== q.toLowerCase())].slice(0, 5);
localStorage.setItem('recentCities', JSON.stringify(next));
} catch {}
} catch (e) {
setError(e.message || 'Unknown error');
} finally {
setLoading(false);
}
}, [city, units, lang, key]);


// auto refresh
useEffect(() => {
if (!refreshMs) return;
if (intervalRef.current) clearInterval(intervalRef.current);
intervalRef.current = setInterval(() => fetchAll(city), refreshMs);
return () => intervalRef.current && clearInterval(intervalRef.current);
}, [fetchAll, city, refreshMs]);


// geolocation on first mount
useEffect(() => {
let mounted = true;
if ('geolocation' in navigator) {
navigator.geolocation.getCurrentPosition(async (pos) => {
if (!mounted) return;
try {
const { latitude, longitude } = pos.coords;
const u = encodeURIComponent(units);
const l = encodeURIComponent(lang);
const url = `${API_BASE}/weather?lat=${latitude}&lon=${longitude}&appid=${key}&units=${u}&lang=${l}`;
const res = await fetch(url);
if (res.ok) {
const j = await res.json();
if (j?.name) {
setCity(j.name);
fetchAll(j.name);
}
}
} catch {}
});
}
return () => { mounted = false; };
}, []); // run once


const state = useMemo(() => ({ city, units, lang, loading, error, data, forecast, lastUpdated }), [city, units, lang, loading, error, data, forecast, lastUpdated]);
const api = useMemo(() => ({ setCity, setUnits, setLang, fetchAll }), [setCity, setUnits, setLang, fetchAll]);


return [state, api];
}
