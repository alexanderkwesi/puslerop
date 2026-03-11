/**
 * AdPulse Pro — Web Vitals Reporter
 * ─────────────────────────────────────────────────────────────
 * Collects Core Web Vitals and custom metrics, then either:
 *   • Logs them to the console (development)
 *   • Sends them to the AdPulse analytics endpoint (production)
 *
 * Metrics captured:
 *   CLS  – Cumulative Layout Shift
 *   FID  – First Input Delay
 *   FCP  – First Contentful Paint
 *   LCP  – Largest Contentful Paint
 *   TTFB – Time to First Byte
 *   INP  – Interaction to Next Paint  (web-vitals v3+)
 */

// Vite uses import.meta.env instead of process.env
const ANALYTICS_ENDPOINT =
  import.meta.env.VITE_ANALYTICS_URL ||
  "http://localhost:5000/api/analytics/vitals";
const IS_DEV = import.meta.env.DEV;

// ─── Metric rating thresholds (Google Core Web Vitals) ────────────────────────
const THRESHOLDS = {
  CLS: { good: 0.1, poor: 0.25 },
  FID: { good: 100, poor: 300 },
  FCP: { good: 1800, poor: 3000 },
  LCP: { good: 2500, poor: 4000 },
  TTFB: { good: 800, poor: 1800 },
  INP: { good: 200, poor: 500 },
};

/**
 * Returns "good" | "needs-improvement" | "poor" based on the metric value.
 */
function getRating(name, value) {
  const t = THRESHOLDS[name];
  if (!t) return "unknown";
  if (value <= t.good) return "good";
  if (value <= t.poor) return "needs-improvement";
  return "poor";
}

/**
 * Formats a metric object for logging / sending.
 */
function formatMetric(metric) {
  return {
    id: metric.id,
    name: metric.name,
    value: Math.round(
      metric.name === "CLS" ? metric.value * 1000 : metric.value,
    ),
    unit: metric.name === "CLS" ? "unitless×1000" : "ms",
    rating: getRating(metric.name, metric.value),
    delta: metric.delta,
    entries: metric.entries?.length ?? 0,
    navigationType: metric.navigationType ?? "unknown",
    timestamp: new Date().toISOString(),
    page: window.location.pathname,
    userAgent: navigator.userAgent,
  };
}

/**
 * Sends a formatted metric to the backend analytics endpoint.
 * Uses navigator.sendBeacon when available for reliability on page unload.
 */
function sendToAnalytics(formattedMetric) {
  const body = JSON.stringify(formattedMetric);

  if (navigator.sendBeacon) {
    navigator.sendBeacon(
      ANALYTICS_ENDPOINT,
      new Blob([body], { type: "application/json" }),
    );
  } else {
    fetch(ANALYTICS_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      keepalive: true,
    }).catch(() => {
      // Silently swallow analytics errors — never impact the user experience
    });
  }
}

/**
 * Logs a metric to the console in a formatted, colour-coded style.
 */
function logMetric(formatted) {
  const colors = {
    good: "#3ecf8e",
    "needs-improvement": "#f59e0b",
    poor: "#f56565",
    unknown: "#888",
  };
  const color = colors[formatted.rating] || "#888";

  console.groupCollapsed(
    `%c[AdPulse Vitals] %c${formatted.name}%c — ${formatted.value}${formatted.unit === "ms" ? "ms" : ""} (${formatted.rating})`,
    "color:#5b6ef5;font-weight:700",
    `color:${color};font-weight:700`,
    "color:#888;font-weight:400",
  );
  console.table({
    Value: `${formatted.value} ${formatted.unit}`,
    Rating: formatted.rating,
    Delta: formatted.delta,
    Entries: formatted.entries,
    Nav: formatted.navigationType,
    Page: formatted.page,
  });
  console.groupEnd();
}

/**
 * Main handler — called for every metric.
 * @param {function|undefined} onPerfEntry  Optional external callback.
 */
function handleMetric(metric, onPerfEntry) {
  const formatted = formatMetric(metric);

  // Always call the external callback if provided (e.g. console.log, GTM push)
  if (typeof onPerfEntry === "function") {
    onPerfEntry(formatted);
  }

  if (IS_DEV) {
    logMetric(formatted);
  } else {
    sendToAnalytics(formatted);
  }
}

/**
 * reportWebVitals — drop-in replacement for Create React App's default.
 *
 * Usage:
 *   reportWebVitals()                        // dev logs only
 *   reportWebVitals(console.log)             // external callback
 *   reportWebVitals(metric => pushToGTM(metric))
 */
const reportWebVitals = (onPerfEntry) => {
  // web-vitals is a peer dependency — gracefully skip if not installed.
  import("web-vitals")
    .then(({ getCLS, getFID, getFCP, getLCP, getTTFB, getINP }) => {
      getCLS((m) => handleMetric(m, onPerfEntry));
      getFID((m) => handleMetric(m, onPerfEntry));
      getFCP((m) => handleMetric(m, onPerfEntry));
      getLCP((m) => handleMetric(m, onPerfEntry));
      getTTFB((m) => handleMetric(m, onPerfEntry));

      // INP is available in web-vitals v3+
      if (typeof getINP === "function") {
        getINP((m) => handleMetric(m, onPerfEntry));
      }
    })
    .catch(() => {
      if (IS_DEV) {
        console.warn(
          "[AdPulse Vitals] web-vitals package not found.\n" +
            "Run: npm install web-vitals",
        );
      }
    });
};

export default reportWebVitals;
