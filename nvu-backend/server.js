// Cargar variables de entorno desde .env
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const axios = require('axios'); // Aunque no lo usemos aún, lo dejamos por si acaso

const app = express();
const PORT = process.env.PORT || 4000; // Usar puerto de .env o 4000

// --- Middlewares ---
// Habilitar CORS (ajustar origin en producción)
app.use(cors()); 

// Middleware para parsear JSON (si se necesita para futuras rutas POST)
app.use(express.json());

// --- Rutas ---

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('Backend NVU reestructurado funcionando!');
});

// Endpoint para sesiones de Vimeo
app.get('/api/vimeo-sessions', async (req, res) => {
  console.log('Recibida petición a /api/vimeo-sessions');
  const { userId, folderId } = req.query;
  const VIMEO_TOKEN = process.env.VIMEO_ACCESS_TOKEN; // Leer token desde .env

  console.log(`Query params: userId=${userId}, folderId=${folderId}`);
  console.log(`Vimeo Token Present: ${VIMEO_TOKEN ? 'Yes' : 'No'}`);

  if (!userId || !folderId) {
    console.error('Error: Faltan parámetros userId o folderId en la query.');
    return res.status(400).json({ error: 'Faltan parámetros userId o folderId.' });
  }

  if (!VIMEO_TOKEN) {
    console.error('Error: Falta la variable de entorno VIMEO_ACCESS_TOKEN.');
    return res.status(500).json({ error: 'Error de configuración del servidor: Falta el token de acceso de Vimeo.' });
  }

  // Especificar los campos deseados para optimizar la respuesta
  const fields = 'uri,name,description,duration,pictures.sizes,link';
  const vimeoApiUrl = `https://api.vimeo.com/users/${userId}/projects/${folderId}/videos?fields=${fields}&per_page=50`; // Aumentar per_page si es necesario

  console.log(`Contactando API Vimeo: ${vimeoApiUrl}`);

  try {
    const response = await axios.get(vimeoApiUrl, {
      headers: { 'Authorization': `Bearer ${VIMEO_TOKEN}` }
    });

    // Formatear la respuesta para el frontend
    const sessions = response.data.data.map(video => {
        const videoId = video.uri.split('/').pop(); // Extraer ID del URI (e.g., /videos/12345 -> 12345)
        // Buscar una miniatura adecuada (ej. 300px o más), o usar la base_link si no se encuentra
        const thumbnail = video.pictures?.sizes?.find(size => size.width >= 300)?.link || video.pictures?.base_link;
        return {
            id: videoId, // Usar ID extraído
            vimeoId: videoId, // El frontend parece usar esto para el player
            title: video.name || 'Video sin título',
            description: video.description || '',
            duration: video.duration,
            thumbnailUrl: thumbnail || '' // Asegurar que siempre haya un valor
        };
    });

    console.log(`Enviando ${sessions.length} sesiones al frontend.`);
    res.json(sessions);

  } catch (error) {
    console.error('Error fetching Vimeo data:', error.response ? JSON.stringify(error.response.data, null, 2) : error.message);
    res.status(error.response?.status || 500).json({ 
        error: 'Error al contactar con la API de Vimeo', 
        details: error.response?.data || error.message 
    });
  }
});

// --- Iniciar Servidor ---
app.listen(PORT, () => {
  console.log(`Backend NVU escuchando en http://localhost:${PORT}`);
}); 