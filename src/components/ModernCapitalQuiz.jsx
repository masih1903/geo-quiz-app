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

const timerPulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
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
  margin-bottom: var(--space-2);
  animation: ${slideIn} 0.5s ease-out;
  
  @media (max-width: 768px) {
    font-size: var(--text-xl);
  }
`;

const CapitalName = styled.div`
  font-size: var(--text-3xl);
  font-weight: 700;
  color: var(--primary-color);
  margin: var(--space-4) 0;
  padding: var(--space-4);
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1));
  border-radius: var(--radius-xl);
  border: 2px solid var(--primary-color);
  animation: ${pulse} 2s infinite;
  
  @media (max-width: 768px) {
    font-size: var(--text-2xl);
  }
`;

const OptionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--space-4);
  margin-bottom: var(--space-6);
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: var(--space-3);
  }
`;

const OptionCard = styled.div`
  background: var(--white);
  border-radius: var(--radius-lg);
  padding: var(--space-4);
  border: 2px solid ${props => 
    props.$isCorrect ? 'var(--success-color)' : 
    props.$isWrong ? 'var(--error-color)' : 
    'var(--gray-200)'
  };
  cursor: pointer;
  transition: all var(--transition-fast);
  position: relative;
  overflow: hidden;
  animation: ${props => props.$shake ? shake : 'none'} 0.5s ease-in-out;
  
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
  
  ${props => props.$disabled && `
    opacity: 0.6;
    cursor: not-allowed;
    
    &:hover {
      transform: none;
      box-shadow: none;
      border-color: var(--gray-200);
    }
  `}
`;

const CountryName = styled.p`
  font-size: var(--text-lg);
  font-weight: 600;
  color: var(--gray-700);
  text-align: center;
  margin: 0;
  line-height: 1.3;
  
  @media (max-width: 768px) {
    font-size: var(--text-base);
  }
`;

const TimerDisplay = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  margin-bottom: var(--space-4);
  font-size: var(--text-lg);
  font-weight: 600;
  color: ${props => props.$urgent ? 'var(--error-color)' : 'var(--gray-600)'};
  animation: ${props => props.$urgent ? timerPulse : 'none'} 1s infinite;
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

