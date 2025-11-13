const logger = {
  info: (label, data = '') => {
    if (process.env.NODE_ENV !== 'test') {
      console.log(`✓ [${label}]`, data);
    }
  },

  error: (label, error) => {
    console.error(`✗ [${label}]`, error);
  },

  warn: (label, message) => {
    console.warn(`⚠ [${label}]`, message);
  },

  debug: (label, data = '') => {
    if (process.env.DEBUG_MODE === 'true' && process.env.NODE_ENV !== 'test') {
      console.log(`🔍 [${label}]`, data);
    }
  }
};

module.exports = logger;
