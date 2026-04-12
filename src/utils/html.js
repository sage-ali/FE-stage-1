/**
 * Escapes special characters for HTML to prevent XSS.
 * @param {string} str - The string to escape.
 * @returns {string} The escaped string.
 */
export function escapeHTML(str) {
  if (typeof str !== 'string') return String(str || '');
  return str
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
  if (id === null || id === undefined) return 'safe-id-null';
  return String(id).replace(/[^a-z0-9_-]/gi, '-');
}
