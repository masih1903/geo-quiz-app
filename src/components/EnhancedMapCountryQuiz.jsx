import React, { useState, useEffect } from "react";
import styled, { keyframes, css } from "styled-components";
import "../App.css";

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

const correctFlash = keyframes`
  0% { background-color: transparent; }
  50% { background-color: rgba(34, 197, 94, 0.3); }
  100% { background-color: transparent; }
`;

const wrongFlash = keyframes`
  0% { background-color: transparent; }
  50% { background-color: rgba(239, 68, 68, 0.3); }
  100% { background-color: transparent; }
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

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
  animation: ${fadeIn} 0.8s ease-out 0.2s both;
  
  @media (max-width: 1200px) {
    order: -1;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
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

const MainContent = styled.div`
  background: var(--white);
  border-radius: var(--radius-2xl);
  padding: var(--space-8);
  box-shadow: var(--shadow-lg);
  border: 1px solid var(--gray-200);
  animation: ${fadeIn} 0.8s ease-out 0.4s both;
  position: relative;
  overflow: hidden;
  
  ${props => props.correctFlash && css`animation: ${correctFlash} 0.6s ease-out;`}
  ${props => props.wrongFlash && css`animation: ${wrongFlash} 0.6s ease-out;`}
`;

const QuestionSection = styled.div`
  text-align: center;
  margin-bottom: var(--space-6);
  padding: var(--space-6);
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.05), rgba(147, 51, 234, 0.05));
  border-radius: var(--radius-xl);
  border: 2px solid var(--primary-color);
`;

const QuestionText = styled.h2`
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

const CountryDisplay = styled.div`
  font-size: var(--text-3xl);
  font-weight: 700;
  color: var(--primary-color);
  margin: var(--space-4) 0;
  animation: ${pulse} 2s infinite;
  
  @media (max-width: 768px) {
    font-size: var(--text-2xl);
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
  color: ${props => props.urgent ? 'var(--error-color)' : 'var(--gray-600)'};
  animation: ${props => props.urgent ? timerPulse : 'none'} 1s infinite;
`;

const AttemptIndicator = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  margin-top: var(--space-2);
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

const MapContainer = styled.div`
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

const FloatingTooltip = styled.div`
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

