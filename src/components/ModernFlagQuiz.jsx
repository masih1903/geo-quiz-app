import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";

// Animations
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const pulse = keyframes`
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

const shake = keyframes`
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
`;

// Styled Components
const QuizContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, var(--gray-50) 0%, var(--gray-100) 100%);
  padding: var(--space-6);
  font-family: var(--font-family-sans);
  
  @media (max-width: 768px) {
    padding: var(--space-4);
  }
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: var(--space-8);
  animation: ${fadeIn} 0.8s ease-out;
`;

const Title = styled.h1`
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

const Subtitle = styled.p`
  font-size: var(--text-xl);
  color: var(--gray-600);
  margin-bottom: var(--space-6);
  
  @media (max-width: 768px) {
    font-size: var(--text-lg);
  }
`;

const GameArea = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 350px;
  gap: var(--space-8);
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: var(--space-6);
  }
`;

const MainContent = styled.div`
  background: var(--white);
  border-radius: var(--radius-2xl);
  padding: var(--space-8);
  box-shadow: var(--shadow-lg);
  border: 1px solid var(--gray-200);
  animation: ${fadeIn} 0.8s ease-out 0.2s both;
`;

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
  animation: ${fadeIn} 0.8s ease-out 0.4s both;
  
  @media (max-width: 1024px) {
    order: -1;
  }
`;

const StatsCard = styled.div`
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

const StatTitle = styled.h3`
  font-family: var(--font-family-display);
  font-size: var(--text-lg);
  font-weight: 600;
  color: var(--gray-900);
  margin-bottom: var(--space-4);
  display: flex;
  align-items: center;
  gap: var(--space-2);
`;

const StatValue = styled.div`
  font-size: var(--text-2xl);
  font-weight: 700;
  color: var(--primary-color);
  margin-bottom: var(--space-2);
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background-color: var(--gray-200);
  border-radius: var(--radius-lg);
  overflow: hidden;
  margin: var(--space-3) 0;
`;

const ProgressFill = styled.div`
  height: 100%;
  background: linear-gradient(90deg, var(--primary-color), var(--accent-color));
  border-radius: var(--radius-lg);
  transition: width var(--transition-normal);
  width: ${props => props.percentage}%;
`;

const QuestionSection = styled.div`
  text-align: center;
  margin-bottom: var(--space-8);
`;

const QuestionText = styled.h2`
  font-family: var(--font-family-display);
  font-size: var(--text-2xl);
  font-weight: 600;
  color: var(--gray-900);
  margin-bottom: var(--space-6);
  animation: ${slideIn} 0.5s ease-out;
  
  @media (max-width: 768px) {
    font-size: var(--text-xl);
  }
`;

const FlagGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: var(--space-4);
  margin-bottom: var(--space-6);
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    gap: var(--space-3);
  }
`;

const FlagCard = styled.div`
  background: var(--white);
  border-radius: var(--radius-lg);
  padding: var(--space-3);
  border: 2px solid ${props => 
    props.isCorrect ? 'var(--success-color)' : 
    props.isWrong ? 'var(--error-color)' : 
    'var(--gray-200)'
  };
  cursor: pointer;
  transition: all var(--transition-fast);
  position: relative;
  overflow: hidden;
  animation: ${props => props.shake ? shake : 'none'} 0.5s ease-in-out;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
    transition: left var(--transition-slow);
  }
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-lg);
    border-color: var(--primary-color);
    
    &::before {
      left: 100%;
    }
  }
  
  &:active {
    transform: translateY(-2px);
  }
  
  ${props => props.disabled && `
    opacity: 0.6;
    cursor: not-allowed;
    
    &:hover {
      transform: none;
      box-shadow: none;
      border-color: var(--gray-200);
    }
  `}
`;

const FlagImage = styled.img`
  width: 100%;
  height: 80px;
  object-fit: cover;
  border-radius: var(--radius-md);
  margin-bottom: var(--space-2);
  transition: all var(--transition-normal);
  
  ${FlagCard}:hover & {
    transform: scale(1.05);
  }
  
  @media (max-width: 768px) {
    height: 60px;
  }
