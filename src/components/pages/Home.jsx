import React, { useState } from 'react';
import styled from 'styled-components';
// import { FaBitcoin, FaEthereum } from 'react-icons/fa'; // Ya no se usan aquí
import TradingViewWidget from '../widgets/TradingViewWidget'; // Importar el nuevo widget
import { useTranslation } from 'react-i18next'; // Importar hook
import { Link } from 'react-router-dom'; // Asegurar que Link esté importado
import educatorsData from '../../data/educatorsData'; // Importar datos reales
import { FaWifi, FaUserClock } from 'react-icons/fa'; // Importar iconos de estado

// --- Helper para obtener los primeros N educadores (REINTRODUCIDO) ---
const getFirstNEducators = (data, n) => {
  const allEducators = [];
  if (!data || typeof data !== 'object') {
      console.error("[getFirstNEducators] educatorsData no es un objeto válido:", data);
      return []; 
  }
  for (const category in data) {
    if (Object.prototype.hasOwnProperty.call(data, category)) {
        if (Array.isArray(data[category])) {
           allEducators.push(...data[category]);
        } else {
            console.warn(`[getFirstNEducators] La categoría "${category}" no es un array.`);
        }
    }
  }
  // Verificar si allEducators es un array antes de slice
  if (!Array.isArray(allEducators)) {
      console.error("[getFirstNEducators] Error interno, allEducators no es un array.", allEducators);
      return [];
  }
  return allEducators.slice(0, n);
};

// --- Styled Components --- (Podrías moverlos a archivos separados si crecen mucho)

const PageContainer = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  @media (max-width: 768px) {
    padding: 16px;
    gap: 20px;
  }
`;

// Simplificar media query para TopRowContainer
const TopRowContainer = styled.div`
  display: flex;
  gap: 24px;
  align-items: stretch;
  @media (max-width: 768px) { // Solo un breakpoint principal
    flex-direction: column;
    gap: 20px;
  }
`;

const Banner = styled.div`
  background: ${props => props.bgColor || 'linear-gradient(to right, #007bff, #0056b3)'};
  color: white;
  padding: 30px;
  border-radius: 10px;
  text-align: center;
  background-size: cover;
  background-position: center;
  background-image: url('${props => props.imageUrl}');
  min-height: 450px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  flex: 1;
  
  @media (max-width: 768px) { // Solo un breakpoint principal
    min-height: 250px; 
    padding: 20px;
  }
  h1 {
    margin: 0;
    font-size: 4rem;
    text-shadow: 1px 1px 3px rgba(0,0,0,0.3);
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 2.5rem; // Fuente más pequeña en móvil
    }
  }
`;

const Section = styled.section`
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  min-width: 0;
  overflow: hidden;
  @media (max-width: 768px) {
    padding: 16px;
  }
`;

const SectionTitle = styled.h2`
  font-size: 20px;
  margin-bottom: 16px;
  color: #333;
  display: flex;
  justify-content: space-between;
  align-items: center;
  a {
    font-size: 14px;
    color: #007bff;
    text-decoration: none;
    &:hover { text-decoration: underline; }
  }
  @media (max-width: 768px) {
    font-size: 18px;
    margin-bottom: 12px;
    a { font-size: 13px; }
  }
`;

// Simplificar media query para GridContainer
const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 20px;

  @media (max-width: 768px) { // Solo un breakpoint principal
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 16px;
  }
  @media (max-width: 480px) {
    grid-template-columns: 1fr; // Mantener este para muy pequeños
  }
`;

// Volver a flex para el scroll horizontal
const TopEducatorsContainer = styled.div`
  display: flex;
  gap: 20px;
  overflow-x: auto;
  flex-wrap: nowrap;
  padding-bottom: 15px;
  width: 100%;

  /* Estilos de scrollbar opcionales */
  &::-webkit-scrollbar {
    height: 8px; 
  }
  &::-webkit-scrollbar-thumb {
    background: #ccc; 
    border-radius: 4px;
  }
`;

const TopEducatorAvatar = styled.div` 
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  flex-shrink: 0;
  min-width: 80px;

  img {
    width: 65px;
    height: 65px;
    border-radius: 50%;
    margin-bottom: 6px;
    object-fit: cover;
    border: 2px solid #eee;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  }
  span {
    font-size: 12px;
    color: #333;
    font-weight: 500;
    white-space: nowrap;
  }
`;

const CategoryFilters = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px; // Menos gap
  margin-bottom: 16px;
`;

const CategoryButton = styled.button`
  padding: 7px 14px;
  border-radius: 20px;
  border: 1px solid ${props => props.active ? 'transparent' : '#ddd'};
  background-color: ${props => props.active ? '#333' : 'white'};
  color: ${props => props.active ? 'white' : '#333'};
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s ease;
  &:hover {
    background-color: ${props => props.active ? '#555' : '#f0f0f0'};
  }
`;

const EducatorCard = styled(Link)` 
  text-decoration: none;
  color: inherit;
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.08);
  position: relative; 
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.12);
  }
`;

const EducatorImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
  display: block;
`;

const EducatorCardInfo = styled.div`
  padding: 12px;
  flex-grow: 1;
`;

