import styled, { keyframes } from "styled-components";

// Animations
export const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

export const shake = keyframes`
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
`;

export const timerPulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
`;

export const correctFlash = keyframes`
  0% { background-color: transparent; }
  50% { background-color: rgba(34, 197, 94, 0.3); }
  100% { background-color: transparent; }
`;

export const wrongFlash = keyframes`
  0% { background-color: transparent; }
  50% { background-color: rgba(239, 68, 68, 0.3); }
  100% { background-color: transparent; }
`;

// Styled Components
export const QuizContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, var(--gray-50) 0%, var(--gray-100) 100%);
  padding: var(--space-6);
  font-family: var(--font-family-sans);
  
  @media (max-width: 768px) {
    padding: var(--space-4);
  }
`;

export const Header = styled.div`
  text-align: center;
  margin-bottom: var(--space-8);
  animation: ${fadeIn} 0.8s ease-out;
`;

export const Title = styled.h1`
  font-family: var(--font-family-display);
  font-size: var(--text-4xl);
  font-weight: 800;
  background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: var(--space-4);
  
  @media (max-width: 768px) {
    font-size: var(--text-3xl);
  }
`;

export const Subtitle = styled.p`
  font-size: var(--text-xl);
  color: var(--gray-600);
  margin-bottom: var(--space-6);
  
  @media (max-width: 768px) {
    font-size: var(--text-lg);
  }
`;

export const GameArea = styled.div`
  max-width: 1600px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 350px 1fr;
  gap: var(--space-8);
  
  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
    gap: var(--space-6);
  }
`;

export const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
  animation: ${fadeIn} 0.8s ease-out 0.2s both;
  position: sticky;
  top: 6.5rem;
  align-self: flex-start;
  max-height: calc(100vh - 7rem);
  overflow-y: auto;
  
  @media (max-width: 1200px) {
    order: -1;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    position: static;
    max-height: none;
    overflow-y: visible;
  }
`;

export const StatsCard = styled.div`
  background: var(--white);
  border-radius: var(--radius-xl);
  padding: var(--space-6);
  box-shadow: var(--shadow-md);
  border: 1px solid var(--gray-200);
  transition: all var(--transition-normal);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
  }
`;

export const StatTitle = styled.h3`
  font-family: var(--font-family-display);
  font-size: var(--text-lg);
  font-weight: 600;
  color: var(--gray-900);
  margin-bottom: var(--space-4);
  display: flex;
  align-items: center;
  gap: var(--space-2);
`;

export const StatValue = styled.div`
  font-size: var(--text-2xl);
  font-weight: 700;
  color: var(--primary-color);
  margin-bottom: var(--space-2);
`;

export const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background-color: var(--gray-200);
  border-radius: var(--radius-lg);
  overflow: hidden;
  margin: var(--space-3) 0;
`;

export const ProgressFill = styled.div`
  height: 100%;
  background: linear-gradient(90deg, var(--primary-color), var(--accent-color));
  border-radius: var(--radius-lg);
  transition: width var(--transition-normal);
  width: ${props => props.$percentage}%;
`;

export const MainContent = styled.div`
  background: var(--white);
  border-radius: var(--radius-2xl);
  padding: var(--space-8);
  box-shadow: var(--shadow-lg);
  border: 1px solid var(--gray-200);
  animation: ${fadeIn} 0.8s ease-out 0.4s both;
  position: relative;
  overflow: hidden;
`;

export const QuestionSection = styled.div`
  text-align: center;
  margin-bottom: var(--space-6);
  padding: var(--space-6);
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.05), rgba(147, 51, 234, 0.05));
  border-radius: var(--radius-xl);
  border: 2px solid var(--primary-color);
`;

export const QuestionText = styled.h2`
  font-family: var(--font-family-display);
  font-size: var(--text-2xl);
  font-weight: 600;
  color: var(--gray-900);
  margin-bottom: var(--space-4);
  animation: ${slideIn} 0.5s ease-out;
  
  @media (max-width: 768px) {
    font-size: var(--text-xl);
  }
`;

export const CountryDisplay = styled.div`
  font-size: var(--text-3xl);
  font-weight: 700;
  color: var(--primary-color);
  margin: var(--space-4) 0;
  animation: ${pulse} 2s infinite;
  
  @media (max-width: 768px) {
    font-size: var(--text-2xl);
  }
`;

export const TimerDisplay = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  margin-bottom: var(--space-4);
  font-size: var(--text-lg);
  font-weight: 600;
  color: ${props => props.urgent ? 'var(--error-color)' : 'var(--gray-600)'};
`;

export const AttemptIndicator = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  margin-top: var(--space-2);
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: var(--space-4);
  justify-content: center;
  margin-bottom: var(--space-6);
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const ActionButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-6);
  font-size: var(--text-base);
  font-weight: 600;
  border: none;
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: all var(--transition-fast);
  text-decoration: none;
  white-space: nowrap;
  min-width: 140px;
  
  ${props => props.$primary ? `
    background: linear-gradient(135deg, var(--primary-color), var(--primary-hover));
    color: var(--white);
    
    &:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: var(--shadow-lg);
    }
  ` : `
    background: var(--gray-200);
    color: var(--gray-700);
    
    &:hover:not(:disabled) {
      background: var(--gray-300);
      transform: translateY(-1px);
    }
  `}
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none !important;
  }
  
  &:active {
    transform: translateY(0);
  }
  
  @media (max-width: 768px) {
    width: 100%;
    max-width: 200px;
  }
`;

export const MapContainer = styled.div`
  position: relative;
  margin: var(--space-6) 0;
  border-radius: var(--radius-xl);
  overflow: hidden;
  box-shadow: var(--shadow-lg);
  border: 2px solid var(--gray-200);
  transition: all var(--transition-normal);
  
  &:hover {
    box-shadow: var(--shadow-xl);
  }
`;

export const CompletionModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: ${fadeIn} 0.3s ease-out;
`;

export const ModalContent = styled.div`
  background: var(--white);
  border-radius: var(--radius-2xl);
  padding: var(--space-8);
  max-width: 600px;
  width: 90%;
  text-align: center;
  box-shadow: var(--shadow-xl);
  animation: ${pulse} 0.6s ease-out;
`;

export const ModalStats = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: var(--space-4);
  margin: var(--space-6) 0;
  padding: var(--space-4);
  background: var(--gray-50);
  border-radius: var(--radius-lg);
`;

export const ModalStatItem = styled.div`
  text-align: center;
`;

export const ModalStatValue = styled.div`
  font-size: var(--text-2xl);
  font-weight: 700;
  color: ${props => props.color || 'var(--primary-color)'};
  margin-bottom: var(--space-1);
`;

export const ModalStatLabel = styled.div`
  font-size: var(--text-sm);
  color: var(--gray-600);
  font-weight: 500;
`;

export const ModalTitle = styled.h2`
  font-family: var(--font-family-display);
  font-size: var(--text-3xl);
  font-weight: 700;
  color: var(--primary-color);
  margin-bottom: var(--space-4);
`;

export const ModalText = styled.p`
  font-size: var(--text-lg);
  color: var(--gray-600);
  margin-bottom: var(--space-6);
  line-height: 1.6;
`;

export const FloatingTooltip = styled.div`
  position: fixed;
  border: 2px solid var(--primary-color);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  background: linear-gradient(145deg, var(--white), var(--gray-50));
  padding: var(--space-3) var(--space-4);
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--gray-900);
  pointer-events: none;
  z-index: 1000;
  max-width: 300px;
  animation: ${fadeIn} 0.2s ease-out;
`;
