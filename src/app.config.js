const { config } = require('dotenv');

function initConfig() {
  const envFile = process.env.NODE_ENV === 'development' ? '.env.development' : '.env';
  config({ path: envFile });
}

module.exports = { initConfig };
