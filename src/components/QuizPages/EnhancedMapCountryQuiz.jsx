import "../../App.css";
import { useQuizState } from "../../hooks/useQuizState.jsx";
import { useQuizTimer } from "../../hooks/useQuizTimer.jsx";
import { useScrollPosition } from "../../hooks/useScrollPosition.jsx";
import QuizSidebar from "../QuizComponents/QuizSidebar.jsx";
import CompletionModal from "../QuizComponents/CompletionModal.jsx";
import {
  QuizContainer,
  Header,
  Title,
  Subtitle,
  GameArea,
  MainContent,
  ActionButtons,
  ActionButton,
  MapContainer,
  FloatingTooltip
} from "../QuizComponents/QuizStyles.jsx";

function EnhancedMapCountryQuiz({
  regionApiUrl,
  mapComponent: MapComponent,
  title,
  mapType,
  countryFilter,
}) {
  // Custom hooks for state management
  const quizState = useQuizState(regionApiUrl, countryFilter);
  const timer = useQuizTimer();
  const scroll = useScrollPosition();

  // Map sizing for different regions
  const mapStyles = {
    world: { width: "100%", maxWidth: "1400px" },
    europe: { width: "100%", maxWidth: "1000px" },
    asia: { width: "100%", maxWidth: "1200px" },
    africa: { width: "100%", maxWidth: "1000px" },
    northamerica: { width: "100%", maxWidth: "900px" },
    southamerica: { width: "100%", maxWidth: "800px" },
  };

  const handleStartQuiz = () => {
    quizState.drawCountry();
    if (quizState.guessedCountries.length === 0) {
      timer.startTimer();
    }
  };

  const handleResetQuiz = () => {
    quizState.resetQuiz();
    timer.resetTimer();
  };

  const handlePlayAgain = () => {
    quizState.setShowCompletionModal(false);
    handleResetQuiz();
  };

  const handleMapClick = (event) => {
    if (!quizState.quizActive || !quizState.currentCountry) return;

    // Prevent any default behavior that might cause scrolling
    event.preventDefault();
    event.stopPropagation();

    // Preserve scroll position
    scroll.preserveScrollPosition();

    const clickedElement = event.target;
    const countryCode = clickedElement.id.toLowerCase().replace("-marker", "");

    if (
      clickedElement.tagName === "path" ||
      clickedElement.tagName === "circle"
    ) {
      const currentAttempts = (quizState.guesses[quizState.currentCountry.cca2] || 0) + 1;

      if (countryCode === quizState.currentCountry.cca2) {
        // Correct guess
        const newGuessedCountries = [
          ...quizState.guessedCountries,
          { 
            cca2: quizState.currentCountry.cca2, 
            attempts: currentAttempts
          },
        ];
        
        quizState.setGuessedCountries(newGuessedCountries);
        quizState.setGuesses((prev) => ({ ...prev, [quizState.currentCountry.cca2]: 0 }));
        
        // Check if quiz is complete
        if (newGuessedCountries.length === quizState.countries.length) {
          timer.stopTimer();
          quizState.setMessage("Bravo! You've completed the quiz!");
          quizState.setShowCompletionModal(true);
        } else {
          // Move to next question
          quizState.drawCountry();
        }
        
        scroll.preserveScrollPosition();
      } else if (currentAttempts >= 4) {
        // Max attempts reached
        const newGuessedCountries = [
          ...quizState.guessedCountries,
          { 
            cca2: quizState.currentCountry.cca2, 
            attempts: currentAttempts
          },
        ];
        
        quizState.setGuessedCountries(newGuessedCountries);
        quizState.setGuesses((prev) => ({ ...prev, [quizState.currentCountry.cca2]: 0 }));
        quizState.setMessage(`The correct answer was ${quizState.currentCountry.name}.`);
        
        setTimeout(() => {
          quizState.setMessage("");
          scroll.preserveScrollPosition();
        }, 2000);
        
        setTimeout(() => {
          // Check if quiz is complete
          if (newGuessedCountries.length === quizState.countries.length) {
            timer.stopTimer();
            quizState.setMessage("Bravo! You've completed the quiz!");
            quizState.setShowCompletionModal(true);
          } else {
            quizState.drawCountry();
          }
          scroll.preserveScrollPosition();
        }, 2000);
      } else {
        // Incorrect guess
        quizState.setGuesses((prev) => ({
          ...prev,
          [quizState.currentCountry.cca2]: currentAttempts,
        }));
        quizState.setMessage(`Wrong! Try again. Attempt ${currentAttempts}/4.`);
        
        setTimeout(() => {
          quizState.setMessage("");
          scroll.preserveScrollPosition();
        }, 2000);
        
        quizState.setTemporaryColors((prev) => ({ ...prev, [countryCode]: true }));
        
        setTimeout(() => {
          quizState.setTemporaryColors((prev) => {
            const updated = { ...prev };
            delete updated[countryCode];
            return updated;
          });
          scroll.preserveScrollPosition();
        }, 1000);
      }
    }
  };

  const handleHoverEffect = (event) => {
    const element = event.target;

    if (
      element.classList.contains("land") ||
      element.classList.contains("marker")
    ) {
      const countryCode = element.id.replace("-marker", "").toLowerCase();
      const isGuessed = quizState.guessedCountries.some((g) => g.cca2 === countryCode);

      if (isGuessed) {
        element.classList.remove("hoverable");
      } else {
        element.classList.add("hoverable");
      }
    }
  };

  if (quizState.isLoading && quizState.countries.length === 0) {
    return (
      <QuizContainer>
        <Header>
          <Title>Loading {title}...</Title>
          <div className="loading-spinner" style={{ fontSize: '2rem', margin: '2rem 0' }}>⟳</div>
        </Header>
      </QuizContainer>
    );
  }

  const totalCountries = quizState.countries.length;
  const completedCountries = quizState.guessedCountries.length;

  return (
    <QuizContainer>
      <Header>
        <Title>{title}</Title>
        <Subtitle>
          {quizState.quizActive && quizState.currentCountry
            ? `Click on the country on the map!`
            : `Test your geography knowledge with interactive maps!`}
        </Subtitle>
      </Header>

      <GameArea>
        <QuizSidebar
          currentCountry={quizState.currentCountry}
          quizActive={quizState.quizActive}
          elapsedTime={timer.elapsedTime}
          guesses={quizState.guesses}
          completedCountries={completedCountries}
          totalCountries={totalCountries}
          guessedCountries={quizState.guessedCountries}
          formatTime={timer.formatTime}
        />

        <MainContent>
          {!quizState.quizActive && !quizState.currentCountry ? (
            <div style={{ textAlign: 'center', padding: 'var(--space-8)' }}>
              <h2 style={{ marginBottom: 'var(--space-6)', color: 'var(--gray-700)' }}>
                Ready to test your geography knowledge?
              </h2>
              <p style={{ marginBottom: 'var(--space-8)', color: 'var(--gray-600)', fontSize: 'var(--text-lg)' }}>
                Click on countries on the interactive map.
              </p>
              <ActionButton $primary onClick={handleStartQuiz} disabled={quizState.isLoading}>
                🚀 Start Quiz
              </ActionButton>
            </div>
          ) : (
            <>
              <MapContainer 
                style={mapStyles[mapType]} 
                onClick={handleMapClick}
                data-map-container
              >
                <MapComponent
                  guessedCountries={quizState.guessedCountries}
                  getCountryColor={quizState.getCountryColor}
                  onMouseOver={handleHoverEffect}
                />
              </MapContainer>

              <ActionButtons>
                <ActionButton onClick={quizState.quitQuiz} disabled={!quizState.quizActive}>
                  ❌ Quit Quiz
                </ActionButton>
                <ActionButton onClick={handleResetQuiz}>
                  🔄 Reset Game
                </ActionButton>
                {!quizState.quizActive && completedCountries === totalCountries && (
                  <ActionButton $primary onClick={handleStartQuiz}>
                    🎯 Play Again
                  </ActionButton>
                )}
              </ActionButtons>
            </>
          )}
        </MainContent>
      </GameArea>

      {(quizState.currentCountry && quizState.quizActive) || (!quizState.quizActive && quizState.message) ? (
        <FloatingTooltip
          style={{
            top: `${scroll.cursorPosition.y + 20}px`,
            left: `${scroll.cursorPosition.x + 20}px`,
          }}
        >
          {quizState.quizActive && quizState.currentCountry
            ? `Find: ${quizState.currentCountry.name}`
            : quizState.message}
        </FloatingTooltip>
      ) : null}

      <CompletionModal
        showModal={quizState.showCompletionModal}
        onClose={() => quizState.setShowCompletionModal(false)}
        title={title}
        elapsedTime={timer.elapsedTime}
        completedCountries={completedCountries}
        totalCountries={totalCountries}
        guessedCountries={quizState.guessedCountries}
        formatTime={timer.formatTime}
        onPlayAgain={handlePlayAgain}
      />
    </QuizContainer>
  );
}

export default EnhancedMapCountryQuiz;
