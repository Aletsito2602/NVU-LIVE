import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaBell, FaBars } from 'react-icons/fa';
import { MdKeyboardArrowDown, MdClose } from 'react-icons/md';
import { useTranslation } from 'react-i18next';

const HEADER_HEIGHT = '64px';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
  background: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  height: ${HEADER_HEIGHT};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  width: 100%;
`;

const MenuToggle = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #333;
  cursor: pointer;
  padding: 0.5rem;
  margin-right: 0.5rem;

  @media (max-width: 992px) {
    display: block;
  }
`;

const Logo = styled.div`
  a {
    display: block;
  }
  img {
    height: 40px;
    display: block;
  }
  @media (max-width: 768px) {
    img { height: 35px; }
  }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  @media (max-width: 768px) {
    gap: 0.8rem;
  }
`;

const NotificationIcon = styled.div`
  font-size: 1.1rem;
  color: #666;
  cursor: pointer;
  @media (max-width: 768px) {
    display: none;
  }
`;

const UserProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  position: relative;
`;

const Avatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #eee;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const UserInfo = styled.div`
  font-size: 0.85rem;
  @media (max-width: 992px) {
    display: none;
  }
`;

const UserName = styled.div`
  font-weight: 500;
`;

const UserEmail = styled.div`
  color: #666;
  font-size: 0.75rem;
`;

const LanguageSelectorContainer = styled.div`
  position: relative;
`;

const LanguageSelector = styled.div`
  display: flex;
  align-items: center;
  font-weight: 600;
  cursor: pointer;
  user-select: none;
`;

const LanguageDropdown = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
  padding: 8px 0;
  margin-top: 4px;
  z-index: 20;
  min-width: 100px;
`;

const ProfileDropdown = styled(LanguageDropdown)`
  /* Estilos adicionales o modificaciones si son necesarias */
`;

const DropdownItem = styled.div`
  padding: 8px 16px;
  font-size: 14px;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;

const DropdownItemWithIcon = styled(DropdownItem)`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Header = ({ onToggleSidebar, isSidebarOpen }) => {
  const { i18n } = useTranslation();
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const langDropdownRef = useRef(null);
  const profileDropdownRef = useRef(null);
  const navigate = useNavigate();
  
  const [userData, setUserData] = useState({ name: 'Usuario', id: '' });

  useEffect(() => {
    const storedData = localStorage.getItem('nvuUserData');
    if (storedData) {
      try {
        setUserData(JSON.parse(storedData));
      } catch (error) {
        console.error("Error parsing user data from localStorage:", error);
        localStorage.removeItem('nvuUserData');
      }
    }
  }, []);

  const handleLanguageSelect = (langCode) => {
    i18n.changeLanguage(langCode);
    setIsLangDropdownOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('nvuUserData');
    setIsProfileDropdownOpen(false);
    setUserData({ name: 'Usuario', id: '' });
    navigate('/login');
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target)) {
        setIsLangDropdownOpen(false);
      }
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
        setIsProfileDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [langDropdownRef, profileDropdownRef]);

  const languageLabels = {
    es: 'Esp',
    en: 'Eng',
    fr: 'Fra'
  };
  const currentLanguageLabel = languageLabels[i18n.language.split('-')[0]] || 'Lang';

  return (
    <HeaderContainer>
      <MenuToggle onClick={onToggleSidebar}>
        {isSidebarOpen ? <MdClose /> : <FaBars />}
      </MenuToggle>
      
      <Logo>
        <Link to="/">
          <img src="/images/nvu-logo.png" alt="NVU Logo" />
        </Link>
      </Logo>
      
      <RightSection>
        <NotificationIcon>
          <FaBell />
        </NotificationIcon>
        
        <UserProfile ref={profileDropdownRef} onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}>
          <Avatar>
            <img src="/images/81.png" alt="User Avatar" />
          </Avatar>
          <UserInfo>
            <UserName>{userData.name}</UserName>
            <UserEmail>ID: {userData.id}</UserEmail>
          </UserInfo>
          {isProfileDropdownOpen && (
            <ProfileDropdown>
              <DropdownItemWithIcon onClick={handleLogout}>
                <span>🚪</span>
                Logout
              </DropdownItemWithIcon>
            </ProfileDropdown>
          )}
        </UserProfile>
        
        <LanguageSelectorContainer ref={langDropdownRef}>
          <LanguageSelector onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}>
            {currentLanguageLabel} <MdKeyboardArrowDown />
          </LanguageSelector>

          {isLangDropdownOpen && (
            <LanguageDropdown>
              <DropdownItem onClick={() => handleLanguageSelect('es')}>Español</DropdownItem>
              <DropdownItem onClick={() => handleLanguageSelect('en')}>English</DropdownItem>
              <DropdownItem onClick={() => handleLanguageSelect('fr')}>Français</DropdownItem>
            </LanguageDropdown>
          )}
        </LanguageSelectorContainer>
      </RightSection>
    </HeaderContainer>
  );
};

export default Header;