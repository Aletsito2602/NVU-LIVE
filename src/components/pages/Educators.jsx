import React, { useState } from 'react';
import styled from 'styled-components';
import { MdSearch, MdFilterList } from 'react-icons/md';
import TabBar from '../ui/TabBar';
import EducatorCard from '../educators/EducatorCard';
import educatorsData from '../../data/educatorsData';
import { useTranslation } from 'react-i18next'; // Importar hook

const PageContainer = styled.div`
  padding: 24px;
`;

const PageTitle = styled.h1`
  font-size: 28px;
  margin-bottom: 24px;
  color: #333;
`;

const SearchContainer = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
`;

const SearchInput = styled.div`
  flex: 1;
  position: relative;
  
  input {
    width: 100%;
    padding: 10px 16px 10px 40px;
    border-radius: 4px;
    border: 1px solid #ddd;
    font-size: 16px;
    outline: none;
    
    &:focus {
      border-color: #0088cc;
    }
  }
  
  svg {
    position: absolute;
    top: 50%;
    left: 12px;
    transform: translateY(-50%);
    color: #999;
    font-size: 20px;
  }
`;

const FilterButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 16px;
  border-radius: 4px;
  border: 1px solid #ddd;
  background-color: white;
  font-size: 16px;
  cursor: pointer;
  
  &:hover {
    background-color: #f5f5f5;
  }
  
  svg {
    font-size: 20px;
  }
`;

const EducatorsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); // Ajustar minmax según gusto
  gap: 24px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 16px;
  }
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

// Definir las claves de las pestañas
// Las etiquetas se obtendrán de las traducciones
const TAB_KEYS = [
  'forex', 
  'crypto', 
  'financial-literacy', 
  // 'real-state' eliminado
  'marketing-digital',
];

const Educators = () => {
  const { t } = useTranslation(); // Obtener t
  const [activeTab, setActiveTab] = useState(TAB_KEYS[0]); // Iniciar con la primera clave

  // Crear las pestañas con etiquetas traducidas
  const tabs = TAB_KEYS.map(key => ({
    key: key,
    // Usar una convención como categories.[key]
    label: t(`categories.${key.replace('-', '_')}`), // Reemplazar guion para claves válidas
  }));

  // Obtener los educadores para la pestaña activa
  const currentEducators = educatorsData[activeTab] || [];

  return (
    <PageContainer>
      <PageTitle>{t('educators.pageTitle')}</PageTitle> {/* Título traducido */}
      <TabBar 
        tabs={tabs} // Usar tabs generadas
        activeTab={activeTab}
        onTabClick={setActiveTab}
      />
      <EducatorsGrid>
        {currentEducators.length > 0 ? (
            currentEducators.map(educator => (
            <EducatorCard key={educator.id} educator={educator} />
            ))
        ) : (
            <p>{t('educators.noEducatorsInCategory')}</p> // Mensaje si no hay educadores
        )}
      </EducatorsGrid>
    </PageContainer>
  );
};

export default Educators;