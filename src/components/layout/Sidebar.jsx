import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { 
  MdHome, 
  MdCalendarToday, 
  MdPeople, 
  MdSchool, 
  MdForum, 
  MdWork,
  MdArrowBack 
} from 'react-icons/md';
import { FaInstagram, FaTelegram } from 'react-icons/fa';
import SidebarItem from '../ui/SidebarItem';
import { useTranslation } from 'react-i18next';

const SIDEBAR_WIDTH = 250;
const SIDEBAR_WIDTH_COLLAPSED = 70;

const SidebarContainer = styled.aside`
  position: fixed;
  top: 0;
  left: 0;
  width: ${SIDEBAR_WIDTH}px;
  height: 100vh;
  background: white;
  box-shadow: 1px 0 3px rgba(0, 0, 0, 0.1);
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  z-index: 1000;
  transition: transform 0.3s ease, width 0.3s ease;
  overflow-y: auto;

  transform: translateX(0);
  
  ${props => props.$isCollapsed && css`
    width: ${SIDEBAR_WIDTH_COLLAPSED}px;
  `}

  @media (max-width: 991px) {
    width: ${SIDEBAR_WIDTH}px;
    transform: translateX(${props => props.$isOpen ? '0' : '-100%'});
  }
`;

const MenuSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 10px 0;
  margin-top: 40px;
`;

const SocialSection = styled.div`
  margin-top: auto;
  padding: 20px;
  border-top: 1px solid #f0f0f0;
  opacity: ${props => props.$isCollapsed ? '0' : '1'};
  visibility: ${props => props.$isCollapsed ? 'hidden' : 'visible'};
  transition: opacity 0.3s ease, visibility 0.3s ease;

  @media (max-width: 991px) {
    opacity: 1;
    visibility: visible;
  }
`;

const SocialLinks = styled.ul`
  list-style: none;
  padding: 0;
  margin: 10px 0 0 0;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const SocialLinkItem = styled.li`
  a {
    display: flex;
    align-items: center;
    gap: 12px;
    color: #666;
    text-decoration: none;
    font-size: 14px;
    
    &:hover {
      color: #333;
    }

    svg {
      font-size: 1.5rem;
      min-width: 24px;
    }
  }
`;

const Sidebar = ({ isOpen, isCollapsed, onClose }) => {
  const location = useLocation();
  const { t } = useTranslation();
  
  const menuItems = [
    { path: '/', label: t('sidebar.home'), icon: <MdHome /> },
    { path: '/calendario', label: t('sidebar.calendar'), icon: <MdCalendarToday /> },
    { path: '/educadores', label: t('sidebar.educators'), icon: <MdPeople /> },
    { path: '/academia', label: t('sidebar.academy'), icon: <MdSchool /> },
    { path: '/foro', label: t('sidebar.forum'), icon: <MdForum /> },
    { path: '/back-office', label: t('sidebar.backoffice'), icon: <MdWork /> },
  ];
  
  const actuallyCollapsed = isCollapsed && window.innerWidth >= 992;

  return (
    <SidebarContainer $isOpen={isOpen} $isCollapsed={actuallyCollapsed}>
      <MenuSection>
        {menuItems.map((item) => (
          <SidebarItem 
            key={item.path}
            to={item.path}
            icon={item.icon}
            label={item.label}
            isActive={location.pathname === item.path}
            isCollapsed={actuallyCollapsed}
            onClick={onClose}
          />
        ))}
      </MenuSection>
      
      <SocialSection $isCollapsed={actuallyCollapsed}>
        <SocialLinks>
          <SocialLinkItem>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram style={{ color: '#E1306C' }} />
              <span>{t('social.instagram')}</span>
            </a>
          </SocialLinkItem>
          <SocialLinkItem>
            <a href="https://telegram.org" target="_blank" rel="noopener noreferrer">
              <FaTelegram style={{ color: '#0088cc' }} />
              <span>{t('social.telegram')}</span>
            </a>
          </SocialLinkItem>
        </SocialLinks>
      </SocialSection>
    </SidebarContainer>
  );
};

export default Sidebar;