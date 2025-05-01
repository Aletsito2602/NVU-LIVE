import React from 'react';
import styled from 'styled-components';
import { useParams, Link } from 'react-router-dom';
import educatorsData from '../../../data/educatorsData'; // Ajustar ruta relativa
import { FaArrowLeft, FaInstagram, FaLinkedin, FaFacebookF, FaUserClock, FaWifi } from 'react-icons/fa';
import { useTranslation } from 'react-i18next'; // Importar hook

// --- Styled Components (Restaurados) --- 

const EducatorDetailContainer = styled.div`
  /* Estilos del contenedor si son necesarios */
  padding-bottom: 30px; 
`;

const BackLinkContainer = styled.div`
  padding: 0 24px 16px 24px; // Añadir padding lateral
  margin-bottom: 16px;
  border-bottom: 1px solid #e9ecef;
`;

const BackLink = styled(Link)`
    display: inline-flex;
    align-items: center;
    gap: 8px;
    color: #666;
    text-decoration: none;
    font-size: 14px;
    &:hover { color: #333; }
`;

const ContentWrapper = styled.div`
    padding: 0 24px; // Padding lateral para stream, link y bio
`;

const StreamArea = styled.div`
  position: relative;
  padding-bottom: 56.25%; // 16:9
  height: 0;
  overflow: hidden;
  background-color: #000;
  border-radius: 8px;
  margin-bottom: 24px; // Espacio antes del link a favoritas

  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

const InfoSection = styled.div`
    background-color: white;
    padding: 24px;
    margin-top: 24px; 
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
`;
const EducatorName = styled.h1`
    font-size: 24px;
    margin: 0 0 8px 0; 
`;
const EducatorTitle = styled.p`
    font-size: 16px;
    color: #666;
    margin: 0; 
`;

// Link/Banner para Sesiones Favoritas
const FavoritesLink = styled(Link)`
  display: block;
  margin-bottom: 24px; // Espacio antes de la bio
  padding: 30px 20px;
  background: linear-gradient(to right, #0052D4, #4364F7, #6FB1FC); // Gradiente azul
  color: white;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 4px 10px rgba(0, 82, 212, 0.3);
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    opacity: 0.9;
    box-shadow: 0 6px 15px rgba(0, 82, 212, 0.4);
    transform: translateY(-2px);
  }
`;

const FavoritesTitle = styled.h2`
  font-size: 22px;
  margin: 0;
  font-weight: 600;
`;

// ProfileSection y sus componentes (adaptados de EducatorSessions)
const ProfileSection = styled.div`
  display: flex;
  gap: 24px;
  background-color: white;
  border-radius: 10px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
`;

const SocialLinksColumn = styled.div`
  flex: 0 0 auto; 
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  background-color: #f8f9fa; 
  padding: 20px 15px;
  border-radius: 8px;
`;

const SocialIconLink = styled.a`
  color: #6c757d; 
  font-size: 20px;
  transition: color 0.2s ease;

  &:hover {
    color: #007bff; 
  }
`;

const BioColumn = styled.div`
  flex: 1; 
`;

const BioHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  gap: 12px;
`;

// Renombrar StatusBadge a LanguageBadge y estilo actualizado
const LanguageBadge = styled.div`
  display: inline-flex; 
  align-items: center;
  gap: 5px;
  padding: 5px 10px; // Ajustado padding
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600; // Estilo igual a EducatorCard
  color: #555; // Estilo igual a EducatorCard
  background-color: #f0f0f0; // Estilo igual a EducatorCard
  border: 1px solid #ddd; // Estilo igual a EducatorCard
  text-transform: uppercase; // Estilo igual a EducatorCard
`;

const BioText = styled.p`
  font-size: 14px;
  color: #555;
  line-height: 1.6;
  margin: 0;
  white-space: pre-wrap; // Para respetar saltos de línea de los datos
`;

// --- Componente --- 