function EnhancedMapCountryQuiz({
  regionApiUrl,
  mapComponent: MapComponent,
  title,
  mapType,
}) {
  const [countries, setCountries] = useState([]);
  const [currentCountry, setCurrentCountry] = useState(null);
  const [quizActive, setQuizActive] = useState(false);
  const [guessedCountries, setGuessedCountries] = useState([]);
  const [guesses, setGuesses] = useState({});
  const [temporaryColors, setTemporaryColors] = useState({});
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  
  // Enhanced features
  const [questionStartTime, setQuestionStartTime] = useState(null);
  const [totalTime, setTotalTime] = useState(0);
  const [currentQuestionTime, setCurrentQuestionTime] = useState(0);
  const [points, setPoints] = useState(0);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [correctFlash, setCorrectFlash] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);

  // sizing for the different maps
  const mapStyles = {
    world: { width: "100%", maxWidth: "1400px" },
    europe: { width: "100%", maxWidth: "1000px" },
    asia: { width: "100%", maxWidth: "1200px" },
    africa: { width: "100%", maxWidth: "1000px" },
    northamerica: { width: "100%", maxWidth: "900px" },
    southamerica: { width: "100%", maxWidth: "800px" },
  };

  // Timer effect
  useEffect(() => {
    let interval;
    if (quizActive && currentCountry && questionStartTime) {
      interval = setInterval(() => {
        const now = Date.now();
        setCurrentQuestionTime(Math.floor((now - questionStartTime) / 1000));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [quizActive, currentCountry, questionStartTime]);

  // Fetch country data
  useEffect(() => {
    setIsLoading(true);
    fetch(regionApiUrl)
      .then((response) => response.json())
      .then((data) => {
        const countryList = data
          .filter((country) => country.independent === true)
          .map((country) => ({
            name: country.name.common,
            capital: country.capital ? country.capital[0] : null,
            cca2: country.cca2.toLowerCase(),
          }));
        setCountries(countryList);
      })
      .catch((error) => {
        console.error("Error fetching country data:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [regionApiUrl]);

  const calculatePoints = (attempts, timeInSeconds) => {
    let basePoints = 100;
    
    // Deduct points for wrong attempts
    basePoints -= ((attempts - 1) * 25);
    
    // Time bonus (faster = more points)
    if (timeInSeconds <= 5) basePoints += 50;
    else if (timeInSeconds <= 10) basePoints += 30;
    else if (timeInSeconds <= 15) basePoints += 10;
    
    return Math.max(basePoints, 10); // Minimum 10 points
  };

  const resetQuiz = () => {
    setGuessedCountries([]);
    setGuesses({});
    setTemporaryColors({});
    setMessage("");
    setCurrentCountry(null);
    setQuizActive(false);
    setQuestionStartTime(null);
    setTotalTime(0);
    setCurrentQuestionTime(0);
    setPoints(0);
    setShowCompletionModal(false);
  };

  const quitQuiz = () => {
    setGuessedCountries([]);
    setGuesses({});
    setTemporaryColors({});
    setMessage("You have quit the quiz.");
    setCurrentCountry(null);
    setQuizActive(false);
    setQuestionStartTime(null);
  };

  const drawCountry = () => {
    if (countries.length === guessedCountries.length) {
      setMessage("Bravo! You've completed the quiz!");
      setQuizActive(false);
      setShowCompletionModal(true);
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setGuessedCountries((latestGuessedCountries) => {
        const remainingCountries = countries.filter(
          (country) =>
            !latestGuessedCountries.some((g) => g.cca2 === country.cca2)
        );

        if (remainingCountries.length === 0) {
          setQuizActive(false);
          setIsLoading(false);
          setMessage("Bravo! You've completed the quiz!");
          setShowCompletionModal(true);
          return latestGuessedCountries;
        }

        const randomCountry =
          remainingCountries[
            Math.floor(Math.random() * remainingCountries.length)
          ];

        setCurrentCountry(randomCountry);
        setQuizActive(true);
        setIsLoading(false);
        setQuestionStartTime(Date.now());
        setCurrentQuestionTime(0);

        return latestGuessedCountries;
      });
    }, 300);
  };

  const clickHandler = (event) => {
    if (!quizActive || !currentCountry) return;

    const clickedElement = event.target;
    const countryCode = clickedElement.id.toLowerCase().replace("-marker", "");

    if (
      clickedElement.tagName === "path" ||
      clickedElement.tagName === "circle"
    ) {
      const currentAttempts = (guesses[currentCountry.cca2] || 0) + 1;
      const questionTime = Math.floor((Date.now() - questionStartTime) / 1000);

      if (countryCode === currentCountry.cca2) {
        // Correct guess
        const earnedPoints = calculatePoints(currentAttempts, questionTime);
        setPoints(prev => prev + earnedPoints);
        setTotalTime(prev => prev + questionTime);
        
        setCorrectFlash(true);
        setTimeout(() => setCorrectFlash(false), 600);
        
        setGuessedCountries((prevGuessedCountries) => [
          ...prevGuessedCountries,
          { 
            cca2: currentCountry.cca2, 
            attempts: currentAttempts,
            time: questionTime,
            points: earnedPoints
          },
        ]);

        setGuesses((prev) => ({ ...prev, [currentCountry.cca2]: 0 }));
        setTimeout(() => setQuizActive(false), 300);
        setTimeout(() => drawCountry(), 800);
      } else if (currentAttempts >= 4) {
        // Max attempts reached
        setTotalTime(prev => prev + questionTime);
        setWrongFlash(true);
        setTimeout(() => setWrongFlash(false), 600);
        
        setGuessedCountries((prevGuessedCountries) => [
          ...prevGuessedCountries,
          { 
            cca2: currentCountry.cca2, 
            attempts: currentAttempts,
            time: questionTime,
            points: 0
          },
        ]);

        setGuesses((prev) => ({ ...prev, [currentCountry.cca2]: 0 }));
        setMessage(`The correct answer was ${currentCountry.name}.`);
        setTimeout(() => setMessage(""), 2000);
        setQuizActive(false);
        setTimeout(() => drawCountry(), 2000);
      } else {
        // Incorrect guess
        setGuesses((prev) => ({
          ...prev,
          [currentCountry.cca2]: currentAttempts,
        }));
        setMessage(`Wrong! Try again. Attempt ${currentAttempts}/4.`);
        setTimeout(() => setMessage(""), 2000);
        setTemporaryColors((prev) => ({ ...prev, [countryCode]: true }));
        setTimeout(() => {
          setTemporaryColors((prev) => {
            const updated = { ...prev };
            delete updated[countryCode];
            return updated;
          });
        }, 1000);
      }
    }
  };

  const getCountryColor = (countryCode) => {
    if (temporaryColors[countryCode]) return "country-red";
    const guessedCountry = guessedCountries.find((g) => g.cca2 === countryCode);
    if (!guessedCountry) return "country-default";
    const { attempts } = guessedCountry;
    if (attempts === 1) return "country-green";
    if (attempts === 2) return "country-yellow";
    if (attempts === 3) return "country-redyellow";
    return "country-red";
  };

  const handleHoverEffect = (event) => {
    const element = event.target;

    if (
      element.classList.contains("land") ||
      element.classList.contains("marker")
    ) {
      const countryCode = element.id.replace("-marker", "").toLowerCase();
      const isGuessed = guessedCountries.some((g) => g.cca2 === countryCode);

      if (isGuessed) {
        element.classList.remove("hoverable");
      } else {
        element.classList.add("hoverable");
      }
    }
  };

  useEffect(() => {
    const handleMouseMove = (event) => {
      setCursorPosition({ x: event.clientX, y: event.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const totalCountries = countries.length;
  const completedCountries = guessedCountries.length;
  const progressPercentage = totalCountries > 0 ? (completedCountries / totalCountries) * 100 : 0;
  const correctAnswers = guessedCountries.filter(g => g.attempts <= 4 && g.points > 0).length;
  const accuracy = completedCountries > 0 ? (correctAnswers / completedCountries) * 100 : 0;

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const currentAttempts = currentCountry ? (guesses[currentCountry.cca2] || 0) : 0;

  if (isLoading && countries.length === 0) {
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
          {quizActive && currentCountry
            ? `Click on the country on the map! Faster answers earn more points.`
            : `Test your geography knowledge with interactive maps!`}
        </Subtitle>
      </Header>

      <GameArea>
        <Sidebar>
          {currentCountry && quizActive && (
            <StatsCard>
              <StatTitle>🎯 Current Question</StatTitle>
              <div style={{ textAlign: 'center' }}>
                <QuestionText style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--space-2)' }}>Find this country:</QuestionText>
                <CountryDisplay style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-3)' }}>{currentCountry.name}</CountryDisplay>
                <TimerDisplay urgent={currentQuestionTime > 20}>
                  ⏱️ {formatTime(currentQuestionTime)}
                </TimerDisplay>
                <div style={{ marginTop: 'var(--space-3)' }}>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--gray-600)', margin: '0 0 var(--space-2) 0', fontWeight: '500' }}>
                    Attempts: {currentAttempts}/4
                  </p>
                  <AttemptIndicator>
                    {[1, 2, 3, 4].map(attempt => (
                      <span 
                        key={attempt} 
                        style={{
                          width: '12px',
                          height: '12px',
                          borderRadius: '50%',
                          backgroundColor: attempt <= currentAttempts ? 'var(--error-color)' : 'var(--gray-300)',
                          transition: 'all var(--transition-fast)'
                        }}
                      />
                    ))}
                  </AttemptIndicator>
                </div>
              </div>
            </StatsCard>
          )}

          <StatsCard>
            <StatTitle>📊 Progress</StatTitle>
            <StatValue>{completedCountries}/{totalCountries}</StatValue>
            <ProgressBar>
              <ProgressFill percentage={progressPercentage} />
            </ProgressBar>
            <p style={{ color: 'var(--gray-600)', fontSize: 'var(--text-sm)', margin: 0 }}>
              {Math.round(progressPercentage)}% Complete
            </p>
          </StatsCard>

          <StatsCard>
            <StatTitle>🎯 Accuracy</StatTitle>
            <StatValue>{Math.round(accuracy)}%</StatValue>
            <p style={{ color: 'var(--gray-600)', fontSize: 'var(--text-sm)', margin: 0 }}>
              {correctAnswers} correct out of {completedCountries} attempts
            </p>
          </StatsCard>

          <StatsCard>
            <StatTitle>🏆 Points</StatTitle>
            <StatValue style={{ color: 'var(--success-color)' }}>
              {points}
            </StatValue>
            <p style={{ color: 'var(--gray-600)', fontSize: 'var(--text-sm)', margin: 0 }}>
              Total points earned
            </p>
          </StatsCard>

          <StatsCard>
            <StatTitle>⏱️ Time</StatTitle>
            <StatValue style={{ color: 'var(--accent-color)' }}>
              {formatTime(totalTime + currentQuestionTime)}
            </StatValue>
            <p style={{ color: 'var(--gray-600)', fontSize: 'var(--text-sm)', margin: 0 }}>
              Total time elapsed
            </p>
          </StatsCard>
        </Sidebar>

        <MainContent correctFlash={correctFlash} wrongFlash={wrongFlash}>
          {!quizActive && !currentCountry ? (
            <div style={{ textAlign: 'center', padding: 'var(--space-8)' }}>
              <h2 style={{ marginBottom: 'var(--space-6)', color: 'var(--gray-700)' }}>
                Ready to test your geography knowledge?
              </h2>
              <p style={{ marginBottom: 'var(--space-8)', color: 'var(--gray-600)', fontSize: 'var(--text-lg)' }}>
                Click on countries on the interactive map. You have 4 attempts per question. 
                Faster answers earn more points!
              </p>
              <ActionButton primary onClick={drawCountry} disabled={isLoading}>
                🚀 Start Quiz
              </ActionButton>
            </div>
          ) : (
            <>
              <MapContainer style={mapStyles[mapType]} onClick={clickHandler}>
                <MapComponent
                  guessedCountries={guessedCountries}
                  getCountryColor={getCountryColor}
                  onMouseOver={handleHoverEffect}
                />
              </MapContainer>

              <ActionButtons>
                <ActionButton onClick={quitQuiz} disabled={!quizActive}>
                  ❌ Quit Quiz
                </ActionButton>
                <ActionButton onClick={resetQuiz}>
                  🔄 Reset Game
                </ActionButton>
                {!quizActive && completedCountries === totalCountries && (
                  <ActionButton primary onClick={drawCountry}>
                    🎯 Play Again
                  </ActionButton>
                )}
              </ActionButtons>
            </>
          )}
        </MainContent>
      </GameArea>

      {(currentCountry && quizActive) || (!quizActive && message) ? (
        <FloatingTooltip
          style={{
            top: `${cursorPosition.y + 20}px`,
            left: `${cursorPosition.x + 20}px`,
          }}
        >
          {quizActive && currentCountry
            ? `Find: ${currentCountry.name} ${
                currentAttempts > 0 ? `(Attempt ${currentAttempts + 1}/4)` : "(First Attempt)"
              }`
            : message}
        </FloatingTooltip>
      ) : null}

      {showCompletionModal && (
        <CompletionModal onClick={() => setShowCompletionModal(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalTitle>🎉 Quiz Complete!</ModalTitle>
            <ModalText>
              Outstanding! You've completed the {title.replace(' Quiz', '')}.
              <br />
              <strong>Final Score: {correctAnswers}/{totalCountries}</strong>
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
                resetQuiz();
                setTimeout(drawCountry, 100);
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

export default EnhancedMapCountryQuiz;
