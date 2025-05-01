import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const ThumbnailContainer = styled.div`
  background-color: #eee;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  aspect-ratio: 16 / 9; // Mantener proporción
  position: relative;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);

  &:hover img {
    transform: scale(1.05);
  }
`;

const ThumbnailImage = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
`;

const ThumbnailTitle = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.7), transparent);
  color: white;
  padding: 16px 8px 8px 8px;
  font-size: 14px;
  font-weight: 500;
  text-align: center;
`;

// Placeholder simple
const Placeholder = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
  font-size: 12px;
`;

const SessionThumbnail = ({ session, onClick, thumbnailUrl: initialThumbnailUrl }) => {
  const [thumbnailUrl, setThumbnailUrl] = useState(initialThumbnailUrl || null);
  const [loading, setLoading] = useState(!initialThumbnailUrl); // No cargar si ya tenemos URL

  useEffect(() => {
    // Solo intentar buscar si NO nos pasaron una URL inicial
    if (!initialThumbnailUrl && session?.vimeoId) {
      setLoading(true);
      fetch(`https://vimeo.com/api/oembed.json?url=https://vimeo.com/${session.vimeoId}`)
        .then(res => {
          if (!res.ok) throw new Error('Network response was not ok');
          return res.json();
        })
        .then(data => {
          setThumbnailUrl(data.thumbnail_url_with_play_button || data.thumbnail_url);
          setLoading(false);
        })
        .catch(error => {
          console.error("Error fetching Vimeo thumbnail:", error);
          setLoading(false);
        });
    } else if (!initialThumbnailUrl) {
        // Si no hay URL inicial ni ID, dejar de cargar
        setLoading(false);
    }
    // Dependencia de la URL inicial y el ID
  }, [initialThumbnailUrl, session?.vimeoId]);

  return (
    <ThumbnailContainer onClick={onClick}>
      {loading ? (
        <Placeholder>Cargando...</Placeholder>
      ) : thumbnailUrl ? (
        <ThumbnailImage src={thumbnailUrl} alt={session?.title || 'Video Session'} />
      ) : (
        <Placeholder>Sin miniatura</Placeholder>
      )}
      <ThumbnailTitle>{session?.title || 'Sesión'}</ThumbnailTitle>
    </ThumbnailContainer>
  );
};

export default SessionThumbnail; 