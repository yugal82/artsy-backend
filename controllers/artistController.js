// const redis = require('redis');
// const axios = require('axios');
// const client = redis.createClient({ url: process.env.REDIS_URL });
// client.connect(); // Remember to handle connection errors

// const generateXAPPToken = async () => {
//   try {
//     // Try fetching the token from Redis
//     let token = await client.get('xapp_token');
//     if (token) {
//       return token;
//     }

//     // If no valid token is found, fetch a new one from the Artsy server
//     const URL = `${ARTSY_BASE_URL}tokens/xapp_token?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}`;
//     const res = await axios.post(URL);
//     token = res.data.token;

//     // Store the new token with a TTL of 7 days
//     await client.set('xapp_token', token, { EX: 7 * 24 * 60 * 60 });

//     return token;
//   } catch (error) {
//     throw new Error('The XAPP_TOKEN could not be fetched. Try again!');
//   }
// };

const { sendResponse, ARTSY_BASE_URL, fetchResponse } = require('../utils/utils');

const getArtist = async (req, res) => {
  try {
    // https://api.artsy.net/api/search?q=picasso&size=10
    const URL = `${ARTSY_BASE_URL}search?q=${req.query?.q}&size=10`;

    const response = await fetchResponse(res, URL, 'Artist fetched successfully');
    const data = response._embedded.results;
    sendResponse(res, 'Success', 200, 'Successfully fetched artists', null, data);
  } catch (error) {
    sendResponse(res, 'Falied', 400, 'Failed to get artist', error, null);
  }
};

const getArtistDetails = async (req, res) => {
  try {
    // https://api.artsy.net/api/artists/4d8b928b4eb68a1b2c0001f2
    const URL = `${ARTSY_BASE_URL}artists/${req.params?.id}`;
    const response = await fetchResponse(res, URL, 'Artist details fetched successfully');
    sendResponse(res, 'Success', 200, 'Successfully fetched artists details', null, response);
  } catch (error) {
    sendResponse(res, 'Failed', 400, 'Failed to get artist details', error, null);
  }
};

const getSimilarArtists = async (req, res) => {
  try {
    // https://api.artsy.net/api/artists?similar_to_artist_id=4d8b928b4eb68a1b2c0001f2
    const URL = `${ARTSY_BASE_URL}artists?similar_to_artist_id=${req.params?.id}`;
    const response = await fetchResponse(res, URL, 'Similar artists fetched successfully');
    const data = response._embedded.artists;
    sendResponse(res, 'Success', 200, 'Successfully fetched similar artists', null, data);
  } catch (error) {
    sendResponse(res, 'Failed', 400, 'Failed to get similar artists', error, null);
  }
};

const getArtistArtworks = async (req, res) => {
  try {
    // https://api.artsy.net/api/artworks?artist_id=4d8b928b4eb68a1b2c0001f2&size=10
    const URL = `${ARTSY_BASE_URL}artworks?artist_id=${req.params?.id}&size=10`;
    const response = await fetchResponse(res, URL, 'Artworks fetched successfully');
    const data = response._embedded.artworks;
    sendResponse(res, 'Success', 200, 'Successfully fetched Artworks', null, data);
  } catch (error) {
    sendResponse(res, 'Failed', 400, 'Failed to get artworks', error, null);
  }
};

const getArtworkGenes = async (req, res) => {
  try {
    // https://api.artsy.net/api/genes?artwork_id=515b0f9338ad2d78ca000554
    const URL = `${ARTSY_BASE_URL}genes?artwork_id=${req.params?.id}`;
    const response = await fetchResponse(res, URL, 'Artwork genes fetched successfully');
    const data = response._embedded.genes;
    sendResponse(res, 'Success', 200, 'Successfully fetched Categories', null, data);
  } catch (error) {
    sendResponse(res, 'Failed', 400, 'Failed to get artwork genes', error, null);
  }
};

module.exports = {
  getArtist,
  getArtistDetails,
  getSimilarArtists,
  getArtistArtworks,
  getArtworkGenes,
};
