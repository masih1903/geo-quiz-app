import { useState, useEffect } from "react";

export const useQuizState = (regionApiUrl, countryFilter) => {
  const [countries, setCountries] = useState([]);
  const [currentCountry, setCurrentCountry] = useState(null);
  const [quizActive, setQuizActive] = useState(false);
  const [guessedCountries, setGuessedCountries] = useState([]);
  const [guesses, setGuesses] = useState({});
  const [temporaryColors, setTemporaryColors] = useState({});
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showCompletionModal, setShowCompletionModal] = useState(false);

  // Fetch country data
  useEffect(() => {
    setIsLoading(true);
    fetch(regionApiUrl)
      .then((response) => response.json())
      .then((data) => {
        let countryList = data
          .filter((country) => country.independent === true)
          .map((country) => ({
            name: country.name.common,
            capital: country.capital ? country.capital[0] : null,
            cca2: country.cca2.toLowerCase(),
          }));
        
        // Apply country filter if provided
        if (countryFilter) {
          countryList = countryFilter(countryList);
        }
        
        // Debug: Log the filtered countries to console
        console.log('Filtered countries:', countryList.map(c => `${c.name} (${c.cca2})`));
        
        setCountries(countryList);
      })
      .catch((error) => {
        console.error("Error fetching country data:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [regionApiUrl, countryFilter]);

  const resetQuiz = () => {
    setGuessedCountries([]);
    setGuesses({});
    setTemporaryColors({});
    setMessage("");
    setCurrentCountry(null);
    setQuizActive(false);
    setShowCompletionModal(false);
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
      setMessage("Bravo! You've completed the quiz!");
      setQuizActive(false);
      setShowCompletionModal(true);
      return;
    }

    // Scroll to show the map when starting the quiz
    if (guessedCountries.length === 0) {
      // Use a slight delay to ensure the DOM has updated
      setTimeout(() => {
        const mapContainer = document.querySelector('[data-map-container]');
        if (mapContainer) {
          mapContainer.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center',
            inline: 'nearest'
          });
        } else {
          // Fallback: scroll to a position that shows the map better
          const headerHeight = 200; // Approximate header height
          window.scrollTo({ 
            top: headerHeight, 
            behavior: 'smooth' 
          });
        }
      }, 100);
    }

    setIsLoading(true);

    // Remove delay - execute immediately
    setGuessedCountries((latestGuessedCountries) => {
      const remainingCountries = countries.filter(
        (country) =>
          !latestGuessedCountries.some((g) => g.cca2 === country.cca2)
      );

      if (countries.length === latestGuessedCountries.length) {
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

      return latestGuessedCountries;
    });
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

  return {
    countries,
    currentCountry,
    quizActive,
    guessedCountries,
    guesses,
    temporaryColors,
    message,
    isLoading,
    showCompletionModal,
    setCurrentCountry,
    setQuizActive,
    setGuessedCountries,
    setGuesses,
    setTemporaryColors,
    setMessage,
    setShowCompletionModal,
    resetQuiz,
    quitQuiz,
    drawCountry,
    getCountryColor,
  };
};
