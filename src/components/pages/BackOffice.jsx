import React, { useState } from 'react';
import styled from 'styled-components';
import { 
  MdDashboard, 
  MdPeople, 
  MdSchool, 
  MdEvent, 
  MdForum, 
  MdSettings,
  MdNotifications,
  MdTrendingUp,
  MdAccessTime,
  MdPerson
} from 'react-icons/md';

const PageContainer = styled.div`
  padding: 24px;
`;

const PageTitle = styled.h1`
  font-size: 28px;
  margin-bottom: 20px;
  color: #333;
`;

const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 24px;
`;

const StatCard = styled.div`
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  transition: transform 0.2s;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const IconWrapper = styled.div`
  background-color: ${props => props.color || '#0088cc'};
  color: white;
  width: 48px;
  height: 48px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 16px;
  
  svg {
    font-size: 24px;
  }
`;

const StatInfo = styled.div`
  flex: 1;
`;

const StatValue = styled.div`
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin-bottom: 4px;
`;

const StatLabel = styled.div`
  font-size: 14px;
  color: #666;
`;

const SectionTitle = styled.h2`
  font-size: 20px;
  margin: 24px 0 16px;
  color: #333;
`;

const ContentRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-bottom: 24px;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

const ContentCard = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  overflow: hidden;
`;

const CardHeader = styled.div`
  padding: 16px;
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CardTitle = styled.h3`
  font-size: 18px;
  color: #333;
  margin: 0;
`;

const ViewAllLink = styled.a`
  font-size: 14px;
  color: #0088cc;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

const ListItem = styled.div`
  display: flex;
  padding: 12px 16px;
  border-bottom: 1px solid #f0f0f0;
  
  &:last-child {
    border-bottom: none;
  }
  
  &:hover {
    background-color: #f9f9f9;
  }
`;

const NotificationIcon = styled.div`
  width: 32px;
  height: 32px;
  background-color: ${props => props.color || '#e6f7ff'};
  color: ${props => props.iconColor || '#0088cc'};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  
  svg {
    font-size: 16px;
  }
`;

const ListItemContent = styled.div`
  flex: 1;
`;

const ListItemTitle = styled.div`
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 4px;
`;

const ListItemMeta = styled.div`
  font-size: 12px;
  color: #666;
`;

const UserItem = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid #f0f0f0;
  
  &:last-child {
    border-bottom: none;
  }
  
  &:hover {
    background-color: #f9f9f9;
  }
`;

const UserAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #f0f0f0;
  margin-right: 12px;
  
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
  }
`;

const UserInfo = styled.div`
  flex: 1;
`;

const UserName = styled.div`
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 2px;
`;

const UserRole = styled.div`
  font-size: 12px;
  color: #666;
`;

const UserStatus = styled.div`
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 12px;
  background-color: ${props => props.isActive ? '#e6ffec' : '#fff0f0'};
  color: ${props => props.isActive ? '#1d9a48' : '#e53935'};
  margin-left: 8px;
`;

const ModuleContainer = styled.div`
  padding: 16px;
`;

const ModuleGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 16px;
`;

const ModuleCard = styled.div`
  background-color: white;
  border: 1px solid #f0f0f0;
  border-radius: 8px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    border-color: #0088cc;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
  }
`;

const ModuleIcon = styled.div`
  width: 48px;
  height: 48px;
  background-color: #f5f5f5;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
  color: #0088cc;
  
  svg {
    font-size: 24px;
  }
`;

const ModuleName = styled.div`
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 4px;
`;

const ModuleDescription = styled.div`
  font-size: 12px;
  color: #666;
`;

