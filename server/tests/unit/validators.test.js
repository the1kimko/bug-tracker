const { validateEmail, validatePassword, validateBugData } = require('../../src/utils/validators');

describe('Server Validators', () => {
  describe('validateEmail', () => {
    it('should accept valid email addresses', () => {
      const validEmails = [
        'user@example.com',
        'test.user@company.co.uk',
        'user+tag@example.com'
      ];

      validEmails.forEach(email => {
        expect(validateEmail(email)).toBe(true);
      });
    });

    it('should reject invalid email addresses', () => {
      const invalidEmails = [
        'invalid.email',
        '@example.com',
        'user@',
        'user space@example.com'
      ];

      invalidEmails.forEach(email => {
        expect(validateEmail(email)).toBe(false);
      });
    });
  });

  describe('validatePassword', () => {
    it('should reject passwords shorter than 8 characters', () => {
      expect(validatePassword('short')).toBe(false);
    });

    it('should require at least one uppercase letter', () => {
      expect(validatePassword('lowercase123')).toBe(false);
    });

    it('should require at least one number', () => {
      expect(validatePassword('NoNumbers')).toBe(false);
    });

    it('should accept valid passwords', () => {
      expect(validatePassword('ValidPass123')).toBe(true);
    });
  });

  describe('validateBugData', () => {
    it('should require title', () => {
      const bugData = { description: 'Test' };
      expect(validateBugData(bugData)).toEqual({
        valid: false,
        errors: { title: 'Title is required' }
      });
    });

    it('should require description', () => {
      const bugData = { title: 'Test' };
      expect(validateBugData(bugData)).toEqual({
        valid: false,
        errors: { description: 'Description is required' }
      });
    });

    it('should accept valid bug data', () => {
      const bugData = {
        title: 'Test Bug',
        description: 'Test Description',
        priority: 'high'
      };
      expect(validateBugData(bugData)).toEqual({ valid: true, errors: {} });
    });
  });
});
