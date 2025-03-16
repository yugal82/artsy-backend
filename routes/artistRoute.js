const express = require('express');
const {
  getArtist,
  getArtistDetails,
  getSimilarArtists,
  getArtistArtworks,
  getArtworkGenes,
} = require('../controllers/artistController');

const router = express.Router();

router.get('/search', getArtist);
router.get('/search/:id', getArtistDetails);
router.get('/similar-artist/:id', getSimilarArtists);
router.get('/artwork/:id', getArtistArtworks);
router.get('/genes/:id', getArtworkGenes);

module.exports = router;