function ModernCapitalQuiz({ continent, apiUrl, title }) {
  const [countries, setCountries] = useState([]);
  const [remainingCountries, setRemainingCountries] = useState([]);
  const [currentCountry, setCurrentCountry] = useState(null);
  const [options, setOptions] = useState([]);
  const [correctGuesses, setCorrectGuesses] = useState([]);
  const [wrongGuesses, setWrongGuesses] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [shakeCard, setShakeCard] = useState(null);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [questionStartTime, setQuestionStartTime] = useState(null);
  const [totalTime, setTotalTime] = useState(0);
  const [currentQuestionTime, setCurrentQuestionTime] = useState(0);
  const [points, setPoints] = useState(0);

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
        const independentCountries = data.filter(
          (country) => country.independent === true && country.capital && country.capital.length > 0
        );
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

  // Timer effect
  useEffect(() => {
    let interval;
    if (gameStarted && !gameCompleted && currentCountry) {
      interval = setInterval(() => {
        const now = Date.now();
        if (questionStartTime) {
          setCurrentQuestionTime(Math.floor((now - questionStartTime) / 1000));
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [gameStarted, gameCompleted, currentCountry, questionStartTime]);

  const generateOptions = (correctCountry, allCountries) => {
    const options = [correctCountry];
    const otherCountries = allCountries.filter(c => c.name.common !== correctCountry.name.common);
    
    // Add 3 random wrong options
    while (options.length < 4 && otherCountries.length > 0) {
      const randomIndex = Math.floor(Math.random() * otherCountries.length);
      const randomCountry = otherCountries.splice(randomIndex, 1)[0];
      options.push(randomCountry);
    }
    
    // Shuffle options
    return options.sort(() => Math.random() - 0.5);
  };

  const startGame = () => {
    window.scrollTo(0, 0);
    setGameStarted(true);
    setGameCompleted(false);
    setCorrectGuesses([]);
    setWrongGuesses([]);
    setRemainingCountries(countries);
    setTotalTime(0);
    setPoints(0);
    selectRandomCountry(countries);
  };

  const selectRandomCountry = (availableCountries) => {
    if (availableCountries.length > 0) {
      const randomIndex = Math.floor(Math.random() * availableCountries.length);
      const selectedCountry = availableCountries[randomIndex];
      setCurrentCountry(selectedCountry);
      setOptions(generateOptions(selectedCountry, countries));
      setAttempts(0);
      setQuestionStartTime(Date.now());
      setCurrentQuestionTime(0);
    } else {
      setCurrentCountry(null);
      setGameCompleted(true);
      setShowCompletionModal(true);
    }
  };

  const calculatePoints = (attempts, timeInSeconds) => {
    let basePoints = 100;
    
    // Deduct points for wrong attempts
    basePoints -= (attempts * 20);
    
    // Time bonus (faster = more points)
    if (timeInSeconds <= 5) basePoints += 50;
    else if (timeInSeconds <= 10) basePoints += 30;
    else if (timeInSeconds <= 15) basePoints += 10;
    
    return Math.max(basePoints, 10); // Minimum 10 points
  };

  const handleOptionClick = (selectedCountry) => {
    if (!currentCountry || gameCompleted) return;

    const questionTime = Math.floor((Date.now() - questionStartTime) / 1000);
    setTotalTime(prev => prev + questionTime);

    if (selectedCountry.name.common === currentCountry.name.common) {
      // Correct answer
      const earnedPoints = calculatePoints(attempts, questionTime);
      setPoints(prev => prev + earnedPoints);
      setCorrectGuesses((prev) => [...prev, { ...currentCountry, attempts: attempts + 1, time: questionTime, points: earnedPoints }]);
      
      const newRemaining = remainingCountries.filter(
        (country) => country.name.common !== selectedCountry.name.common
      );
      setRemainingCountries(newRemaining);
      
      selectRandomCountry(newRemaining);
    } else {
      // Wrong answer
      setAttempts((prev) => prev + 1);
      setShakeCard(selectedCountry.name.common);
      
      setTimeout(() => {
        setShakeCard(null);
      }, 500);
      
      if (attempts + 1 >= 3) {
        // Max attempts reached
        setWrongGuesses((prev) => [...prev, { ...currentCountry, attempts: attempts + 1, time: questionTime }]);
        const newRemaining = remainingCountries.filter(
          (country) => country.name.common !== currentCountry.name.common
        );
        setRemainingCountries(newRemaining);
        
        selectRandomCountry(newRemaining);
      }
    }
  };

  const resetGame = () => {
    setGameStarted(false);
    setGameCompleted(false);
    setCurrentCountry(null);
    setOptions([]);
    setCorrectGuesses([]);
    setWrongGuesses([]);
    setRemainingCountries(countries);
    setAttempts(0);
    setShowCompletionModal(false);
    setTotalTime(0);
    setCurrentQuestionTime(0);
    setPoints(0);
  };

  const totalCountries = countries.length;
  const completedCountries = correctGuesses.length + wrongGuesses.length;
  const progressPercentage = totalCountries > 0 ? (completedCountries / totalCountries) * 100 : 0;
  const accuracy = completedCountries > 0 ? (correctGuesses.length / completedCountries) * 100 : 0;

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

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
            ? `Which country has this capital?`
            : `Test your knowledge of ${continent} capitals!`}
        </Subtitle>
      </Header>

      <GameArea>
        <MainContent>
          {!gameStarted ? (
            <div style={{ textAlign: 'center', padding: 'var(--space-8)' }}>
              <h2 style={{ marginBottom: 'var(--space-6)', color: 'var(--gray-700)' }}>
                Ready to test your capital knowledge?
              </h2>
              <p style={{ marginBottom: 'var(--space-8)', color: 'var(--gray-600)', fontSize: 'var(--text-lg)' }}>
                You'll be shown capitals from {continent} and need to identify the correct country.
                You have 3 attempts per question. Faster answers earn more points!
              </p>
              <ActionButton primary onClick={startGame}>
                🚀 Start Quiz
              </ActionButton>
            </div>
          ) : (
            <>
              {currentCountry && !gameCompleted && (
                <QuestionSection>
                  <QuestionText>Which country has this capital?</QuestionText>
                  <CapitalName>{currentCountry.capital[0]}</CapitalName>
                  <TimerDisplay $urgent={currentQuestionTime > 20}>
                    ⏱️ {formatTime(currentQuestionTime)}
                    {attempts > 0 && (
                      <span style={{ color: 'var(--error-color)', marginLeft: 'var(--space-2)' }}>
                        (Attempt {attempts + 1}/3)
                      </span>
                    )}
                  </TimerDisplay>
                </QuestionSection>
              )}

              <OptionsGrid>
                {options.map((country) => {
                  const isCorrect = correctGuesses.some(c => c.name.common === country.name.common);
                  const isWrong = wrongGuesses.some(c => c.name.common === country.name.common);
                  const shouldShake = shakeCard === country.name.common;
                  
                  return (
                    <OptionCard
                      key={country.name.common}
                      onClick={() => handleOptionClick(country)}
                      $isCorrect={isCorrect}
                      $isWrong={isWrong}
                      $shake={shouldShake}
                      $disabled={gameCompleted}
                    >
                      <CountryName>{country.name.common}</CountryName>
                    </OptionCard>
                  );
                })}
              </OptionsGrid>

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
        </MainContent>

        <Sidebar>
          <StatsCard>
            <StatTitle>
              ⏱️ Time
            </StatTitle>
            <StatValue style={{ color: 'var(--accent-color)' }}>
              {formatTime(totalTime + currentQuestionTime)}
            </StatValue>
            <p style={{ color: 'var(--gray-600)', fontSize: 'var(--text-sm)', margin: 0 }}>
              Total time elapsed
            </p>
          </StatsCard>

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
              🏆 Points
            </StatTitle>
            <StatValue style={{ color: 'var(--success-color)' }}>
              {points}
            </StatValue>
            <p style={{ color: 'var(--gray-600)', fontSize: 'var(--text-sm)', margin: 0 }}>
              Total points earned
            </p>
          </StatsCard>
        </Sidebar>
      </GameArea>

      {showCompletionModal && (
        <CompletionModal onClick={() => setShowCompletionModal(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalTitle>🎉 Quiz Complete!</ModalTitle>
            <ModalText>
              Excellent work! You've completed the {continent} capitals quiz.
              <br />
              <strong>Final Score: {correctGuesses.length}/{totalCountries}</strong>
              <br />
              <strong>Total Points: {points}</strong>
              <br />
              <strong>Total Time: {formatTime(totalTime)}</strong>
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

export default ModernCapitalQuiz;
