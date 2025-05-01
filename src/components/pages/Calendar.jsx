import React, { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { FaVideo } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Calendar as BigCalendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import es from 'date-fns/locale/es';
import enUS from 'date-fns/locale/en-US';
import 'react-big-calendar/lib/css/react-big-calendar.css';

// Importar datos
import educatorsData from '../../data/educatorsData';
// Datos de ejemplo (MEJORAR CON DATOS REALES/API)
const scheduleData = {
  '2025-04-24': [
    { time: '11:30', educatorId: 'abi-belity', title: 'Trading Institucional' },
    { time: '11:35', educatorId: 'about-nikki-fx', title: 'The Gold Diggers Sessions' },
    { time: '14:00', educatorId: 'paulina', title: 'Price Action Mastery' },
    { time: '15:00', educatorId: 'jeff-beausoleil', title: 'Forex Session' },
    { time: '19:00', educatorId: 'dani-curtis', title: 'Stocks 101' },
    { time: '20:00', educatorId: 'henry-tyson', title: 'Truth yo pipe' },
  ],
  '2025-04-25': [
    { time: '18:00', educatorId: 'marcelo-t-fx', title: 'Intro E-commerce' },
    { time: '22:00', educatorId: 'abi-belity', title: 'Trading Institucional' },
  ],
  '2025-05-15': [ // Añadir evento en Mayo para probar vista mensual
     { time: '10:00', educatorId: 'paulina', title: 'Monthly Review Session' }
  ]
};

// Configurar el localizer para react-big-calendar
const locales = {
  'es': es,
  'en': enUS,
  // Añadir más locales si es necesario
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: (date, options) => startOfWeek(date, { ...options, weekStartsOn: 1 }), // Lunes como inicio de semana
  getDay,
  locales,
});

// Helper para obtener datos del educador por ID
const findEducatorById = (id) => {
    for (const category in educatorsData) {
        const educator = educatorsData[category].find(edu => edu.id === id);
        if (educator) return educator;
    }
    return null; // Devuelve null si no se encuentra
};

// --- Styled Components ---

// Contenedores para vistas condicionales
const DESKTOP_BREAKPOINT = '992px';

const MobileViewContainer = styled.div`
  display: block;
  @media (min-width: ${DESKTOP_BREAKPOINT}) {
    display: none;
  }
`;

const DesktopViewContainer = styled.div`
  display: none;
  @media (min-width: ${DESKTOP_BREAKPOINT}) {
    display: block;
    padding: 30px; // Aumentar padding para escritorio
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    // height: 80vh; // Quitar altura fija temporalmente
  }
`;

const PageContainer = styled.div`
  padding: 0 0 24px 0; // Sin padding superior, con padding inferior
  background-color: #f8f9fa; 
  min-height: calc(100vh - 60px); // Ajustar según altura del Header
`;

// Banner superior (opcional)
const BannerImage = styled.img`
  width: 100%;
  max-width: 100%; 
  height: auto; 
  display: block; 
  // Sin margen inferior, el espaciado lo dará el siguiente contenedor
`;

const ContentWrapper = styled.div`
    padding: 24px; // Padding general para el contenido debajo del banner
`;

const PageTitle = styled.h1`
  font-size: 24px; // Ligeramente más pequeño para móvil
  margin-bottom: 16px; 
  color: #333;
`;

// --- Day Selector --- 
const DaySelectorContainer = styled.div`
    display: flex;
    justify-content: space-between;
    background-color: white;
    border-radius: 8px;
    padding: 10px;
    margin-bottom: 24px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
`;

const DayButton = styled.button`
    border: none;
    background: ${props => props.active ? '#007bff' : 'transparent'};
    color: ${props => props.active ? 'white' : '#555'};
    padding: 8px 0;
    border-radius: 6px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    flex: 1; // Ocupar espacio equitativo
    text-align: center;
    font-size: 12px;
    font-weight: 500;
    transition: background-color 0.2s, color 0.2s;

    &:hover {
        background-color: ${props => props.active ? '#0056b3' : '#f0f0f0'};
    }
`;

const DayNumber = styled.span`
    font-size: 16px;
    font-weight: 600;
`;

// --- Schedule / Timeline --- 

const ScheduleContainer = styled.div`
    background: white;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

const ScheduleHeader = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 0 10px 10px 60px; // Alinear con contenido abajo
    border-bottom: 1px solid #e9ecef;
    margin-bottom: 15px;
    font-size: 14px;
    font-weight: 600;
    color: #666;
`;

