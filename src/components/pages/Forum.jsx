import React, { useState } from 'react';
import styled from 'styled-components';
import { MdSearch, MdFilterList, MdChatBubbleOutline, MdKeyboardBackspace } from 'react-icons/md';
import { useTranslation } from 'react-i18next';

const PageContainer = styled.div`
  padding: 0 20px 20px 20px;
  background-color: #f7f9fc;
  min-height: calc(100vh - 64px);
`;

const ContentContainer = styled.div`
  display: flex;
  gap: 20px;
  
  @media (max-width: 992px) {
    flex-direction: column;
  }
`;

const MainContent = styled.div`
  flex: 1;
`;

const SideContent = styled.div`
  width: 350px;
  flex-shrink: 0;
  
  @media (max-width: 992px) {
    width: 100%;
  }
`;

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const PageTitle = styled.h1`
  font-size: 24px;
  color: #333;
  font-weight: 600;
`;

const PostInput = styled.div`
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 15px;
  margin-bottom: 20px;
`;

const TextInput = styled.input`
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 14px;
  outline: none;
  
  &::placeholder {
    color: #666;
  }
  
  &:focus {
    border-color: #0088cc;
  }
`;

const SubmitButton = styled.button`
  padding: 8px 16px;
  background-color: #1a1a2e;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  float: right;
  margin-top: 10px;
  cursor: pointer;
  
  &:hover {
    background-color: #0d0d1a;
  }
`;

const FeedContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const PostCard = styled.div`
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const PostContent = styled.div`
  padding: 15px;
`;

const PostHeader = styled.div`
  display: flex;
  margin-bottom: 15px;
`;

const CryptoIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #f7f9fc;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
  font-weight: bold;
`;

const CryptoDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const CryptoName = styled.span`
  font-weight: bold;
`;

const CryptoSymbol = styled.span`
  font-size: 0.9em;
  color: #666;
`;

const CryptoPrice = styled.div`
  margin-left: auto;
  text-align: right;
`;

const Price = styled.div`
  font-weight: bold;
  font-size: 1.1em;
`;

const PriceChange = styled.div`
  color: ${props => props.positive ? '#16c784' : '#ea3943'};
  font-size: 0.9em;
`;

const PostTitle = styled.h2`
  font-size: 18px;
  margin-bottom: 10px;
  font-weight: 600;
  color: #333;
`;

const PostImage = styled.div`
  width: 100%;
  height: 120px;
  background-color: #f7f9fc;
  margin-bottom: 15px;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const TagsContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 15px;
`;

const Tag = styled.span`
  padding: 4px 10px;
  background-color: #f0f0f0;
  border-radius: 15px;
  font-size: 0.8em;
  color: #666;
`;

const AuthorSection = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const AuthorAvatar = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #eee;
  margin-right: 10px;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const AuthorInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const AuthorName = styled.span`
  font-weight: 500;
  font-size: 0.9em;
`;

const PostTime = styled.span`
  font-size: 0.8em;
  color: #666;
`;

const PostFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 10px 15px;
  border-top: 1px solid #f0f0f0;
`;

const CommentCount = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  color: #666;
  font-size: 0.9em;
`;

const SidebarCard = styled.div`
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 15px;
  margin-bottom: 20px;
`;

const SidebarTitle = styled.h2`
  font-size: 18px;
  margin-bottom: 15px;
  font-weight: 600;
  color: #333;
`;

const NewsItem = styled.div`
  margin-bottom: 15px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const NewsImage = styled.div`
  width: 100%;
  height: 120px;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 10px;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const NewsTitle = styled.h3`
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 5px;
  color: #333;
`;

const NewsContent = styled.p`
  font-size: 14px;
  color: #666;
  line-height: 1.4;
`;

const NewsTime = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #666;
  margin-top: 5px;
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 5px;
  background: none;
  border: none;
  color: #666;
  font-size: 16px;
  cursor: pointer;
  margin-bottom: 15px;
  
  &:hover {
    color: #0088cc;
  }
