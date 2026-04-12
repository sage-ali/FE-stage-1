/**
 * Parses a target date into a Date object.
 * If the input is a date-only string (YYYY-MM-DD), it is parsed as a local date
 * to avoid UTC-related off-by-one errors.
 *
 * @param {Date|number|string} targetDate - The raw target date
 * @returns {Date} - The parsed Date object
 */
function parseTargetDate(targetDate) {
  if (
    typeof targetDate === 'string' &&
    /^\d{4}-\d{2}-\d{2}$/.test(targetDate)
  ) {
    const [year, month, day] = targetDate.split('-').map(Number);
    return new Date(year, month - 1, day);
  }

  return new Date(targetDate);
}

/**
 * Returns a new Date object set to the start of the local day
 * for the given date. The resulting date will have the same year,
 * month, and day as the input date, but will have the time set to
 * 00:00:00.000 in the local time zone.
 *
 * @param {Date} date - The date to get the start of the local day for
 * @returns {Date} - A new Date object set to the start of the local day
 */
function startOfLocalDay(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

/**
 * Formats a relative time given a value and unit.
 *
 * @param {number} value - The value to format (e.g. number of seconds)
 * @param {string} unit - The unit of the value (e.g. 'second', 'minute', 'hour', etc.)
 * @returns {string} - The formatted relative time string (English only)
 */
function formatRelativeTime(value, unit) {
  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
  return rtf.format(value, unit);
}

/**
 * Formats a given time difference in milliseconds into a string
 * (English only) indicating the time remaining in a human-readable format.
 * The format will be one of the following: "Due in X hours Y minutes",
 * "Due in X hours", "Due in Y minutes", or "Due now".
 *
 * @param {number} diffMs - The time difference in milliseconds
 * @returns {string} - The formatted time remaining string
 */
function formatHoursAndMinutes(diffMs) {
  const totalMinutes = Math.floor(diffMs / 60000);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours >= 1 && minutes >= 1) {
    return `Due in ${hours} ${hours === 1 ? 'hour' : 'hours'} ${minutes} ${minutes === 1 ? 'minute' : 'minutes'}`;
  }

  if (hours >= 1) {
    return `Due in ${hours} ${hours === 1 ? 'hour' : 'hours'}`;
  }

  if (minutes >= 1) {
    return `Due in ${minutes} ${minutes === 1 ? 'minute' : 'minutes'}`;
  }

  return 'Due now';
}

/**
 * Returns a string (English only) indicating the time remaining until the given target date.
 * If the target date is in the past, it will return a string indicating the time that has passed since the target date.
 * The format of the returned string is as follows:
 * - If the target date is today, it will return a string in the format "Due in X hours Y minutes" or "Due in X minutes" or "Due now".
 * - If the target date is tomorrow, it will return a string in the format "Due tomorrow at HH:MM".
 * - If the target date is within the next 6 days, it will return a string in the format "Due in X days".
 * - If the target date is more than 6 days in the future, it will return a string in the format "Due on YYYY-MM-DD".
 * @param {Date|number|string} targetDate - The target date to compute the time remaining for
 * @returns {string} - The formatted time remaining string
 */
export function getTimeRemaining(targetDate) {
  const target = parseTargetDate(targetDate);
  if (Number.isNaN(target.getTime())) return 'Invalid date';

  const now = new Date();
  const diffMs = target.getTime() - now.getTime();

  const targetDay = startOfLocalDay(target);
  const nowDay = startOfLocalDay(now);
  const dayDiff = Math.round((targetDay - nowDay) / 86400000);

  if (diffMs < 0) {
    const absMs = Math.abs(diffMs);
    const mins = Math.floor(absMs / 60000);
    const hours = Math.floor(absMs / 3600000);
    const days = Math.floor(absMs / 86400000);

    if (days >= 1) return `Overdue by ${days} ${days === 1 ? 'day' : 'days'}`;
    if (hours >= 1) {
      const remMins = Math.floor((absMs % 3600000) / 60000);
      if (hours < 6 && remMins > 0) {
        return `Overdue by ${hours} ${hours === 1 ? 'hour' : 'hours'} ${remMins} ${remMins === 1 ? 'minute' : 'minutes'}`;
      }
      return `Overdue by ${hours} ${hours === 1 ? 'hour' : 'hours'}`;
    }
    if (mins >= 1)
      return `Overdue by ${mins} ${mins === 1 ? 'minute' : 'minutes'}`;
    return 'Due now!';
  }

  if (dayDiff === 0) {
    const hours = Math.floor(diffMs / 3600000);

    if (hours < 6) {
      return formatHoursAndMinutes(diffMs);
    }

    if (hours >= 1) return `Due ${formatRelativeTime(hours, 'hour')}`;

    const mins = Math.floor(diffMs / 60000);
    if (mins >= 1) return `Due ${formatRelativeTime(mins, 'minute')}`;

    return 'Due now';
  }

  if (dayDiff === 1) {
    return `Due tomorrow at ${new Intl.DateTimeFormat('en', {
      hour: 'numeric',
      minute: '2-digit',
    }).format(target)}`;
  }

  if (dayDiff > 1 && dayDiff <= 6) {
    return `Due ${formatRelativeTime(dayDiff, 'day')}`;
  }

  return `Due ${new Intl.DateTimeFormat('en', {
    dateStyle: 'medium',
  }).format(target)}`;
}