const TimeSlot = styled.div`
    display: flex;
    position: relative;
    padding: 15px 0;
    min-height: 60px; // Altura mínima para cada slot

    &:not(:last-child)::after {
        content: '';
        position: absolute;
        left: 24px; // Alineado con el centro del marcador
        top: 40px; // Empezar después del marcador
        bottom: -15px; // Conectar hasta el siguiente slot
        width: 2px;
        background-color: #e9ecef; 
        z-index: 0;
    }
`;

const TimeMarker = styled.div`
    flex-shrink: 0;
    width: 50px;
    padding-right: 10px;
    text-align: right;
    font-size: 13px;
    color: #888;
    position: relative;
    z-index: 1;
    padding-top: 2px;

    &::before {
        content: '';
        position: absolute;
        top: 5px;
        right: -11px; // Centrado en la línea (10px padding + 2px width / 2)
        width: 8px;
        height: 8px;
        background-color: #adb5bd;
        border-radius: 50%;
        border: 2px solid white;
    }
`;

const EventsList = styled.div`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding-left: 15px; // Espacio desde la línea
    position: relative;
    z-index: 1;
`;

// Event Item Styling (similar a captura)
const EventItem = styled(Link)`
    display: flex;
    align-items: center;
    gap: 12px;
    background-color: #f8f9fa;
    padding: 12px;
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.07);
    text-decoration: none;
    color: inherit;
    transition: background-color 0.2s;

    &:hover {
        background-color: #e9ecef;
    }
`;

const EventAvatar = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    flex-shrink: 0;
    object-fit: cover;
`;

const EventInfo = styled.div`
    flex-grow: 1;
    overflow: hidden;
`;

const EventEducatorName = styled.div`
    font-size: 14px;
    font-weight: 600;
    color: #333;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-bottom: 2px;
`;

const EventCategory = styled.div`
    font-size: 12px;
    color: #666;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const EventVideoIcon = styled(FaVideo)`
    font-size: 18px;
    color: #007bff;
    flex-shrink: 0;
    margin-left: auto; // Empujar a la derecha