const EducatorCardName = styled.h3`
  font-size: 15px;
  font-weight: 600;
  margin: 0 0 4px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const EducatorCardTitle = styled.p`
  font-size: 12px;
  color: #666;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const StatusBadge = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 3px 7px;
  border-radius: 12px;
  font-size: 10px;
  font-weight: 500;
  color: white;
  background-color: ${props => props.live ? '#dc3545' : '#6c757d'}; 
  z-index: 1;
  
  svg {
      font-size: 11px;
  }
`;

const ViewMoreButton = styled(Link)`
  display: block;
  width: max-content;
  margin: 0 auto; 
  padding: 10px 25px;
  background-color: #343a40; 
  color: white;
  border: none;
  border-radius: 20px;
  font-weight: 500;
  text-decoration: none;
  text-align: center;
  transition: background-color 0.2s ease;

  &:hover {
      background-color: #23272b;
  }
`;

// --- Componentes para la nueva sección de educadores preview ---

const EducatorsPreviewGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr); 
  gap: 20px;
  margin-bottom: 24px; 

  @media (max-width: 1200px) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media (max-width: 992px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

// --- Componente Home --- 

const Home = () => {
  const { t } = useTranslation();

  // --- DATOS Y LOGS --- 
  console.log("Home Component Rendered");
  console.log("Datos Educadores Importados:", educatorsData);
  
  const topEducators = getFirstNEducators(educatorsData, 5);
  const previewEducators = getFirstNEducators(educatorsData, 5);
  
  console.log("Top Educators Derivados:", topEducators);
  console.log("Preview Educators Derivados:", previewEducators);
  // --- FIN DATOS Y LOGS ---

  return (
    <PageContainer>
      {/* Fila Superior */}
      <TopRowContainer>
        <Banner imageUrl="/images/portada.png" />
        <TradingViewWidget />
      </TopRowContainer>

      {/* Sección Educadores Top */}
      <Section>
        <SectionTitle>
          {t('home.topEducators')}
          <Link to="/educadores">{t('home.viewAll')} {'>'}</Link> 
        </SectionTitle>
        <TopEducatorsContainer>
          {Array.isArray(topEducators) && topEducators.length > 0 ? (
            topEducators.map((edu, index) => {
              // Comprobación adicional por si acaso
              if (!edu || typeof edu !== 'object') {
                  console.warn(`Elemento inválido en topEducators en índice ${index}:`, edu);
                  return null; // No renderizar este elemento
              }
              return (
                <TopEducatorAvatar key={edu.id || `top-edu-${index}`}> 
                  <img 
                    src={edu.profileImageFilename ? `/images/perfil/${edu.profileImageFilename}` : '/images/placeholder.jpg'} 
                    alt={edu.name || t('common.nameNotAvailable')}
                    onError={(e) => { e.target.onerror = null; e.target.src='/images/placeholder.jpg'; }}
                  />
                  <span>{edu.name || t('common.nameNotAvailable')}</span>
                </TopEducatorAvatar>
              );
            })
          ) : (
            <p>{t('home.noTopEducators')}</p> 
          )}
        </TopEducatorsContainer>
      </Section>

      {/* Banner ESPAÑOL */}
      <Banner 
        imageUrl="/images/23-May-_-Espanol-2048x462.webp" 
        style={{ minHeight: '304px' }}
      />

      {/* Sección Educadores Preview */}
      <Section>
        <SectionTitle>
          {t('home.ourEducators')} 
          <Link to="/educadores">{t('home.viewAll')} {'>'}</Link> 
        </SectionTitle>
        
        <EducatorsPreviewGrid>
            {Array.isArray(previewEducators) && previewEducators.length > 0 ? (
                previewEducators.map((edu, index) => {
                    if (!edu || typeof edu !== 'object') {
                        console.warn(`Elemento inválido en previewEducators en índice ${index}:`, edu);
                        return null;
                    }
                    return (
                        <EducatorCard key={edu.id || `prev-edu-${index}`} to={`/educadores/${edu.id}`}> 
                            <EducatorImage 
                                src={edu.profileImageFilename ? `/images/perfil/${edu.profileImageFilename}` : '/images/placeholder.jpg'} 
                                alt={edu.name || t('common.nameNotAvailable')} 
                                onError={(e) => { e.target.onerror = null; e.target.src='/images/placeholder.jpg'; }}
                            />
                            <EducatorCardInfo>
                                <EducatorCardName>{edu.name || t('common.nameNotAvailable')}</EducatorCardName>
                                <EducatorCardTitle>{edu.title || t('common.specialist')}</EducatorCardTitle>
                            </EducatorCardInfo>
                        </EducatorCard>
                    );
                 })
            ) : (
                 <p>{t('home.noEducatorsPreview')}</p> 
            )}
        </EducatorsPreviewGrid>

        <ViewMoreButton to="/educadores">
            Ver más
        </ViewMoreButton>
      </Section>
      
      {/* Banner TELEGRAM */}
       <Banner 
         imageUrl="/images/telegram.png" 
         style={{ minHeight: '234px' }}
      />

    </PageContainer>
  );
};

export default Home;