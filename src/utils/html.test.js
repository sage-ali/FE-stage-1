import { describe, it, expect } from 'vitest';
import { escapeHTML, makeSafeId } from './html.js';

describe('html utils', () => {
  describe('escapeHTML', () => {
    it('should escape special characters', () => {
      const result = escapeHTML('<script>alert("xss")</script>');
      // Use hex codes to prevent aggressive formatter from unescaping
      expect(result).toBe(
        '\x26lt;script\x26gt;alert(\x26quot;xss\x26quot;)\x26lt;/script\x26gt;'
      );

      const result2 = escapeHTML("' &");
      expect(result2).toBe('\x26#039; \x26amp;');
    });

    it('should handle null and undefined', () => {
      expect(escapeHTML(null)).toBe('');
      expect(escapeHTML(undefined)).toBe('');
    });

    it('should handle numbers', () => {
      expect(escapeHTML(123)).toBe('123');
    });
  });

  describe('makeSafeId', () => {
    it('should replace non-alphanumeric characters with hyphens', () => {
      expect(makeSafeId('hello world')).toBe('hello-world');
      expect(makeSafeId('Tag @ 123')).toBe('Tag---123');
    });

    it('should keep existing hyphens and underscores', () => {
      expect(makeSafeId('safe_id-123')).toBe('safe_id-123');
    });

    it('should handle null and generate a sequential id', () => {
      const id1 = makeSafeId(null);
      const id2 = makeSafeId(undefined);
      expect(id1).toMatch(/^safe-id-\d+$/);
      expect(id2).toMatch(/^safe-id-\d+$/);
      expect(id1).not.toBe(id2);
    });
  });
});