`;

// Componente personalizado para eventos en la vista mensual (COMENTADO TEMPORALMENTE)
/*
const MonthEvent = ({ event }) => (
  <div style={{ fontSize: '11px', lineHeight: '1.2' }}>
    <strong>{format(event.start, 'HH:mm')}</strong> - {event.title}
    <br />
    <span style={{ color: '#555' }}>{event.educatorName}</span>
  </div>
);
*/

// --- Component Logic ---

const Calendar = () => {
    const { t, i18n } = useTranslation();
    // Estado común para la fecha (usado por ambas vistas para saber el mes/día inicial)
    const [currentDate, setCurrentDate] = useState(new Date(2025, 3, 24));
    
    // --- Lógica para VISTA MÓVIL (Timeline Semanal) ---
    const [selectedDateMobile, setSelectedDateMobile] = useState(currentDate);
    const [weekDates, setWeekDates] = useState([]);
    const [groupedEventsMobile, setGroupedEventsMobile] = useState({});

    useEffect(() => {
      const start = new Date(selectedDateMobile);
      start.setDate(selectedDateMobile.getDate() - selectedDateMobile.getDay()); // Domingo
      const dates = [];
      for (let i = 0; i < 7; i++) {
        const date = new Date(start);
        date.setDate(start.getDate() + i);
        dates.push(date);
      }
      setWeekDates(dates);

      // Agrupar eventos para la fecha seleccionada en móvil
      const key = format(selectedDateMobile, 'yyyy-MM-dd');
      const eventsForDay = scheduleData[key] || [];
      const grouped = eventsForDay.reduce((acc, event) => {
        const hourKey = event.time.split(':')[0]; // Agrupar por hora
        if (!acc[hourKey]) acc[hourKey] = [];
        const educator = findEducatorById(event.educatorId);
        acc[hourKey].push({
          ...event,
          educatorName: educator?.name || 'N/A',
          educatorImage: educator?.profileImageFilename ? `/images/perfil/${educator.profileImageFilename}` : '/images/placeholder.jpg',
        });
        return acc;
      }, {});
      // Ordenar eventos dentro de cada hora por tiempo exacto
      for(const hour in grouped) {
          grouped[hour].sort((a, b) => a.time.localeCompare(b.time));
      }
      setGroupedEventsMobile(grouped);

    }, [selectedDateMobile]);
    
    const handleDateSelectMobile = (date) => {
      setSelectedDateMobile(date);
    };

    const getDayNameMobile = (date) => {
        return date.toLocaleDateString(i18n.language, { weekday: 'short' }).toUpperCase();
    };
    const hoursToShowMobile = Array.from({ length: 16 }, (_, i) => 8 + i); // 8 AM a 11 PM

    // --- Lógica para VISTA DESKTOP (Mensual con react-big-calendar) ---
    const eventsForBigCalendar = useMemo(() => {
      const allEvents = [];
      Object.keys(scheduleData).forEach(dateKey => {
        scheduleData[dateKey].forEach(event => {
          const eventDate = parse(dateKey, 'yyyy-MM-dd', new Date());
          const [hours, minutes] = event.time.split(':');
          const start = new Date(eventDate.getFullYear(), eventDate.getMonth(), eventDate.getDate(), parseInt(hours), parseInt(minutes));
          // Asumimos duración de 1 hora por defecto, ajustar si es necesario
          const end = new Date(start.getTime() + 60 * 60 * 1000);
          const educator = findEducatorById(event.educatorId);

          allEvents.push({
            title: event.title,
            start,
            end,
            allDay: false, // Indicar que no son eventos de todo el día
            resource: event.educatorId, // Guardar ID para posible enlace/info
            educatorName: educator?.name || 'N/A', // Añadir nombre para tooltip/vista
          });
        });
      });
      return allEvents;
    }, []); // Depende de scheduleData, que es constante aquí

    const handleNavigateDesktop = (newDate) => {
      setCurrentDate(newDate);
    };

    const currentLocale = i18n.language.split('-')[0]; // 'es' o 'en'

    return (
        <PageContainer>
            <BannerImage src="/images/NVU-EDU-DAY-HERO.webp" alt="NVU Education Day" />

            <MobileViewContainer>
                <ContentWrapper>
                    <PageTitle>{t('calendar.pageTitle')}</PageTitle>
                    <DaySelectorContainer>
                        {weekDates.map((date, index) => (
                            <DayButton
                                key={index}
                                active={format(date, 'yyyy-MM-dd') === format(selectedDateMobile, 'yyyy-MM-dd')}
                                onClick={() => handleDateSelectMobile(date)}
                            >
                                {getDayNameMobile(date)}
                                <DayNumber>{format(date, 'd')}</DayNumber>
                            </DayButton>
                        ))}
                    </DaySelectorContainer>

                    <ScheduleContainer>
                      <ScheduleHeader>
                        <span>{t('calendar.timeHeader')}</span>
                        <span>{t('calendar.educatorHeader')}</span>
                      </ScheduleHeader>
                      {hoursToShowMobile.map(hour => {
                        const hourKey = String(hour).padStart(2, '0');
                        const eventsInHour = groupedEventsMobile[hourKey.split(':')[0]] || [];
                        if (eventsInHour.length > 0) {
                          return (
                            <TimeSlot key={hour}>
                                <TimeMarker>{`${hourKey}:00`}</TimeMarker>
                                <EventsList>
                                    {eventsInHour.map((event, idx) => (
                                        <EventItem key={idx} to={`/educadores/${event.educatorId}`}>
                                            <EventAvatar src={event.educatorImage} alt={event.educatorName} />
                                            <EventInfo>
                                                <EventEducatorName>{event.educatorName}</EventEducatorName>
                                                <EventCategory>{event.title}</EventCategory>
                                            </EventInfo>
                                            <EventVideoIcon />
                                        </EventItem>
                                    ))}
                                </EventsList>
                            </TimeSlot>
                          );
                        }
                        return null;
                      })}
                      {Object.keys(groupedEventsMobile).length === 0 && (
                         <p style={{ textAlign: 'center', padding: '20px', color: '#777' }}>{t('calendar.noEvents')}</p>
                      )}
                    </ScheduleContainer>
                </ContentWrapper>
            </MobileViewContainer>

            <DesktopViewContainer>
                 <BigCalendar
                    localizer={localizer}
                    events={eventsForBigCalendar}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: '75vh' }} // Poner una altura aquí directamente puede funcionar mejor
                    view="month"
                    onView={() => {}}
                    date={currentDate}
                    onNavigate={handleNavigateDesktop}
                    culture={currentLocale}
                    messages={{
                      month: t('calendar.month'),
                      week: t('calendar.week'),
                      day: t('calendar.day'),
                      today: t('calendar.today'),
                      previous: t('calendar.previous'),
                      next: t('calendar.next'),
                      noEventsInRange: t('calendar.noEvents'),
                    }}
                    // Quitar componente personalizado temporalmente
                    /*
                    components={{
                      event: MonthEvent,
                    }}
                    */
                 />
            </DesktopViewContainer>

        </PageContainer>
    );
};

export default Calendar;