// Phase 1 · 14 — Intl: locale-aware number, currency, and date formatting
// (Exact symbols/spacing depend on the runtime's ICU data, hence "e.g." below.)
//
// Ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat
// Ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat

const amount = 1234567.891;

const tryFmt = new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY" });
const eurFmt = new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" });

console.log(tryFmt.format(amount)); // e.g. "₺1.234.567,89"
console.log(eurFmt.format(amount)); // e.g. "1.234.567,89 €"

// Plain grouping — note the locale decides the separators:
console.log(new Intl.NumberFormat("en-US").format(amount)); // "1,234,567.891"

// Dates — pass a fixed instant and time zone so the output is deterministic.
const date = new Date("2026-06-17T09:30:00Z");
const dateFmt = new Intl.DateTimeFormat("tr-TR", {
  dateStyle: "long",
  timeStyle: "short",
  timeZone: "Europe/Istanbul",
});
console.log(dateFmt.format(date)); // e.g. "17 Haziran 2026 12:30"