`;

const CountryName = styled.p`
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--gray-700);
  text-align: center;
  margin: 0;
  line-height: 1.3;
  
  @media (max-width: 768px) {
    font-size: var(--text-xs);
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: var(--space-4);
  justify-content: center;
  margin-bottom: var(--space-6);
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const ActionButton = styled.button`
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
  
  ${props => props.primary ? `
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

const ResultsSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-6);
  margin-top: var(--space-8);
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: var(--space-4);
  }
`;

const ResultCard = styled.div`
  background: ${props => props.correct ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)'};
  border: 1px solid ${props => props.correct ? 'var(--success-color)' : 'var(--error-color)'};
  border-radius: var(--radius-xl);
  padding: var(--space-6);
`;

const ResultTitle = styled.h3`
  font-family: var(--font-family-display);
  font-size: var(--text-lg);
  font-weight: 600;
  color: ${props => props.correct ? 'var(--success-color)' : 'var(--error-color)'};
  margin-bottom: var(--space-4);
  display: flex;
  align-items: center;
  gap: var(--space-2);
`;

const ResultGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  gap: var(--space-3);
`;

const ResultFlag = styled.div`
  text-align: center;
  animation: ${slideIn} 0.5s ease-out;
`;

const ResultFlagImage = styled.img`
  width: 100%;
  height: 50px;
  object-fit: cover;
  border-radius: var(--radius-md);
  margin-bottom: var(--space-1);
`;

const ResultCountryName = styled.p`
  font-size: var(--text-xs);
  color: var(--gray-600);
  margin: 0;
  line-height: 1.2;
`;

const CompletionModal = styled.div`
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

const ModalContent = styled.div`
  background: var(--white);
  border-radius: var(--radius-2xl);
  padding: var(--space-8);
  max-width: 500px;
  width: 90%;
  text-align: center;
  box-shadow: var(--shadow-xl);
  animation: ${pulse} 0.6s ease-out;
`;

const ModalTitle = styled.h2`
  font-family: var(--font-family-display);
  font-size: var(--text-3xl);
  font-weight: 700;
  color: var(--primary-color);
  margin-bottom: var(--space-4);
`;

const ModalText = styled.p`
  font-size: var(--text-lg);
  color: var(--gray-600);
  margin-bottom: var(--space-6);
  line-height: 1.6;
