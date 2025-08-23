// src/lib/dateFormat.js

/**
 * Format a date string or Date object to a unified display format.
 * Example output: Aug 23, 2025, 2:30 PM
 */
export function formatDateTime(date) {
  if (!date) return "N/A";
  const d = typeof date === "string" ? new Date(date) : date;
  if (isNaN(d)) return "N/A";
  return d.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}
