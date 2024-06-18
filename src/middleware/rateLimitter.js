// rateLimiter.js
const rateLimit = require('express-rate-limit');

// Define the rate limiter options
const limiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 5,
    standardHeaders: true,
    legacyHeaders: false, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again after some time.'
});

module.exports = limiter;