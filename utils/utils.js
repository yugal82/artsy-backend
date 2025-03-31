const { default: axios } = require('axios');

const ARTSY_BASE_URL = 'https://api.artsy.net/api/';

const sendResponse = (res, status, statusCode, message, error = null, data = null) => {
  if (data !== null) {
    return res.status(statusCode).json({
      status: status,
      message: message,
      data: data,
    });
  } else if (error !== null) {
    return res.status(statusCode).json({
      status: status,
      message: message,
      error: error.message,
    });
  }
};

// response = requests.post(f"https://api.artsy.net/api/tokens/xapp_token?client_id={CLIENT_ID}&client_secret={CLIENT_SECRET}")
const generateXAPPToken = async () => {
  try {
    // Updated: Check if a token exists and if it hasn't expired yet
    const currentToken = process.env.XAPP_TOKEN;
    const tokenExpiry = process.env.XAPP_TOKEN_EXPIRY;
    if (currentToken && tokenExpiry && Date.now() < Number(tokenExpiry)) {
      // Token is still valid, so return it
      return currentToken;
    }

    // Updated: Since there is no valid token, fetch a new one from Artsy's server
    const URL = `${ARTSY_BASE_URL}tokens/xapp_token?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}`;
    const res = await axios.post(URL);

    // Extract token from the response
    const newToken = res.data.token;

    // Set the token expiry to 7 days (in milliseconds) from now
    const expiryTime = Date.now() + 7 * 24 * 60 * 60 * 1000;

    // Updated: Store the new token and its expiry in environment variables
    process.env.XAPP_TOKEN = newToken;
    process.env.XAPP_TOKEN_EXPIRY = expiryTime.toString();

    return newToken;
  } catch (error) {
    throw new Error('The XAPP_TOKEN could not be fetched. Try again!');
  }
};

const fetchResponse = async (res, URL, message) => {
  const token = await generateXAPPToken();
  const headers = { 'X-Xapp-Token': token };
  const response = await axios.get(URL, { headers });
  return response.data;
};

// const cookieExtractor = (req) => {
//   let token = null;
//   if (req && req.cookies) token = req.cookies.jwt;
//   return token;
// };

module.exports = { sendResponse, fetchResponse, generateXAPPToken, ARTSY_BASE_URL };
