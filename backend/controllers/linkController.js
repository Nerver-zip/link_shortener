const Link = require('../models/Link');
const generateHash = require('../utils/generateHash');

const shortenUrl = async (req, res) => {
  const { originalUrl } = req.body;

  if (!originalUrl || originalUrl.trim().length === 0) {
    return res.status(400).json({ error: 'URL é obrigatória' });
  }

  let shortenedUrl;
  let exists;

  try {
    do {
      shortenedUrl = generateHash(originalUrl);
      console.log(`Verificando se o hash ${shortenedUrl} já existe no banco de dados...`);
      exists = await Link.findOne({ shortenedUrl });
    } while (exists); 

    if (!shortenedUrl) {
      return res.status(500).json({ error: 'Erro ao gerar link encurtado' });
    }

    const newLink = new Link({ originalUrl, shortenedUrl });
    await newLink.save();

    return res.status(201).json({ shortenedUrl });
  } catch (error) {
    console.error('Erro ao criar link encurtado:', error);
    return res.status(500).json({ error: 'Erro interno ao criar link encurtado' });
  }
};

const redirectToOriginalUrl = async (shortenedUrl) => {
  try {
    const link = await Link.findOne({ shortenedUrl });

    if (!link) {
      throw new Error('Link não encontrado');
    }

    return link.originalUrl;
  } catch (error) {
    console.error('Erro ao buscar o link:', error);
    throw new Error('Erro ao buscar o link');
  }
};

module.exports = { shortenUrl, redirectToOriginalUrl };