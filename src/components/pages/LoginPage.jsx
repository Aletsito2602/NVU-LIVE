import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// --- Styled Components ---

const LoginPageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -10px;
    left: -10px;
    right: -10px;
    bottom: -10px;
    background-image: url('/images/banner.png');
    background-size: cover;
    background-position: center;
    filter: blur(8px);
    z-index: -1;
  }
`;

const LoginFormCard = styled.div`
  padding: 40px;
  background: rgba(255, 255, 255, 0.85);
  border-radius: 15px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  width: 100%;
  max-width: 400px;
  text-align: center;
  position: relative;
  z-index: 1;
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const Title = styled.h1`
  margin-bottom: 30px;
  color: #333;
  font-size: 28px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Input = styled.input`
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  outline: none;
  transition: border-color 0.2s;

  &:focus {
    border-color: #007bff;
  }
`;

const Button = styled.button`
  padding: 15px;
  border: none;
  border-radius: 8px;
  background-color: #007bff;
  color: white;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  margin-top: 15px;
  font-size: 14px;
`;

const ResetLink = styled.p`
    margin-top: 20px;
    font-size: 14px;
    color: #555;
    a {
        color: #007bff;
        text-decoration: none;
        &:hover {
            text-decoration: underline;
        }
    }
`;


// --- Component ---

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    const api_url = 'https://api.nvu-integrations.com/v1/auth/nvu-live/sign-in';
    const body_data = { email, password };

    try {
      const response = await fetch(api_url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body_data),
      });

      const data = await response.json();

      if (response.ok && data?.nvulive?.status === 'Active') {
        console.log('Login successful:', data);
        
        const userData = data.nvulive;
        localStorage.setItem('nvuUserData', JSON.stringify({
          name: userData.customerName,
          id: userData.customerID
        }));
        
        navigate('/'); 
      } else {
        const apiErrorMessage = data?.message || 'Invalid credentials or inactive membership.';
        console.error('Login failed:', apiErrorMessage, data);
        let translatedError = t('login.error.generic');
        if (apiErrorMessage === 'FL2 membership expired.') {
          translatedError = t('login.error.expired');
        } else if (apiErrorMessage.includes('Invalid credentials')) {
            translatedError = t('login.error.invalidCredentials');
        }
        setError(translatedError);
      }
    } catch (err) {
      console.error('API connection error:', err);
      setError(t('login.error.connection'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginPageContainer>
      <LoginFormCard>
        <Title>{t('login.title')}</Title>
        <Form onSubmit={handleSubmit}>
          <Input
            type="email"
            placeholder={t('login.emailPlaceholder')}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
          <Input
            type="password"
            placeholder={t('login.passwordPlaceholder')}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
          <Button type="submit" disabled={loading}>
            {loading ? t('login.loadingButton') : t('login.loginButton')}
          </Button>
          {error && <ErrorMessage>{error}</ErrorMessage>}
        </Form>
         <ResetLink>
            {t('login.resetPasswordPrompt')} <a href="https://nvisionu.com/en-us/forgot-password" target="_blank" rel="noopener noreferrer">{t('login.resetPasswordLink')}</a>
        </ResetLink>
      </LoginFormCard>
    </LoginPageContainer>
  );
};

export default LoginPage; 