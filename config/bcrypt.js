const bcrypt = require('bcrypt');

const SaltRounds = 10;

async function hashPassword(password) {
  try {
    const hashedPassword = await bcrypt.hash(password, SaltRounds);
    return hashedPassword;
  } catch (err) {
    throw err;
  }
}

async function comparePasswords(plainPassword, hashedPassword) {
  try {
    const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
    return isMatch;
  } catch (err) {
    throw err;
  }
}

module.exports = { hashPassword, comparePasswords };