`;

// Componente de detalle del post
const PostDetail = ({ post, onBack }) => {
  return (
    <div>
      <BackButton onClick={onBack}>
        <MdKeyboardBackspace /> Volver al foro
      </BackButton>
      
      <PostCard>
        <PostContent>
          <PostHeader>
            <CryptoIcon>
              <span>{post.crypto.symbol.charAt(0)}</span>
            </CryptoIcon>
            <CryptoDetails>
              <CryptoName>{post.crypto.name}</CryptoName>
              <CryptoSymbol>{post.crypto.symbol}</CryptoSymbol>
            </CryptoDetails>
            <CryptoPrice>
              <Price>{post.crypto.price}</Price>
              <PriceChange positive={post.crypto.change > 0}>
                {post.crypto.change > 0 ? '+' : ''}{post.crypto.change}%
              </PriceChange>
            </CryptoPrice>
          </PostHeader>
          
          <PostTitle>{post.title}</PostTitle>
          
          <AuthorSection>
            <AuthorAvatar>
              <img src={post.author.avatar} alt={post.author.name} />
            </AuthorAvatar>
            <AuthorInfo>
              <AuthorName>{post.author.name}</AuthorName>
              <PostTime>Hace {post.time}</PostTime>
            </AuthorInfo>
          </AuthorSection>
          
          <TagsContainer>
            {post.tags.map((tag, index) => (
              <Tag key={index}>{tag}</Tag>
            ))}
          </TagsContainer>
          
          <PostImage>
            <img src={post.image} alt={post.title} />
          </PostImage>
          
          <div>
            <p style={{ lineHeight: '1.6', fontSize: '14px', color: '#333', marginBottom: '15px' }}>
              {post.content || 'Este post muestra información sobre las mejores prácticas para desarrolladores de blockchain en innovationchain. Se discuten las últimas tendencias y tecnologías para el desarrollo eficiente de soluciones basadas en blockchain.'}
            </p>
            <p style={{ lineHeight: '1.6', fontSize: '14px', color: '#333' }}>
              Las tecnologías blockchain continúan evolucionando rápidamente, y los desarrolladores deben mantenerse al día con las últimas herramientas y metodologías para crear aplicaciones eficientes y seguras.
            </p>
          </div>
        </PostContent>
        
        <PostFooter>
          <CommentCount>
            <MdChatBubbleOutline /> {post.comments} comentarios
          </CommentCount>
        </PostFooter>
      </PostCard>
    </div>
  );
};

const Forum = () => {
  const { t } = useTranslation();
  const [selectedPost, setSelectedPost] = useState(null);
  
  // Datos de ejemplo para el feed
  const posts = [
    {
      id: 1,
      title: 'Mejores prácticas para desarrolladores de blockchain en innovationchain',
      crypto: {
        name: 'Bitcoin',
        symbol: 'BTC',
        price: '$20,788',
        change: 0.25
      },
      image: 'https://via.placeholder.com/350x150',
      tags: ['Finanzas', 'Bitcoin', 'Crypto'],
      author: {
        name: 'Cristian Andrés Salazar',
        avatar: 'https://via.placeholder.com/30'
      },
      time: '3 meses',
      comments: 56
    },
    {
      id: 2,
      title: 'Mejores prácticas para desarrolladores de blockchain en innovationchain',
      crypto: {
        name: 'Bitcoin',
        symbol: 'BTC',
        price: '$20,788',
        change: 0.25
      },
      image: 'https://via.placeholder.com/350x150',
      tags: ['Finanzas', 'Bitcoin', 'Crypto'],
      author: {
        name: 'Cristian Andrés Salazar',
        avatar: 'https://via.placeholder.com/30'
      },
      time: '3 meses',
      comments: 56
    },
    {
      id: 3,
      title: 'Mejores prácticas para desarrolladores de blockchain en innovationchain',
      crypto: {
        name: 'Bitcoin',
        symbol: 'BTC',
        price: '$20,788',
        change: 0.25
      },
      image: 'https://via.placeholder.com/350x150',
      tags: ['Finanzas', 'Bitcoin', 'Crypto'],
      author: {
        name: 'Cristian Andrés Salazar',
        avatar: 'https://via.placeholder.com/30'
      },
      time: '3 meses',
      comments: 56
    },
    {
      id: 4,
      title: 'Mejores prácticas para desarrolladores de blockchain en innovationchain',
      crypto: {
        name: 'Bitcoin',
        symbol: 'BTC',
        price: '$20,788',
        change: 0.25
      },
      image: 'https://via.placeholder.com/350x150',
      tags: ['Finanzas', 'Bitcoin', 'Crypto'],
      author: {
        name: 'Cristian Andrés Salazar',
        avatar: 'https://via.placeholder.com/30'
      },
      time: '3 meses',
      comments: 56
    },
    {
      id: 5,
      title: 'Mejores prácticas para desarrolladores de blockchain en innovationchain',
      crypto: {
        name: 'Bitcoin',
        symbol: 'BTC',
        price: '$20,788',
        change: 0.25
      },
      image: 'https://via.placeholder.com/350x150',
      tags: ['Finanzas', 'Bitcoin', 'Crypto'],
      author: {
        name: 'Cristian Andrés Salazar',
        avatar: 'https://via.placeholder.com/30'
      },
      time: '3 meses',
      comments: 56
    }
  ];

  // Noticia reciente para la barra lateral
  const recentNews = {
    title: 'Reserva de divisas',
    image: '/images/81.png',
    content: 'En marzo de 2025, el presidente de Estados Unidos, Donald Trump, firmó una orden ejecutiva para establecer una Reserva Estratégica de Bitcoin y una Reserva de Activos Digitales...',
    time: '2:00 Am',
    source: 'Swiss National Bank'
  };

  const handlePostClick = (post) => {
    setSelectedPost(post);
  };

  const handleBackToForum = () => {
    setSelectedPost(null);
  };

  return (
    <PageContainer>
      {selectedPost ? (
        <PostDetail post={selectedPost} onBack={handleBackToForum} />
      ) : (
        <>
          <PageHeader>
            <PageTitle>{t('sidebar.forum')}</PageTitle>
          </PageHeader>
          
          <ContentContainer>
            <MainContent>
              <PostInput>
                <TextInput placeholder="Escribe aquí tu post" />
                <SubmitButton>Enviar</SubmitButton>
                <div style={{ clear: 'both' }}></div>
              </PostInput>
              
              <FeedContainer>
                {posts.map(post => (
                  <PostCard key={post.id} onClick={() => handlePostClick(post)} style={{ cursor: 'pointer' }}>
                    <PostContent>
                      <PostHeader>
                        <CryptoIcon>
                          <span>{post.crypto.symbol.charAt(0)}</span>
                        </CryptoIcon>
                        <CryptoDetails>
                          <CryptoName>{post.crypto.name}</CryptoName>
                          <CryptoSymbol>{post.crypto.symbol}</CryptoSymbol>
                        </CryptoDetails>
                        <CryptoPrice>
                          <Price>{post.crypto.price}</Price>
                          <PriceChange positive={post.crypto.change > 0}>
                            {post.crypto.change > 0 ? '+' : ''}{post.crypto.change}%
                          </PriceChange>
                        </CryptoPrice>
                      </PostHeader>
                      
                      <PostTitle>{post.title}</PostTitle>
                      
                      <TagsContainer>
                        {post.tags.map((tag, index) => (
                          <Tag key={index}>{tag}</Tag>
                        ))}
                      </TagsContainer>
                      
                      <AuthorSection>
                        <AuthorAvatar>
                          <img src={post.author.avatar} alt={post.author.name} />
                        </AuthorAvatar>
                        <AuthorInfo>
                          <AuthorName>{post.author.name}</AuthorName>
                          <PostTime>Hace {post.time}</PostTime>
                        </AuthorInfo>
                      </AuthorSection>
                      
                      <PostImage>
                        <img src={post.image} alt={post.title} />
                      </PostImage>
                    </PostContent>
                    
                    <PostFooter>
                      <CommentCount>
                        <MdChatBubbleOutline /> {post.comments} comentarios
                      </CommentCount>
                    </PostFooter>
                  </PostCard>
                ))}
              </FeedContainer>
            </MainContent>
            
            <SideContent>
              <SidebarCard>
                <SidebarTitle>Noticias</SidebarTitle>
                <NewsItem>
                  <BackButton 
                    as="a" 
                    href="#" 
                    onClick={(e) => { e.preventDefault(); }}
                    style={{ margin: '0 0 10px 0' }}
                  >
                    <MdKeyboardBackspace /> {recentNews.title}
                  </BackButton>
                  <NewsImage>
                    <img src={recentNews.image} alt={recentNews.title} />
                  </NewsImage>
                  <NewsContent>
                    {recentNews.content}
                  </NewsContent>
                  <NewsTime>
                    <span>{recentNews.time}</span>
                    <span>Fuente: {recentNews.source}</span>
                  </NewsTime>
                </NewsItem>
              </SidebarCard>
            </SideContent>
          </ContentContainer>
        </>
      )}
    </PageContainer>
  );
};

export default Forum;