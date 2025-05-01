import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const CardLink = styled(Link)`
  display: block;
  text-decoration: none;
  color: inherit;
`;

const CardContainer = styled.div`
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  position: relative;
  padding-bottom: 16px;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  }
`;

const CardHeader = styled.div`
  position: relative;
`;

const BannerImage = styled.img`
  width: 100%;
  height: 120px;
  object-fit: cover;
  display: block;
  border-radius: 10px 10px 0 0;
`;

const EducatorAvatar = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background-color: #eee;
  border: 3px solid white;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25);
  overflow: hidden;
  position: absolute;
  bottom: -35px;
  right: 16px;
  z-index: 2;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const CardContent = styled.div`
  padding: 16px;
  padding-top: 45px;
`;

const CardTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 4px 0;
  padding-right: 40px;
`;

const CardSubtitle = styled.p`
  font-size: 13px;
  color: #666;
  margin: 0 0 12px 0;
`;

const InfoContainer = styled.div`
    margin-top: 8px;
`;

const LanguageBadge = styled.div`
  display: inline-flex; 
  align-items: center;
  gap: 6px;
  padding: 5px 10px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  color: #555;
  background-color: #f0f0f0;
  border: 1px solid #ddd;
  text-transform: uppercase;
`;

const EducatorCard = ({ educator }) => {
  const avatarImgSrc = educator.profileImageFilename 
    ? `/images/perfil/${educator.profileImageFilename}` 
    : educator.img;

  const bannerImgSrc = '/images/banner.png';

  return (
    <CardLink to={`/educadores/${educator.id}`}> 
      <CardContainer>
        <CardHeader>
          <BannerImage src={bannerImgSrc} alt="NVU Banner" />
          <EducatorAvatar>
            <img 
                src={avatarImgSrc} 
                alt={`${educator.name} avatar`} 
                onError={(e) => { e.target.onerror = null; e.target.src='/images/placeholder.jpg'; }}
            />
          </EducatorAvatar>
        </CardHeader>
        <CardContent>
          <CardTitle>{educator.name}</CardTitle>
          <CardSubtitle>{educator.title}</CardSubtitle>
          <InfoContainer>
            <LanguageBadge>
              {educator.language || 'N/A'}
            </LanguageBadge>
          </InfoContainer>
        </CardContent>
      </CardContainer>
    </CardLink>
  );
};

export default EducatorCard; 