/**
 * Computes a human-readable relative time string from a given date.
 * @param {string|Date} targetDate - The date to compare against.
 * @returns {string} A human-readable relative time string.
 */
export function getTimeRemaining(targetDate) {
  const target = new Date(targetDate);
  if (isNaN(target.getTime())) return 'Invalid date';

  const now = new Date();

  // Reset hours to compare full days
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const targetDay = new Date(
    target.getFullYear(),
    target.getMonth(),
    target.getDate()
  );

  const diffTime = targetDay - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

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
