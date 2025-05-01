import React, { useState } from 'react';
import styled from 'styled-components';
import { MdSearch, MdFilterList, MdChatBubbleOutline, MdVisibility, MdThumbUp, MdAdd } from 'react-icons/md';

const PageContainer = styled.div`
  padding: 24px;
`;

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const PageTitle = styled.h1`
  font-size: 28px;
  color: #333;
`;

const NewTopicButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background-color: #0088cc;
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  
  &:hover {
    background-color: #0077b3;
  }
  
  svg {
    font-size: 20px;
  }
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

const CategoryTabs = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  border-bottom: 1px solid #eee;
  padding-bottom: 12px;
`;

const CategoryTab = styled.button`
  font-size: 16px;
  font-weight: ${props => props.active ? '600' : '400'};
  color: ${props => props.active ? '#0088cc' : '#666'};
  padding: 8px 16px;
  background: ${props => props.active ? '#e6f7ff' : 'transparent'};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    color: #0088cc;
    background: ${props => props.active ? '#e6f7ff' : '#f5f5f5'};
  }
`;

const TopicsContainer = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  overflow: hidden;
`;

const TopicItem = styled.div`
  display: flex;
  padding: 16px;
  border-bottom: 1px solid #f0f0f0;
  
  &:last-child {
    border-bottom: none;
  }
  
  &:hover {
    background-color: #f9f9f9;
  }
`;

const TopicAvatar = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: #f0f0f0;
  margin-right: 16px;
  
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
  }
`;

const TopicContent = styled.div`
  flex: 1;
`;

const TopicTitle = styled.h3`
  font-size: 18px;
  margin-bottom: 4px;
  color: #333;
  
  a {
    text-decoration: none;
    color: inherit;
    
    &:hover {
      color: #0088cc;
    }
  }
`;

const TopicMeta = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 8px;
`;

const TopicMetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: #666;
  
  svg {
    color: #0088cc;
  }
`;

const TopicPreview = styled.p`
  font-size: 14px;
  color: #555;
  line-height: 1.5;
  margin-bottom: 8px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const TopicStats = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-left: auto;
  padding-left: 16px;
`;

const TopicStat = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 60px;
`;

const StatValue = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: #0088cc;
`;

const StatLabel = styled.div`
  font-size: 12px;
  color: #666;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 24px;
