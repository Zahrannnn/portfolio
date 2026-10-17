import { onCLS, onINP, onLCP, onTTFB } from "web-vitals";

// Field data (RUM) for the Core Web Vitals — see docs/perf-audit-2026-10-17.md [m1].
// Set VITE_VITALS_ENDPOINT to a collector URL to record real-user metrics;
// without it, metrics only log in dev so nothing ships silently to nowhere.
const endpoint = import.meta.env.VITE_VITALS_ENDPOINT;

function report(metric) {
  if (endpoint) {
    const payload = JSON.stringify({
      name: metric.name,
      value: metric.value,
      id: metric.id,
      rating: metric.rating,
      navigationType: metric.navigationType,
      path: location.pathname,
    });
    if (navigator.sendBeacon) {
      navigator.sendBeacon(endpoint, payload);
    } else {
      fetch(endpoint, { method: "POST", body: payload, keepalive: true });
    }
  } else if (import.meta.env.DEV) {
    console.debug("[vitals]", metric.name, Math.round(metric.value), metric.rating);
  }
}

onCLS(report);
onINP(report);
onLCP(report);
onTTFB(report);
