const express = require('express');
const { shortenUrl } = require('../controllers/linkController');
const { redirectLink } = require('../controllers/linkController');

const router = express.Router();

router.post('/shorten', async (req, res) => {
  const { originalUrl } = req.body;
  try {
    const shortenedUrl = await shortenUrl(originalUrl);
    res.status(201).json({ shortenedUrl: shortenedUrl });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar o link encurtado' });
  }
});

router.get('/api/links/:shortenedUrl', async (req, res) => {
  const { shortenedUrl } = req.params;
  try {
    const originalUrl = await redirectLink(shortenedUrl);
    if (originalUrl) {
      return res.redirect(originalUrl);  // Redireciona para a URL original
    } else {
      console.log('Link não encontrado no banco de dados');
      return res.status(404).json({ message: 'Link não encontrado' });
    }
  } catch (error) {
    console.error('Erro ao buscar o link:', error);
    res.status(500).json({ message: 'Erro ao redirecionar para o link original' });
  }
});

module.exports = router;
