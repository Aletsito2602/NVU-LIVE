import React, { useState, useEffect } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';

const SIDEBAR_WIDTH = 250;
const SIDEBAR_WIDTH_COLLAPSED = 70; // Ancho cuando esté plegado
const HEADER_HEIGHT = '64px';
const MOBILE_BREAKPOINT = '991px'; // Punto de quiebre para drawer

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column; 
  min-height: 100vh;
`;

// Nuevo: Overlay para cerrar el drawer en móvil
const SidebarOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 999; // Debajo del sidebar pero sobre el contenido
  opacity: ${props => props.$isOpen ? 1 : 0};
  visibility: ${props => props.$isOpen ? 'visible' : 'hidden'};
  transition: opacity 0.3s ease, visibility 0.3s ease;
  display: none; // Oculto por defecto

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    display: block; // Visible solo en móvil cuando está abierto
  }
`;

// ContentWrapper ahora solo necesita el margen lateral
const ContentWrapper = styled.div`
  display: flex;
  flex: 1;
  min-width: 0;
  padding-top: ${HEADER_HEIGHT}; // Espacio para el Header fijo
  // Ajuste de margen izquierdo según el estado del sidebar
  margin-left: ${props => props.$isSidebarCollapsed ? SIDEBAR_WIDTH_COLLAPSED : SIDEBAR_WIDTH}px;
  transition: margin-left 0.3s ease;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    margin-left: 0; // Sin margen en móvil (el sidebar es drawer)
  }
`;

// MainContent ya no necesita el margen ni la transición
const MainContent = styled.main`
  flex: 1;
  padding: 24px; // Reducir padding por defecto (para escritorio)
  background-color: #f9f9f9;
  overflow-y: auto; // Permitir scroll solo en el contenido principal
  min-width: 0; // Evitar overflow en flex

  @media (max-width: 768px) { // Reducir padding en pantallas más pequeñas
    padding: 20px; // Mantener este
  }
  @media (max-width: 480px) {
    padding: 15px; // Mantener este
  }
`;

const Layout = ({ children }) => {
  // Estado para el sidebar (colapsado en escritorio, abierto/cerrado en móvil)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); 
  // Estado específico para colapsado en escritorio (persiste entre móvil/escritorio)
  const [isDesktopCollapsed, setIsDesktopCollapsed] = useState(false);
  const location = useLocation();

  const handleToggleSidebar = () => {
    const isMobile = window.innerWidth <= parseInt(MOBILE_BREAKPOINT);
    if (isMobile) {
      setIsSidebarOpen(prev => !prev); // Abre/cierra drawer en móvil
    } else {
      setIsDesktopCollapsed(prev => !prev); // Colapsa/expande en escritorio
      setIsSidebarOpen(true); // Asegura que esté "abierto" (visible) en escritorio
    }
  };

  const handleCloseSidebar = () => {
    const isMobile = window.innerWidth <= parseInt(MOBILE_BREAKPOINT);
    if (isMobile) {
      setIsSidebarOpen(false); // Cierra el drawer en móvil
    }
  };

  // Cierra el drawer en móvil al cambiar de ruta
  useEffect(() => {
    handleCloseSidebar();
  }, [location.pathname]);

  // Listener para ajustar estado si la ventana cambia de tamaño
  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth <= parseInt(MOBILE_BREAKPOINT);
      if (!isMobile) {
        // Si pasamos a escritorio, forzamos a que el sidebar esté "abierto" (visible)
        setIsSidebarOpen(true); 
      } else {
        // Si pasamos a móvil, el estado isSidebarOpen determina si el drawer está visible
        // Podemos cerrarlo por defecto al cambiar a móvil si se prefiere
        // setIsSidebarOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize(); // Llamada inicial
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Excluir layout en la página de login
  if (location.pathname === '/login') {
    return <>{children}</>;
  }

  return (
    <LayoutContainer>
      {/* Pasar isSidebarOpen (para icono) y handleToggleSidebar al Header */}
      <Header onToggleSidebar={handleToggleSidebar} isSidebarOpen={isSidebarOpen} />
      
      {/* Pasar isOpen, isCollapsed (para escritorio), onClose y onToggleCollapse al Sidebar */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        isCollapsed={isDesktopCollapsed}
        onClose={handleCloseSidebar} 
        onToggleCollapse={handleToggleSidebar}
      />
      
      {/* Overlay para cerrar en móvil */}
      <SidebarOverlay $isOpen={isSidebarOpen} onClick={handleCloseSidebar} />

      {/* Pasar estado de colapso (solo escritorio) a ContentWrapper */}
      <ContentWrapper $isSidebarCollapsed={isDesktopCollapsed}> 
        <MainContent>{children}</MainContent>
      </ContentWrapper>
    </LayoutContainer>
  );
};

export default Layout;