const findEducatorById = (id) => {
  for (const category in educatorsData) {
    const educator = educatorsData[category].find(edu => edu.id === id);
    if (educator) return educator;
  }
  return null;
};

const EducatorDetail = () => {
  const { educatorId } = useParams();
  const { t } = useTranslation();
  const educator = findEducatorById(educatorId);

  if (!educator) {
    return (
        <div> 
            <BackLinkContainer>
                 {/* Texto traducido */}
                 <BackLink to="/educadores"><FaArrowLeft /> {t('educatorDetail.back')}</BackLink>
             </BackLinkContainer>
             <ContentWrapper>
                {/* Texto traducido */}
                <p>{t('educatorDetail.notFound')}</p>
             </ContentWrapper>
        </div>
    );
  }

  const liveEmbedSrc = educator.vimeoLiveEmbed || 'https://player.vimeo.com/video/821637631'; // Fallback
  const bioKey = `educatorsBio.${educator.id}`; 

  return (
    <EducatorDetailContainer> 
       <BackLinkContainer>
            {/* Texto traducido */}
            <BackLink to="/educadores">
                <FaArrowLeft /> {t('educatorDetail.back')}
            </BackLink>
        </BackLinkContainer>
        
        <ContentWrapper> 
            {/* Área del Stream */}
            <StreamArea>
              {educator.vimeoLiveEmbed ? (
                <iframe 
                    src={liveEmbedSrc}
                    frameBorder="0"
                    allow="autoplay; fullscreen; picture-in-picture" 
                    allowFullScreen
                    title={`${t('educatorDetail.liveStreamTitle')} ${educator.name}`}>
                </iframe>
              ) : (
                <div style={{ color: 'white', textAlign: 'center', paddingTop: '20%' }}>
                  {/* Texto traducido */}
                  {t('educatorDetail.streamNotAvailable')}
                </div>
              )}
            </StreamArea>

            {/* Enlace a Sesiones Favoritas */}
            <FavoritesLink to={`/educadores/${educatorId}/sesiones`}>
                {/* Texto traducido */}
                <FavoritesTitle>{t('educatorDetail.favoriteSessions')}</FavoritesTitle>
            </FavoritesLink>
            
            {/* Sección de Biografía y Redes Sociales */}
             <ProfileSection>
                <SocialLinksColumn>
                    {educator.socialLinks?.instagram && educator.socialLinks.instagram !== '#' && (
                        <SocialIconLink href={educator.socialLinks.instagram} target="_blank" rel="noopener noreferrer">
                            <FaInstagram />
                        </SocialIconLink>
                    )}
                    {educator.socialLinks?.linkedin && educator.socialLinks.linkedin !== '#' && (
                        <SocialIconLink href={educator.socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
                            <FaLinkedin />
                        </SocialIconLink>
                    )}
                    {educator.socialLinks?.facebook && educator.socialLinks.facebook !== '#' && (
                        <SocialIconLink href={educator.socialLinks.facebook} target="_blank" rel="noopener noreferrer">
                            <FaFacebookF />
                        </SocialIconLink>
                    )}
                    {/* Añadir condicional por si no hay ningún link */}
                    {(!educator.socialLinks || 
                      (educator.socialLinks.instagram === '#' && educator.socialLinks.linkedin === '#' && educator.socialLinks.facebook === '#')) &&
                       <span style={{fontSize: '12px', color: '#6c757d'}}>N/A</span> }
                </SocialLinksColumn>
                <BioColumn>
                    <BioHeader>
                        <EducatorName>{educator.name}</EducatorName>
                        {/* Usar LanguageBadge */}
                        <LanguageBadge>
                            {/* Mostrar idioma */}
                            {educator.language || 'N/A'}
                        </LanguageBadge>
                    </BioHeader>
                    <BioText>{t(bioKey, educator.description || t('common.bioNotAvailable'))}</BioText>
                </BioColumn>
             </ProfileSection>
        </ContentWrapper>
    </EducatorDetailContainer>
  );
};

export default EducatorDetail; 