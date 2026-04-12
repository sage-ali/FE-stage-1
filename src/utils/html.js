let safeIdCounter = 0;

/**
 * Escapes special characters for HTML to prevent XSS.
 * @param {any} str - The value to escape.
 * @returns {string} The escaped string.
 */
export function escapeHTML(str) {
  const s = String(str == null ? '' : str);
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Sanitizes a string to be used as a valid HTML ID.
 * @param {string|number} id - The raw ID.
 * @returns {string} A sanitized string safe for HTML ID attributes.
 */
export function makeSafeId(id) {
  if (id === null || id === undefined) {
    return `safe-id-${++safeIdCounter}`;
  }
  return String(id).replace(/[^a-z0-9_-]/gi, '-');
}
