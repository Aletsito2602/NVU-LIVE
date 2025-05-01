import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';

const languageConfig = {
    es: { name: 'Español', educatorId: 'abi-belilty', folderId: '23622182' },
    en: { name: 'Inglés', educatorId: 'richard-p-fx', folderId: '23621754' },
    fr: { name: 'Francés', educatorId: 'jeff-beausoleil', folderId: '23621558' },
};
const VIMEO_USER_ID = "221550365";

const PageContainer = styled.div`
  padding: 24px;
  background-color: #f8f9fa;
`;

const PageTitle = styled.h1`
  font-size: 28px;
  margin-bottom: 24px;
  color: #333;
  font-weight: 600;
`;

const LanguageFilters = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 32px;
`;

const FilterButton = styled.button`
  padding: 8px 20px;
  border-radius: 20px;
  border: 1px solid transparent;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease;

  background-color: ${props => props.active ? '#343a40' : '#e9ecef'};
  color: ${props => props.active ? 'white' : '#6c757d'};
  border-color: ${props => props.active ? '#343a40' : '#dee2e6'};

  &:hover {
    background-color: ${props => props.active ? '#23272b' : '#ced4da'};
    border-color: ${props => props.active ? '#23272b' : '#adb5bd'};
    color: ${props => props.active ? 'white' : '#495057'};
  }
`;

const SessionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
`;

const SessionCard = styled.div`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  transition: transform 0.2s, box-shadow 0.2s;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.09);
  }
`;

const ThumbnailContainer = styled.div`
  position: relative;
  height: 160px;
`;

const ThumbnailImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const CardBody = styled.div`
  padding: 16px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const SessionTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  margin: 0;
  color: #333;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;  
  overflow: hidden;
  text-overflow: ellipsis;
  min-height: 48px;
`;

const LoadingMessage = styled.p` color: #666; text-align: center; padding: 20px; `;
const ErrorMessage = styled.p` color: red; text-align: center; padding: 20px; `;
const NoDataMessage = styled.p` color: #666; text-align: center; padding: 20px; `;

const Academy = () => {
    const [activeLanguage, setActiveLanguage] = useState('es');
    const [sessions, setSessions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedVimeoId, setSelectedVimeoId] = useState(null);

    const currentLanguageConfig = languageConfig[activeLanguage];

    useEffect(() => {
        if (!currentLanguageConfig) return;

        const fetchAcademySessions = async () => {
            setLoading(true);
            setError(null);
            setSelectedVimeoId(null);
            setSessions([]);

            const folderId = currentLanguageConfig.folderId;
            const backendUrl = `http://localhost:4000/api/vimeo-sessions?userId=${VIMEO_USER_ID}&folderId=${folderId}`;

            try {
                console.log(`Fetching academy sessions from: ${backendUrl}`);
                const response = await fetch(backendUrl);
                if (!response.ok) {
                    let errorDetails = 'Error desconocido';
                    try { const errData = await response.json(); errorDetails = errData.details || errData.error || `Status: ${response.status}`; } catch(e) { errorDetails = `Status: ${response.status}`; }
                    throw new Error(`Error al cargar sesiones de academia: ${errorDetails}`);
                }
                const data = await response.json();
                setSessions(data.reverse());
            } catch (err) {
                console.error("Error fetching academy sessions:", err);
                setError(err.message || "No se pudieron cargar las sesiones.");
            } finally {
                setLoading(false);
            }
        };

        fetchAcademySessions();

    }, [activeLanguage, currentLanguageConfig]);

    return (
        <PageContainer>
            <PageTitle>Academia</PageTitle>

            <LanguageFilters>
                {Object.keys(languageConfig).map(langKey => (
                    <FilterButton 
                        key={langKey}
                        active={activeLanguage === langKey}
                        onClick={() => setActiveLanguage(langKey)}
                    >
                        {languageConfig[langKey].name}
                    </FilterButton>
                ))}
            </LanguageFilters>

            {selectedVimeoId && (
                <div style={{ marginBottom: '30px', position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', backgroundColor:'#000', borderRadius: '8px' }}>
                    <iframe 
                        src={`https://player.vimeo.com/video/${selectedVimeoId}?autoplay=1`} 
                        frameBorder="0" 
                        allow="autoplay; fullscreen; picture-in-picture" 
                        allowFullScreen
                        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                        title="Vimeo video player">
                        </iframe>
                </div>
            )}

            {loading && <LoadingMessage>Cargando sesiones...</LoadingMessage>}
            {error && <ErrorMessage>{error}</ErrorMessage>}
            
            {!loading && !error && (
                <SessionsGrid>
                    {sessions.length > 0 ? (
                        sessions.map(session => (
                            <SessionCard key={session.vimeoId || session.id} onClick={() => setSelectedVimeoId(session.vimeoId)}>
                                <ThumbnailContainer>
                                    <ThumbnailImage src={session.thumbnailUrl || '/images/placeholder_course.jpg'} alt={session.title} />
                                </ThumbnailContainer>
                                <CardBody>
                                    <SessionTitle>{session.title || 'Video sin título'}</SessionTitle>
                                </CardBody>
                            </SessionCard>
                        ))
                    ) : (
                        <NoDataMessage>No hay sesiones disponibles para este idioma.</NoDataMessage>
                    )}
                </SessionsGrid>
            )}

        </PageContainer>
    );
};

export default Academy;