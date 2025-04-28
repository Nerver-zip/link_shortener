const Link = require('../models/Link');

const shortenUrl = async (originalUrl) => {
  const shortened = 'shortened_' + Date.now(); 
  const link = new Link({ originalUrl, shortenedUrl: shortened });

  try {
    const savedLink = await link.save(); 
    console.log('Link salvo no banco de dados:', savedLink);  
    return shortened;  // Retorna a URL encurtada
  } catch (error) {
    console.error('Erro ao salvar o link:', error); 
    throw error;
  }
};

const redirectLink = async (shortenedUrl) => {
  console.log(`Buscando no banco de dados o link encurtado: ${shortenedUrl}`); 
  try {
    const link = await Link.findOne({ shortenedUrl }); 
    if (!link) {
      console.log('Link não encontrado no banco de dados');
      return null;  
    }
    console.log(`Link encontrado! Original URL: ${link.originalUrl}`); 
    return link.originalUrl; 
  } catch (error) {
    console.error('Erro ao buscar o link:', error);
    throw error;  
  }
};

module.exports = { shortenUrl, redirectLink };
