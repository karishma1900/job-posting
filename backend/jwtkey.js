// generateKey.js
const crypto = require('crypto');

// Generate a random 32-byte key
const key = crypto.randomBytes(32).toString('hex');
console.log(key);
