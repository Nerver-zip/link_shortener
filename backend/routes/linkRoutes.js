const express = require('express');
const router = express.Router();
const { shortenUrl, redirectToOriginalUrl } = require('../controllers/linkController');

router.post('/shorten', shortenUrl);

router.get('/:shortenedUrl', redirectToOriginalUrl);

module.exports = router;