import React, { useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import TradingViewWidget from './ScannerWidget';

const PageContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const PageTitle = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin-bottom: 10px;
`;

const ContentContainer = styled.div`
  display: flex;
  gap: 20px;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const SidebarContainer = styled.div`
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 250px;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const WidgetContainer = styled.div`
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  flex-grow: 1;
  height: calc(100vh - 150px);
  overflow: hidden;
`;

const ScannerButton = styled.button`
  width: 100%;
  padding: 12px 15px;
  background-color: ${props => props.$isActive ? '#0088cc' : 'white'};
  color: ${props => props.$isActive ? 'white' : '#333'};
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-weight: 500;
  text-align: left;
  margin-bottom: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${props => props.$isActive ? '#0077b3' : '#f5f5f5'};
  }
`;

const SectionTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #666;
  margin-bottom: 15px;
`;

const Scanner = () => {
  const { t } = useTranslation();
  const [activeScanner, setActiveScanner] = useState('gold');

  const handleScannerChange = (scanner) => {
    setActiveScanner(scanner);
  };

  return (
    <PageContainer>
      <PageTitle>{t('sidebar.scanner')}</PageTitle>
      
      <ContentContainer>
        <SidebarContainer>
          <SectionTitle>{t('scanner.title')}</SectionTitle>
          <ScannerButton 
            $isActive={activeScanner === 'gold'} 
            onClick={() => handleScannerChange('gold')}
          >
            {t('scanner.gold')}
          </ScannerButton>
          <ScannerButton 
            $isActive={activeScanner === 'abi'} 
            onClick={() => handleScannerChange('abi')}
          >
            {t('scanner.abi')}
          </ScannerButton>
          <ScannerButton 
            $isActive={activeScanner === 'pops'} 
            onClick={() => handleScannerChange('pops')}
          >
            {t('scanner.pops')}
          </ScannerButton>
        </SidebarContainer>
        
        <WidgetContainer>
          <TradingViewWidget scannerType={activeScanner} />
        </WidgetContainer>
      </ContentContainer>
    </PageContainer>
  );
};

export default Scanner; 