const BackOffice = () => {
  const [activeModule, setActiveModule] = useState('dashboard');
  
  const stats = [
    { id: 1, value: '245', label: 'Usuarios activos', icon: <MdPeople />, color: '#0088cc' },
    { id: 2, value: '12', label: 'Cursos publicados', icon: <MdSchool />, color: '#4caf50' },
    { id: 3, value: '8', label: 'Eventos próximos', icon: <MdEvent />, color: '#ff9800' },
    { id: 4, value: '156', label: 'Temas en el foro', icon: <MdForum />, color: '#9c27b0' }
  ];
  
  const notifications = [
    { id: 1, title: 'Nuevo usuario registrado', time: 'Hace 10 minutos', icon: <MdPerson />, color: '#e3f2fd', iconColor: '#2196f3' },
    { id: 2, title: 'Nuevo comentario en el foro', time: 'Hace 25 minutos', icon: <MdForum />, color: '#e8f5e9', iconColor: '#4caf50' },
    { id: 3, title: 'Actualización del sistema completada', time: 'Hace 1 hora', icon: <MdSettings />, color: '#fff8e1', iconColor: '#ffc107' },
    { id: 4, title: 'Nuevo curso disponible', time: 'Hace 3 horas', icon: <MdSchool />, color: '#f3e5f5', iconColor: '#9c27b0' }
  ];
  
  const activeUsers = [
    { id: 1, name: 'María García', role: 'Administrador', isActive: true },
    { id: 2, name: 'Carlos Rodríguez', role: 'Educador', isActive: true },
    { id: 3, name: 'Laura Martínez', role: 'Educador', isActive: false },
    { id: 4, name: 'Javier López', role: 'Moderador', isActive: true },
    { id: 5, name: 'Ana Fernández', role: 'Usuario', isActive: false }
  ];
  
  const modules = [
    { id: 'dashboard', name: 'Dashboard', icon: <MdDashboard />, description: 'Resumen general' },
    { id: 'users', name: 'Usuarios', icon: <MdPeople />, description: 'Gestión de usuarios' },
    { id: 'courses', name: 'Cursos', icon: <MdSchool />, description: 'Administrar cursos' },
    { id: 'events', name: 'Eventos', icon: <MdEvent />, description: 'Programar eventos' },
    { id: 'forum', name: 'Foro', icon: <MdForum />, description: 'Moderar foro' },
    { id: 'settings', name: 'Ajustes', icon: <MdSettings />, description: 'Configuración' }
  ];
  
  return (
    <PageContainer>
      <PageTitle>Back Office</PageTitle>
      
      <DashboardGrid>
        {stats.map(stat => (
          <StatCard key={stat.id}>
            <IconWrapper color={stat.color}>
              {stat.icon}
            </IconWrapper>
            <StatInfo>
              <StatValue>{stat.value}</StatValue>
              <StatLabel>{stat.label}</StatLabel>
            </StatInfo>
          </StatCard>
        ))}
      </DashboardGrid>
      
      <SectionTitle>Módulos</SectionTitle>
      <ModuleContainer>
        <ModuleGrid>
          {modules.map(module => (
            <ModuleCard 
              key={module.id}
              onClick={() => setActiveModule(module.id)}
            >
              <ModuleIcon>
                {module.icon}
              </ModuleIcon>
              <ModuleName>{module.name}</ModuleName>
              <ModuleDescription>{module.description}</ModuleDescription>
            </ModuleCard>
          ))}
        </ModuleGrid>
      </ModuleContainer>
      
      <ContentRow>
        <ContentCard>
          <CardHeader>
            <CardTitle>Notificaciones recientes</CardTitle>
            <ViewAllLink href="#/back-office/notifications">Ver todas</ViewAllLink>
          </CardHeader>
          {notifications.map(notification => (
            <ListItem key={notification.id}>
              <NotificationIcon color={notification.color} iconColor={notification.iconColor}>
                {notification.icon}
              </NotificationIcon>
              <ListItemContent>
                <ListItemTitle>{notification.title}</ListItemTitle>
                <ListItemMeta>{notification.time}</ListItemMeta>
              </ListItemContent>
            </ListItem>
          ))}
        </ContentCard>
        
        <ContentCard>
          <CardHeader>
            <CardTitle>Usuarios activos</CardTitle>
            <ViewAllLink href="#/back-office/users">Ver todos</ViewAllLink>
          </CardHeader>
          {activeUsers.map(user => (
            <UserItem key={user.id}>
              <UserAvatar>
                <img src={`/api/placeholder/40/40`} alt={user.name} />
              </UserAvatar>
              <UserInfo>
                <UserName>{user.name}</UserName>
                <UserRole>{user.role}</UserRole>
              </UserInfo>
              <UserStatus isActive={user.isActive}>
                {user.isActive ? 'Activo' : 'Inactivo'}
              </UserStatus>
            </UserItem>
          ))}
        </ContentCard>
      </ContentRow>
    </PageContainer>
  );
};

export default BackOffice;