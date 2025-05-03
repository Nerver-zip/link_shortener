import React, { useState } from 'react';
import axios from 'axios';
import '../App.css'; 

const LinkForm = () => {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortenedUrl, setShortenedUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/links/shorten', { originalUrl });
      const { shortenedUrl } = response.data;
      setShortenedUrl(shortenedUrl);
    } catch (error) {
      console.error('Erro ao criar link encurtado:', error);
    }
  };

  const copyToClipboard = () => {
    const shortenedLink = `http://localhost:5000/${shortenedUrl}`;
    navigator.clipboard.writeText(shortenedLink)
      .then(() => {
        alert('Link copiado para a área de transferência!');
      })
      .catch((error) => {
        console.error('Erro ao copiar o link', error);
      });
  };

  return (
    <div className="form-container">
      <h1>Encurte seu link</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="url"
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
          placeholder="Cole seu link aqui"
          required
        />
        <button type="submit">Encurtar</button>
      </form>

      {shortenedUrl && (
        <div className="shortened-link fade-in" key={shortenedUrl}>
          <p>Link encurtado!</p>
          <button onClick={copyToClipboard}>Copiar</button>
        </div>
      )}
    </div>
  );
};

export default LinkForm;
