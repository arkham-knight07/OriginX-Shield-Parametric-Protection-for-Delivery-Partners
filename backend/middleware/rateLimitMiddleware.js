const requestBucketsByKey = new Map();

function createInMemoryRateLimiter({
  windowMilliseconds = 60 * 1000,
  maxRequestsPerWindow = 60,
} = {}) {
  return function rateLimitMiddleware(request, response, next) {
    const clientKey = request.ip || request.connection.remoteAddress || 'unknown_client';
    const currentTimestamp = Date.now();
    const existingBucket = requestBucketsByKey.get(clientKey);

    if (!existingBucket || currentTimestamp - existingBucket.windowStart >= windowMilliseconds) {
      requestBucketsByKey.set(clientKey, {
        windowStart: currentTimestamp,
        requestCount: 1,
      });
      return next();
    }

    if (existingBucket.requestCount >= maxRequestsPerWindow) {
      return response.status(429).json({
        success: false,
        message: 'Too many requests. Please retry shortly.',
      });
    }

    existingBucket.requestCount += 1;
    return next();
  };
}

module.exports = {
  createInMemoryRateLimiter,
};