`;

const PageButton = styled.button`
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 4px;
  border-radius: 4px;
  border: 1px solid ${props => props.active ? '#0088cc' : '#ddd'};
  background-color: ${props => props.active ? '#0088cc' : 'white'};
  color: ${props => props.active ? 'white' : '#333'};
  font-weight: ${props => props.active ? '600' : '400'};
  cursor: pointer;
  
  &:hover {
    background-color: ${props => props.active ? '#0088cc' : '#f5f5f5'};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

// Mock data for forum topics
const topicsData = [
  {
    id: 1,
    title: '¿Cuál es vuestra estrategia para invertir en el sector tecnológico?',
    author: 'Carlos Rodríguez',
    date: '15 Abr 2025',
    category: 'Inversiones',
    preview: 'Estoy interesado en conocer qué estrategias utilizáis para invertir en el sector tecnológico. ¿Preferís las grandes empresas establecidas o apostáis por startups con potencial?',
    replies: 24,
    views: 158,
    likes: 36
  },
  {
    id: 2,
    title: 'Análisis técnico del EUR/USD - Perspectivas para 2025',
    author: 'Laura Martínez',
    date: '14 Abr 2025',
    category: 'Trading',
    preview: 'Comparto un análisis técnico del par EUR/USD con proyecciones para el resto del año 2025. Me gustaría conocer vuestras opiniones y perspectivas para este par.',
    replies: 18,
    views: 142,
    likes: 28
  },
  {
    id: 3,
    title: 'Mejores zonas para invertir en Real Estate en España',
    author: 'Manuel López',
    date: '12 Abr 2025',
    category: 'Real Estate',
    preview: '¿Cuáles consideráis que son las mejores zonas para invertir en inmuebles en España actualmente? ¿Grandes ciudades, costa, o quizás zonas rurales con potencial turístico?',
    replies: 32,
    views: 215,
    likes: 44
  },
  {
    id: 4,
    title: 'Estrategias de ahorro e inversión para jóvenes',
    author: 'Ana García',
    date: '10 Abr 2025',
    category: 'Finanzas Personales',
    preview: 'Soy bastante joven (25 años) y quiero empezar a planificar mi futuro financiero. ¿Qué consejos daríais a alguien que empieza desde cero en esto de las inversiones?',
    replies: 42,
    views: 280,
    likes: 67
  },
  {
    id: 5,
    title: 'Opiniones sobre el curso de Análisis Fundamental',
    author: 'Roberto Sánchez',
    date: '8 Abr 2025',
    category: 'Academia',
    preview: 'Estoy pensando en inscribirme en el curso de Análisis Fundamental. ¿Alguien lo ha hecho ya? Me gustaría conocer vuestras opiniones y experiencias.',
    replies: 15,
    views: 118,
    likes: 22
  }
];

const Forum = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('todos');
  
  const categories = [
    { id: 'todos', name: 'Todos' },
    { id: 'inversiones', name: 'Inversiones' },
    { id: 'trading', name: 'Trading' },
    { id: 'realestate', name: 'Real Estate' },
    { id: 'finanzas', name: 'Finanzas Personales' },
    { id: 'academia', name: 'Academia' }
  ];
  
  return (
    <PageContainer>
      <PageHeader>
        <PageTitle>Foro</PageTitle>
        <NewTopicButton>
          <MdAdd />
          Nuevo tema
        </NewTopicButton>
      </PageHeader>
      
      <SearchContainer>
        <SearchInput>
          <MdSearch />
          <input 
            type="text" 
            placeholder="Buscar temas..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchInput>
        <FilterButton>
          <MdFilterList />
          Filtrar
        </FilterButton>
      </SearchContainer>
      
      <CategoryTabs>
        {categories.map(category => (
          <CategoryTab 
            key={category.id}
            active={activeCategory === category.id}
            onClick={() => setActiveCategory(category.id)}
          >
            {category.name}
          </CategoryTab>
        ))}
      </CategoryTabs>
      
      <TopicsContainer>
        {topicsData.map(topic => (
          <TopicItem key={topic.id}>
            <TopicAvatar>
              <img src={`/api/placeholder/48/48`} alt={topic.author} />
            </TopicAvatar>
            <TopicContent>
              <TopicTitle>
                <a href={`#/foro/topic/${topic.id}`}>{topic.title}</a>
              </TopicTitle>
              <TopicMeta>
                <TopicMetaItem>{topic.author}</TopicMetaItem>
                <TopicMetaItem>{topic.date}</TopicMetaItem>
                <TopicMetaItem>
                  <MdChatBubbleOutline />
                  {topic.category}
                </TopicMetaItem>
              </TopicMeta>
              <TopicPreview>{topic.preview}</TopicPreview>
            </TopicContent>
            <TopicStats>
              <TopicStat>
                <StatValue>{topic.replies}</StatValue>
                <StatLabel>Respuestas</StatLabel>
              </TopicStat>
              <TopicStat>
                <StatValue>{topic.views}</StatValue>
                <StatLabel>Vistas</StatLabel>
              </TopicStat>
              <TopicStat>
                <StatValue>{topic.likes}</StatValue>
                <StatLabel>Likes</StatLabel>
              </TopicStat>
            </TopicStats>
          </TopicItem>
        ))}
      </TopicsContainer>
      
      <Pagination>
        <PageButton disabled>«</PageButton>
        <PageButton active>1</PageButton>
        <PageButton>2</PageButton>
        <PageButton>3</PageButton>
        <PageButton>4</PageButton>
        <PageButton>5</PageButton>
        <PageButton>»</PageButton>
      </Pagination>
    </PageContainer>
  );
};

export default Forum;