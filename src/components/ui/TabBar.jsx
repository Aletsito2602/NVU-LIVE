import React from 'react';
import styled from 'styled-components';

const TabContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 24px;
  flex-wrap: wrap; // Para que bajen en pantallas pequeñas
`;

const TabButton = styled.button`
  padding: 10px 20px;
  border-radius: 8px;
  border: none;
  background-color: ${props => props.active ? '#e9ecef' : 'transparent'};
  color: ${props => props.active ? '#333' : '#666'};
  font-weight: ${props => props.active ? '600' : '500'};
  font-size: 15px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${props => props.active ? '#dee2e6' : '#f8f9fa'};
  }
`;

const TabBar = ({ tabs, activeTab, onTabClick }) => {
  return (
    <TabContainer>
      {tabs.map(tab => (
        <TabButton 
          key={tab.key} 
          active={tab.key === activeTab}
          onClick={() => onTabClick(tab.key)}
        >
          {tab.label}
        </TabButton>
      ))}
    </TabContainer>
  );
};

export default TabBar; 