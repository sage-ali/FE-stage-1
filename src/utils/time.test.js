import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { getTimeRemaining } from './time.js';

describe('time utils', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('getTimeRemaining', () => {
    it('should return "Invalid date" for bad dates', () => {
      expect(getTimeRemaining('invalid')).toBe('Invalid date');
    });

    it('should handle "Due now" scenarios', () => {
      const now = new Date('2026-04-12T12:00:00Z');
      vi.setSystemTime(now);

      // Exactly now
      expect(getTimeRemaining(now.toISOString())).toBe('Due now');

      // Less than a minute away
      const soon = new Date(now.getTime() + 30000);
      expect(getTimeRemaining(soon.toISOString())).toBe('Due now');
    });

    it('should handle relative minutes', () => {
      const now = new Date('2026-04-12T12:00:00Z');
      vi.setSystemTime(now);

      const in5Mins = new Date(now.getTime() + 5 * 60000);
      expect(getTimeRemaining(in5Mins.toISOString())).toBe('Due in 5 minutes');

      // Edge case for same day but less than 6 hours and only minutes
      const in45Mins = new Date(now.getTime() + 45 * 60000);
      expect(getTimeRemaining(in45Mins.toISOString())).toBe(
        'Due in 45 minutes'
      );
    });

    it('should handle hours and minutes combination', () => {
      const now = new Date('2026-04-12T12:00:00Z');
      vi.setSystemTime(now);

      const in2Hours15Mins = new Date(now.getTime() + 2 * 3600000 + 15 * 60000);
      expect(getTimeRemaining(in2Hours15Mins.toISOString())).toBe(
        'Due in 2 hours 15 minutes'
      );
    });

    it('should handle relative hours', () => {
      const now = new Date('2026-04-12T12:00:00Z');
      vi.setSystemTime(now);

      const in2Hours = new Date(now.getTime() + 2 * 3600000);
      expect(getTimeRemaining(in2Hours.toISOString())).toBe('Due in 2 hours');

      const in8Hours = new Date(now.getTime() + 8 * 3600000);
      expect(getTimeRemaining(in8Hours.toISOString())).toBe('Due in 8 hours');
    });

    it('should handle tomorrow', () => {
      const now = new Date('2026-04-12T12:00:00Z');
      vi.setSystemTime(now);

      const tomorrow = new Date('2026-04-13T10:00:00Z');
      expect(getTimeRemaining(tomorrow.toISOString())).toMatch(
        /Due tomorrow at/
      );
    });

    it('should handle relative days (2-6 days)', () => {
      const now = new Date('2026-04-12T12:00:00Z');
      vi.setSystemTime(now);

      const in3Days = new Date('2026-04-15T12:00:00Z');
      expect(getTimeRemaining(in3Days.toISOString())).toBe('Due in 3 days');
    });

    it('should handle long term dates', () => {
      const now = new Date('2026-04-12T12:00:00Z');
      vi.setSystemTime(now);

      const nextYear = new Date('2027-04-12T12:00:00Z');
      expect(getTimeRemaining(nextYear.toISOString())).toBe('Due Apr 12, 2027');
    });

    it('should handle date-only strings as local time', () => {
      // Set system time to a known value (Start of day)
      const now = new Date(2026, 3, 12, 0, 0, 0); // April 12, 2026, 00:00:00 Local
      vi.setSystemTime(now);

      // "2026-04-13" should be parsed as April 13, 2026 Local
      // which is exactly tomorrow regardless of UTC offset
      expect(getTimeRemaining('2026-04-13')).toMatch(/Due tomorrow at/);

      // "2026-04-12" should be parsed as today (Exactly now)
      expect(getTimeRemaining('2026-04-12')).toBe('Due now');
    });

    it('should handle overdue scenarios', () => {
      const now = new Date('2026-04-12T12:00:00Z');
      vi.setSystemTime(now);

      // Overdue by 1 day (plurality test)
      const past1Day = new Date(now.getTime() - 1 * 86400000);
      expect(getTimeRemaining(past1Day.toISOString())).toBe('Overdue by 1 day');

      const past2Hours = new Date(now.getTime() - 2 * 3600000);
      expect(getTimeRemaining(past2Hours.toISOString())).toBe(
        'Overdue by 2 hours'
      );

      // Overdue by hours and minutes
      const past1Hour30Mins = new Date(
        now.getTime() - (1 * 3600000 + 30 * 60000)
      );
      expect(getTimeRemaining(past1Hour30Mins.toISOString())).toBe(
        'Overdue by 1 hour 30 minutes'
      );

      const past45Mins = new Date(now.getTime() - 45 * 60000);
      expect(getTimeRemaining(past45Mins.toISOString())).toBe(
        'Overdue by 45 minutes'
      );

      const past3Days = new Date(now.getTime() - 3 * 86400000);
      expect(getTimeRemaining(past3Days.toISOString())).toBe(
        'Overdue by 3 days'
      );

      // Edge case: just barely overdue
      const justPast = new Date(now.getTime() - 1000);
      expect(getTimeRemaining(justPast.toISOString())).toBe('Due now!');
    });
  });
});