`;

function ModernFlagQuiz({ continent, apiUrl, title }) {
  const [countries, setCountries] = useState([]);
  const [remainingCountries, setRemainingCountries] = useState([]);
  const [currentCountry, setCurrentCountry] = useState(null);
  const [correctGuesses, setCorrectGuesses] = useState([]);
  const [wrongGuesses, setWrongGuesses] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [shakeCard, setShakeCard] = useState(null);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(apiUrl)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch country data");
        }
        return res.json();
      })
      .then((data) => {
        const independentCountries = data.filter((country) => country.independent === true);
        setCountries(independentCountries);
        setRemainingCountries(independentCountries);
      })
      .catch((err) => {
        console.error("Error fetching countries:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [apiUrl]);

  const startGame = () => {
    setGameStarted(true);
    setGameCompleted(false);
    setCorrectGuesses([]);
    setWrongGuesses([]);
    setRemainingCountries(countries);
    selectRandomCountry(countries);
  };

  const selectRandomCountry = (availableCountries) => {
    if (availableCountries.length > 0) {
      const randomIndex = Math.floor(Math.random() * availableCountries.length);
      setCurrentCountry(availableCountries[randomIndex]);
      setAttempts(0);
    } else {
      setCurrentCountry(null);
      setGameCompleted(true);
      setShowCompletionModal(true);
    }
  };

  const handleFlagClick = (countryName) => {
    if (!currentCountry || gameCompleted) return;

    if (countryName === currentCountry.name.common) {
      // Correct answer
      setCorrectGuesses((prev) => [...prev, currentCountry]);
      const newRemaining = remainingCountries.filter(
        (country) => country.name.common !== countryName
      );
      setRemainingCountries(newRemaining);
      
      setTimeout(() => {
        selectRandomCountry(newRemaining);
      }, 1000);
    } else {
      // Wrong answer
      setAttempts((prev) => prev + 1);
      setShakeCard(countryName);
      
      setTimeout(() => {
        setShakeCard(null);
      }, 500);
      
      if (attempts + 1 >= 3) {
        // Max attempts reached
        setWrongGuesses((prev) => [...prev, currentCountry]);
        const newRemaining = remainingCountries.filter(
          (country) => country.name.common !== currentCountry.name.common
        );
        setRemainingCountries(newRemaining);
        
        setTimeout(() => {
          selectRandomCountry(newRemaining);
        }, 1500);
      }
    }
  };

  const resetGame = () => {
    setGameStarted(false);
    setGameCompleted(false);
    setCurrentCountry(null);
    setCorrectGuesses([]);
    setWrongGuesses([]);
    setRemainingCountries(countries);
    setAttempts(0);
    setShowCompletionModal(false);
  };

  const totalCountries = countries.length;
  const completedCountries = correctGuesses.length + wrongGuesses.length;
  const progressPercentage = totalCountries > 0 ? (completedCountries / totalCountries) * 100 : 0;
  const accuracy = completedCountries > 0 ? (correctGuesses.length / completedCountries) * 100 : 0;

  if (loading) {
    return (
      <QuizContainer>
        <Header>
          <Title>Loading {title}...</Title>
          <div className="loading-spinner" style={{ fontSize: '2rem', margin: '2rem 0' }}>⟳</div>
        </Header>
      </QuizContainer>
    );
  }

  return (
    <QuizContainer>
      <Header>
        <Title>{title}</Title>
        <Subtitle>
          {gameStarted && !gameCompleted
            ? `Identify the flag for: ${currentCountry?.name.common || 'Loading...'}`
            : `Test your knowledge of ${continent} flags!`}
        </Subtitle>
      </Header>

      <GameArea>
        <MainContent>
          {!gameStarted ? (
            <div style={{ textAlign: 'center', padding: 'var(--space-8)' }}>
              <h2 style={{ marginBottom: 'var(--space-6)', color: 'var(--gray-700)' }}>
                Ready to test your flag knowledge?
              </h2>
              <p style={{ marginBottom: 'var(--space-8)', color: 'var(--gray-600)', fontSize: 'var(--text-lg)' }}>
                You'll be shown flags from {continent} and need to identify the correct country.
                You have 3 attempts per flag. Good luck!
              </p>
              <ActionButton primary onClick={startGame}>
                🚀 Start Quiz
              </ActionButton>
            </div>
          ) : (
            <>
              {currentCountry && !gameCompleted && (
                <QuestionSection>
                  <QuestionText>
                    Which country does this flag belong to?
                    {attempts > 0 && (
                      <span style={{ color: 'var(--error-color)', fontSize: 'var(--text-base)' }}>
                        {' '}(Attempt {attempts + 1}/3)
                      </span>
                    )}
                  </QuestionText>
                </QuestionSection>
              )}

              <FlagGrid>
                {remainingCountries.map((country) => {
                  const isCorrect = correctGuesses.some(c => c.name.common === country.name.common);
                  const isWrong = wrongGuesses.some(c => c.name.common === country.name.common);
                  const shouldShake = shakeCard === country.name.common;
                  
                  return (
                    <FlagCard
                      key={country.name.common}
                      onClick={() => handleFlagClick(country.name.common)}
                      isCorrect={isCorrect}
                      isWrong={isWrong}
                      shake={shouldShake}
                      disabled={gameCompleted}
                    >
                      <FlagImage
                        src={country.flags.png || country.flagUrl}
                        alt={`Flag of ${country.name.common}`}
                        loading="lazy"
                      />
                    </FlagCard>
                  );
                })}
              </FlagGrid>

              <ActionButtons>
                <ActionButton onClick={resetGame}>
                  🔄 Reset Game
                </ActionButton>
                {gameCompleted && (
                  <ActionButton primary onClick={startGame}>
                    🎯 Play Again
                  </ActionButton>
                )}
              </ActionButtons>
            </>
          )}

          {(correctGuesses.length > 0 || wrongGuesses.length > 0) && (
            <ResultsSection>
              {correctGuesses.length > 0 && (
                <ResultCard correct>
                  <ResultTitle correct>
                    ✅ Correct Answers ({correctGuesses.length})
                  </ResultTitle>
                  <ResultGrid>
                    {correctGuesses.map((country, index) => (
                      <ResultFlag key={index}>
                        <ResultFlagImage
                          src={country.flags.png || country.flagUrl}
                          alt={`Flag of ${country.name.common}`}
                        />
                        <ResultCountryName>{country.name.common}</ResultCountryName>
                      </ResultFlag>
                    ))}
                  </ResultGrid>
                </ResultCard>
              )}

              {wrongGuesses.length > 0 && (
                <ResultCard>
                  <ResultTitle>
                    ❌ Missed Answers ({wrongGuesses.length})
                  </ResultTitle>
                  <ResultGrid>
                    {wrongGuesses.map((country, index) => (
                      <ResultFlag key={index}>
                        <ResultFlagImage
                          src={country.flags.png || country.flagUrl}
                          alt={`Flag of ${country.name.common}`}
                        />
                        <ResultCountryName>{country.name.common}</ResultCountryName>
                      </ResultFlag>
                    ))}
                  </ResultGrid>
                </ResultCard>
              )}
            </ResultsSection>
          )}
        </MainContent>

        <Sidebar>
          <StatsCard>
            <StatTitle>
              📊 Progress
            </StatTitle>
            <StatValue>{completedCountries}/{totalCountries}</StatValue>
            <ProgressBar>
              <ProgressFill percentage={progressPercentage} />
            </ProgressBar>
            <p style={{ color: 'var(--gray-600)', fontSize: 'var(--text-sm)', margin: 0 }}>
              {Math.round(progressPercentage)}% Complete
            </p>
          </StatsCard>

          <StatsCard>
            <StatTitle>
              🎯 Accuracy
            </StatTitle>
            <StatValue>{Math.round(accuracy)}%</StatValue>
            <p style={{ color: 'var(--gray-600)', fontSize: 'var(--text-sm)', margin: 0 }}>
              {correctGuesses.length} correct out of {completedCountries} attempts
            </p>
          </StatsCard>

          <StatsCard>
            <StatTitle>
              🏆 Score
            </StatTitle>
            <StatValue style={{ color: 'var(--success-color)' }}>
              {correctGuesses.length}
            </StatValue>
            <p style={{ color: 'var(--gray-600)', fontSize: 'var(--text-sm)', margin: 0 }}>
              Flags identified correctly
            </p>
          </StatsCard>
        </Sidebar>
      </GameArea>

      {showCompletionModal && (
        <CompletionModal onClick={() => setShowCompletionModal(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalTitle>🎉 Quiz Complete!</ModalTitle>
            <ModalText>
              Great job! You've completed the {continent} flag quiz.
              <br />
              <strong>Final Score: {correctGuesses.length}/{totalCountries}</strong>
              <br />
              Accuracy: {Math.round(accuracy)}%
            </ModalText>
            <ActionButtons>
              <ActionButton primary onClick={() => {
                setShowCompletionModal(false);
                startGame();
              }}>
                🎯 Play Again
              </ActionButton>
              <ActionButton onClick={() => setShowCompletionModal(false)}>
                ✨ Close
              </ActionButton>
            </ActionButtons>
          </ModalContent>
        </CompletionModal>
      )}
    </QuizContainer>
  );
}

export default ModernFlagQuiz;
