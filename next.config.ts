require('dotenv').config();

module.exports = {
  env: {
    // Reference a variable that was defined in the .env file and make it available at Build Time
    AUTH_0_DOMAIN: process.env.AUTH_0_DOMAIN,
    AUTH_0_CLIENT_ID: process.env.AUTH_0_CLIENT_ID,
    AUTH_0_REDIRECT_URI: process.env.AUTH_0_REDIRECT_URI,
    AUTH_0_AUDIENCE: process.env.AUTH_0_AUDIENCE,
    AUTH_0_RESPONSE_TYPE: process.env.AUTH_0_RESPONSE_TYPE,
  },
};
