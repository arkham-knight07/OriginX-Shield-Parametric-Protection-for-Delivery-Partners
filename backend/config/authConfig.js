'use strict';

let hasLoggedJwtFallbackWarning = false;

function getJwtSecret() {
  if (process.env.JWT_SECRET_KEY) {
    return process.env.JWT_SECRET_KEY;
  }

  if (process.env.NODE_ENV === 'production') {
    return null;
  }

  if (!hasLoggedJwtFallbackWarning) {
    hasLoggedJwtFallbackWarning = true;
    console.warn('JWT_SECRET_KEY is not configured. Using insecure development fallback secret.');
  }

  return 'raksharide-dev-insecure-jwt-secret';
}

module.exports = {
  getJwtSecret,
};
