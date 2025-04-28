const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const linkRoutes = require('./routes/linkRoutes');
const { redirectLink } = require('./controllers/linkController'); 

dotenv.config();

connectDB();

const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

app.use('/api/links', linkRoutes);

app.get('/:shortenedUrl', async (req, res) => {
  const { shortenedUrl } = req.params;
  try {
    const originalUrl = await redirectLink(shortenedUrl);
    if (originalUrl) {
      return res.redirect(originalUrl); 
    } else {
      console.log('Link não encontrado no banco de dados');
      return res.status(404).json({ message: 'Link não encontrado' });
    }
  } catch (error) {
    console.error('Erro ao buscar o link:', error);
    res.status(500).json({ message: 'Erro ao redirecionar para o link original' });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
