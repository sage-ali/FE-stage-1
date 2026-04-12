/**
 * Computes a human-readable relative time string from a given date.
 * @param {string|Date} targetDate - The date to compare against.
 * @returns {string} A human-readable relative time string.
 */
export function getTimeRemaining(targetDate) {
  const target = new Date(targetDate);
  if (isNaN(target.getTime())) return 'Invalid date';

  const now = new Date();

  // Use UTC midnights to compare full days correctly (avoiding DST issues)
  const today = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
  const targetDay = Date.UTC(
    target.getFullYear(),
    target.getMonth(),
    target.getDate()
  );

  const diffTime = targetDay - today;
  const diffDays = Math.ceil(diffTime / 86400000); // 86400000 ms in a day

  if (diffDays === 0) {
    return 'Due now!';
  } else if (diffDays === 1) {
    return 'Due tomorrow';
  } else if (diffDays > 1) {
    return `Due in ${diffDays} days`;
  } else if (diffDays === -1) {
    return 'Overdue by 1 day';
  } else {
    return `Overdue by ${Math.abs(diffDays)} days`;
  }
}
