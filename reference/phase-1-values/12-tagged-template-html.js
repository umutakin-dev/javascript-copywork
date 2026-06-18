// Phase 1 · 12 — A tagged template that escapes HTML
// A "tag" is just a function called with the literal string PARTS and the
// interpolated VALUES separately, so it can transform the values before they
// are stitched in. This is how libraries build safe HTML.
//
// Ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#tagged_templates

/** Escape the five characters that matter in HTML text and attributes. */
function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;") // must be first, or it double-escapes the others
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

// `strings` is the array of static parts; `values` are the ${...} results.
function html(strings, ...values) {
  return strings.reduce((out, part, i) => {
    const value = i < values.length ? escapeHtml(values[i]) : "";
    return out + part + value;
  }, "");
}

const userInput = '<img src=x onerror="alert(1)">';

// The static parts (<p>...</p>) are trusted and pass through unescaped; ONLY
// the interpolated value is escaped — exactly what stops injection.
console.log(html`<p>Comment: ${userInput}</p>`);
// -> <p>Comment: &lt;img src=x onerror=&quot;alert(1)&quot;&gt;</p>
