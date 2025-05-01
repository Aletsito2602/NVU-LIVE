import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout'; // Re-importar Layout
import Home from './components/pages/Home'; // Re-importar Home
import Calendar from './components/pages/Calendar';
import Educators from './components/pages/Educators'; // Importar nueva página
import EducatorDetail from './components/pages/LiveEducators/EducatorDetail'; // Importar detalle
import EducatorSessions from './components/pages/EducatorsSessions/EducatorSessions'; // Importar nueva página
import Academy from './components/pages/Academy';
import Forum from './components/pages/Forum';
import BackOffice from './components/pages/BackOffice';
import LoginPage from './components/pages/LoginPage'; // Corregir ruta a la ubicación real
import LanguageSelector from './components/pages/LanguageSelector'; // Importar selector
import './styles/global.css';

function App() {
  return (
    <div className="App">
      {/* Layout envuelve las rutas que lo usan */}
      {/* La ruta de detalle puede necesitar un layout diferente o ninguno */}
      <Routes>
        {/* Ruta inicial -> Selector de Idioma (sin Layout) */}
        <Route path="/login" element={<LanguageSelector />} />
        
        {/* Nueva ruta para el formulario de Login (sin Layout) */}
        <Route path="/login-form" element={<LoginPage />} />

        {/* Rutas Protegidas (asumiendo que Layout implica autenticación) */}
        {/* En un caso real, estas rutas estarían dentro de un componente 
            que verifica la autenticación antes de renderizar el Layout */}
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/calendario" element={<Layout><Calendar /></Layout>} />
        <Route path="/educadores" element={<Layout><Educators /></Layout>} /> 
        <Route path="/educadores/:educatorId" element={<Layout><EducatorDetail /></Layout>} />
        <Route path="/educadores/:educatorId/sesiones" element={<Layout><EducatorSessions /></Layout>} />
        <Route path="/academia" element={<Layout><Academy /></Layout>} />
        <Route path="/foro" element={<Layout><Forum /></Layout>} />
        <Route path="/back-office" element={<Layout><BackOffice /></Layout>} />
        
        {/* Puedes añadir una ruta comodín 404 si lo deseas */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </div>
  );
}

export default App;