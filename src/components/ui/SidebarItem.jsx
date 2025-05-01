import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const ItemLink = styled(Link)`
  display: flex;
  align-items: center;
  padding: 15px 20px;
  color: ${(props) => (props.$isActive ? '#0088cc' : '#666')};
  text-decoration: none;
  font-weight: ${(props) => (props.$isActive ? '600' : '400')};
  transition: all 0.2s ease;
  border-left: 3px solid ${(props) => (props.$isActive ? '#0088cc' : 'transparent')};
  background-color: ${(props) => (props.$isActive ? '#f7f9fc' : 'transparent')};
  
  &:hover {
    background-color: #f7f9fc;
    color: #0088cc;
    border-left-color: #0088cc;
  }
`;

const IconWrapper = styled.div`
  margin-right: ${props => props.$isCollapsed ? '0' : '12px'};
  display: flex;
  align-items: center;
  font-size: 1.2rem;
  min-width: 24px;
  transition: margin-right 0.3s ease;
`;

const ItemLabel = styled.span`
  opacity: ${props => props.$isCollapsed ? '0' : '1'};
  transition: opacity 0.2s ease 0.1s;
  white-space: nowrap;
`;

const SidebarItem = ({ to, icon, label, isActive, isCollapsed }) => {
  return (
    <ItemLink to={to} $isActive={isActive} title={label}>
      <IconWrapper $isCollapsed={isCollapsed}>{icon}</IconWrapper>
      <ItemLabel $isCollapsed={isCollapsed}>{label}</ItemLabel>
    </ItemLink>
  );
};

export default SidebarItem;