import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// --- Styled Components ---

// Reutilizar el contenedor con fondo blur de LoginPage, pero ajustar z-index si es necesario
const SelectorContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  padding: 20px;

  &::before {
    content: '';
    position: absolute;
    top: -10px;
    left: -10px;
    right: -10px;
    bottom: -10px;
    background-image: url('/images/banner.png'); // Mismo fondo
    background-size: cover;
    background-position: center;
    filter: blur(8px);
    z-index: 0; // Detrás del contenido pero visible
  }
`;

const SelectorCard = styled.div`
  padding: 40px 50px;
  background: rgba(255, 255, 255, 0.9); // Ligeramente más opaco que el login
  border-radius: 15px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  text-align: center;
  position: relative;
  z-index: 1; // Encima del fondo blur
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const Title = styled.h1`
  margin-bottom: 35px;
  color: #333;
  font-size: 24px;
  font-weight: 600;
`;

const LanguageOptions = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px; // Más espacio entre banderas
`;

const LanguageButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 15px; // Añadir algo de padding para el área de clic
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  transition: transform 0.2s ease;
  border-radius: 10px; // Redondear botón para hover

  &:hover {
    transform: scale(1.1);
    background-color: rgba(0,0,0,0.05); // Feedback visual ligero
  }
`;

// Nuevo componente para el icono de bandera (Unicode)
const FlagIcon = styled.span`
  font-size: 50px; // Tamaño del emoji
  line-height: 1;
  // Sombra opcional para dar profundidad
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const LanguageLabel = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: #444;
`;

// --- Component ---

const LanguageSelector = () => {
  const { i18n } = useTranslation(); // Solo necesitamos i18n para cambiar idioma
  const navigate = useNavigate();

  const handleLanguageSelect = (langCode) => {
    i18n.changeLanguage(langCode);
    navigate('/login-form'); // Navegar a la ruta del formulario
  };

  // Se muestra el título en los 3 idiomas siempre
  const titleText = "Selecciona tu idioma / Select your language / Sélectionnez votre langue";

  return (
    <SelectorContainer>
      <SelectorCard>
        <Title>{titleText}</Title>
        <LanguageOptions>
          <LanguageButton onClick={() => handleLanguageSelect('es')}>
            {/* Usar FlagIcon con Unicode */}
            <FlagIcon role="img" aria-label="Español">🇪🇸</FlagIcon>
            <LanguageLabel>Español</LanguageLabel>
          </LanguageButton>
          <LanguageButton onClick={() => handleLanguageSelect('en')}>
            {/* Usar FlagIcon con Unicode (GB) */}
            <FlagIcon role="img" aria-label="English">🇬🇧</FlagIcon>
            <LanguageLabel>English</LanguageLabel>
          </LanguageButton>
          <LanguageButton onClick={() => handleLanguageSelect('fr')}>
            {/* Usar FlagIcon con Unicode */}
            <FlagIcon role="img" aria-label="Français">🇫🇷</FlagIcon>
            <LanguageLabel>Français</LanguageLabel>
          </LanguageButton>
        </LanguageOptions>
      </SelectorCard>
    </SelectorContainer>
  );
};

export default LanguageSelector; 