const crypto = require('crypto');

function generateHash(originalUrl) {
    const timestamp = new Date().toISOString();
    const random = Math.random().toString(36).substring(2, 8);
    const base = originalUrl + timestamp + random;
  
    const hash = crypto.createHash('sha256').update(base).digest('hex').slice(0, 10);
  
    if (!hash || hash.trim().length === 0) {
      throw new Error('Hash inválido gerado');
    }
    return hash;
  }

module.exports = generateHash;