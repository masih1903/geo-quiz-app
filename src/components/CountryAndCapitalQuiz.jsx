import React, { useState, useEffect } from "react";
import "../App.css";

function Quiz({
  regionApiUrl,
  mapComponent: MapComponent,
  quizType,
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

  // sizing for the different maps
  const mapStyles = {
    world: { width: "90%", maxWidth: "1600px" },
    europe: { width: "80%", maxWidth: "900px" },
    asia: { width: "80%", maxWidth: "1200px" },
    africa: { width: "80%", maxWidth: "1000px" },
    northamerica: { width: "75%", maxWidth: "800px" },
    southamerica: { width: "70%", maxWidth: "800px" },
  };

  // Fetch country data based on the API URL and quizType
  useEffect(() => {
    fetch(regionApiUrl)
      .then((response) => response.json())
      .then((data) => {
        const countryList = data
          .filter(
            (country) =>
              country.independent === true && (!quizType || country.capital)
          )
          .map((country) => ({
            name: country.name.common,
            capital: country.capital ? country.capital[0] : null,
            cca2: country.cca2.toLowerCase(),
          }));
        setCountries(countryList);
      })
      .catch((error) => {
        console.error("Error fetching country data:", error);
      });
  }, [regionApiUrl, quizType]);

  useEffect(() => {
    if (!quizActive && currentCountry === null && countries.length > 0) {
      setCurrentCountry(null);
    }
  }, [guessedCountries, quizActive, countries]);

  const resetQuiz = () => {
    setGuessedCountries([]);
    setGuesses({});
    setTemporaryColors({});
    setMessage("");
    setCurrentCountry(null);
    setQuizActive(false);
  };

  const quitQuiz = () => {
    setGuessedCountries([]);
    setGuesses({});
    setTemporaryColors({});
    setMessage("You have quit the quiz.");
    setCurrentCountry(null);
    setQuizActive(false);
  };

  const drawCountry = () => {
    if (countries.length === guessedCountries.length) {
      setMessage("Bravo! You’ve completed the quiz!");
      setQuizActive(false);
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
          setMessage("Bravo! You’ve completed the quiz!");
          return latestGuessedCountries;
        }

        const randomCountry =
          remainingCountries[
            Math.floor(Math.random() * remainingCountries.length)
          ];

        setCurrentCountry(randomCountry);
        setQuizActive(true);
        setIsLoading(false);

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

      if (countryCode === currentCountry.cca2) {
        // Correct guess
        setGuessedCountries((prevGuessedCountries) => [
          ...prevGuessedCountries,
          { cca2: currentCountry.cca2, attempts: currentAttempts },
        ]);

        setGuesses((prev) => ({ ...prev, [currentCountry.cca2]: 0 }));
        setQuizActive(false);
        drawCountry();
      } else if (currentAttempts >= 4) {
        // Max attempts reached
        setGuessedCountries((prevGuessedCountries) => [
          ...prevGuessedCountries,
          { cca2: currentCountry.cca2, attempts: currentAttempts },
        ]);

        setGuesses((prev) => ({ ...prev, [currentCountry.cca2]: 0 }));
        setMessage(
          `The correct answer was ${
            quizType === "capitals"
              ? currentCountry.capital
              : currentCountry.name
          }.`
        );
        setTimeout(() => setMessage(""), 2000); // Clear message after 2 seconds
        setQuizActive(false);
        drawCountry();
      } else {
        // Incorrect guess
        setGuesses((prev) => ({
          ...prev,
          [currentCountry.cca2]: currentAttempts,
        }));
        setMessage(`Wrong! Try again. Attempt ${currentAttempts}/4.`);
        setTimeout(() => setMessage(""), 2000); // Clear message after 2 seconds
        setTemporaryColors((prev) => ({ ...prev, [countryCode]: true }));
        setTimeout(() => {
          setTemporaryColors((prev) => {
            const updated = { ...prev };
            delete updated[countryCode];
            return updated;
          });
        }, 1000); // Reset color after 500ms
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

      // Check if the country is guessed
      const isGuessed = guessedCountries.some((g) => g.cca2 === countryCode);

      // Dynamically toggle hover effects
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

  useEffect(() => {
    let messageTimeout;
    if (message) {
      messageTimeout = setTimeout(() => setMessage(""), 2000);
    }
    return () => {
      if (messageTimeout) clearTimeout(messageTimeout);
    };
  }, [message]);

  return (
    <div className="quiz-container">
      <h1>{title}</h1>
      <div className="quiz-controls">
        <button
          onClick={() => {
            if (!quizActive && countries.length === guessedCountries.length) {
              resetQuiz();
            } else {
              drawCountry();
            }
          }}
          disabled={quizActive || isLoading || countries.length === 0}
          className={`btn btn-primary ${isLoading ? 'loading' : ''}`}
        >
          {isLoading && (
            <span className="loading-spinner" style={{ marginRight: '8px' }}>
              ⟳
            </span>
          )}
          {isLoading
            ? "Loading..."
            : quizActive
            ? "Quiz In Progress..."
            : countries.length === guessedCountries.length
            ? "🔄 Restart Quiz"
            : "🚀 Start Quiz"}
        </button>

        {quizActive && (
          <button
            onClick={() => quitQuiz()}
            disabled={!quizActive}
            className="btn btn-secondary"
          >
            ❌ Quit Quiz
          </button>
        )}

        <div className="quiz-message-container">
          {message && (
            <div
              className={`quiz-message ${
                quizActive ? "quiz-active-message" : "quiz-end-message"
              }`}
            >
              {message}
            </div>
          )}
        </div>
      </div>
      {(currentCountry && quizActive) || (!quizActive && message) ? (
        <div
          className="quiz-question"
          style={{
            position: "fixed",
            border: "2px solid black",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            background: "linear-gradient(145deg, #f3f3f3, #e0e0e0)",
            padding: "8px 12px",
            fontSize: "0.9rem",
            fontWeight: "bold",
            color: "#333",
            top: `${cursorPosition.y}px`,
            left: `${cursorPosition.x + 20}px`,
            pointerEvents: "none",
            zIndex: 1000,
          }}
        >
          {quizActive
            ? quizType === "capitals"
              ? `Find the country with this capital: ${
                  currentCountry.capital
                } ${
                  guesses[currentCountry.cca2]
                    ? `(Attempt ${guesses[currentCountry.cca2]}/4)`
                    : "(First Attempt)"
                }`
              : `Find this country: ${currentCountry.name} ${
                  guesses[currentCountry.cca2]
                    ? `(Attempt ${guesses[currentCountry.cca2]}/4)`
                    : "(First Attempt)"
                }`
            : message}
        </div>
      ) : null}

      <div
        className="map-container"
        style={mapStyles[mapType]}
        onClick={clickHandler}
      >
        <MapComponent
          guessedCountries={guessedCountries}
          getCountryColor={getCountryColor}
          onMouseOver={handleHoverEffect}
        />
      </div>
    </div>
  );
}

export default Quiz;
