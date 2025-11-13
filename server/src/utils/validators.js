const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePassword = (password) => {
  return (
    password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[0-9]/.test(password)
  );
};

const validateBugData = (bugData) => {
  const errors = {};

  if (!bugData.title || bugData.title.trim() === '') {
    errors.title = 'Title is required';
  }

  if (!bugData.description || bugData.description.trim() === '') {
    errors.description = 'Description is required';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors
  };
};

module.exports = {
  validateEmail,
  validatePassword,
  validateBugData
};
