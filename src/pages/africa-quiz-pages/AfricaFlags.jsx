import React, { useState, useEffect } from "react";
import styled from "styled-components";

const AtlasUrl = "https://atlasapi.cphmk.dk/api/countries/region/africa";

const Container = styled.div`
  text-align: center;
  font-family: Arial, sans-serif;
  background-color: #f0f8ff; /* Light blue background */
  min-height: 100vh;
  padding: 20px;
`;

const Title = styled.h1`
  color: #333;
`;

const SubTitle = styled.h2`
  margin: 10px 0;
`;

const FlagGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  margin-bottom: 20px;
`;

const Flag = styled.img`
  width: 100px;
  cursor: pointer;
  border: 2px solid transparent;
  border-radius: 8px;
  transition: transform 0.2s, border-color 0.2s;

  &:hover {
    transform: scale(1.1);
    border-color: #007bff;
  }
`;

const Section = styled.div`
  flex: 1;
  text-align: center;
`;

const AnswerBox = styled.div`
  background-color: ${(props) => (props.correct ? "rgba(0, 255, 0, 0.2)" : "rgba(255, 0, 0, 0.2)")};
  padding: 10px;
  border-radius: 8px;
  text-align: center;
`;

const FlagImage = styled.img`
  width: 100px;
`;

const CompletionMessage = styled.h3`
  color: #007bff;
  margin-top: 20px;
`;

function AfricaFlags() {
  const [countries, setCountries] = useState([]);
  const [remainingCountries, setRemainingCountries] = useState([]);
  const [completedCountries, setCompletedCountries] = useState([]);
  const [randomCountry, setRandomCountry] = useState(null);
  const [correctGuesses, setCorrectGuesses] = useState([]);
  const [wrongGuesses, setWrongGuesses] = useState([]);
  const [attempts, setAttempts] = useState(0);

  useEffect(() => {
    fetch(AtlasUrl)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch Atlas data");
        }
        return res.json();
      })
      .then((data) => {
        const independentCountries = data.filter((country) => country.independent === true);
        setCountries(independentCountries);
        setRemainingCountries(independentCountries);
        if (independentCountries.length > 0) {
          selectRandomCountry(independentCountries);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  const selectRandomCountry = (remainingCountries) => {
    if (remainingCountries.length > 0) {
      const randomIndex = Math.floor(Math.random() * remainingCountries.length);
      setRandomCountry(remainingCountries[randomIndex]);
      setAttempts(0);
    } else {
      setRandomCountry(null);
    }
  };

  const handleFlagClick = (countryName) => {
    if (countryName === randomCountry.name.common) {
      alert("Korrekt!");
      setCorrectGuesses((prev) => [...prev, randomCountry]);
      setCompletedCountries((prev) => [...prev, randomCountry]);
      setRemainingCountries((prev) => prev.filter((country) => country.name.common !== countryName));
      selectRandomCountry(
        remainingCountries.filter((country) => country.name.common !== countryName)
      );
    } else {
      setAttempts((prev) => prev + 1);
      if (attempts + 1 >= 3) {
        alert(`Forkert! Det korrekte svar er: ${randomCountry.name.common}`);
        setWrongGuesses((prev) => [...prev, randomCountry]);
        setCompletedCountries((prev) => [...prev, randomCountry]);
        setRemainingCountries((prev) =>
          prev.filter((country) => country.name.common !== randomCountry.name.common)
        );
        selectRandomCountry(
          remainingCountries.filter((country) => country.name.common !== randomCountry.name.common)
        );
      } else {
        alert("Forkert! Prøv igen.");
      }
    }
  };

  return (
    <Container>
      {randomCountry === null && (
        <CompletionMessage>
          Spillet er slut! Du har gættet alle flagene!<br />
          Rigtige: {correctGuesses.length}, Forkerte: {wrongGuesses.length}
        </CompletionMessage>
      )}
      <Title>Flag Guessing Game</Title>
      <SubTitle>
        Tryk på flaget for landet: {randomCountry ? randomCountry.name.common : "Spillet er slut!"}
      </SubTitle>
      <p>
        Resterende flag: {remainingCountries.length}/{countries.length}
      </p>

      <FlagGrid>
        {remainingCountries.map((country, index) => (
          <Flag
            key={index}
            src={country.flags.png || country.flagUrl}
            alt={`Flag of ${country.name.common}`}
            onClick={() => handleFlagClick(country.name.common)}
          />
        ))}
      </FlagGrid>

      <div style={{ display: "flex", gap: "20px", justifyContent: "space-between" }}>
        <Section>
          <h3>Korrekte svar:</h3>
          <FlagGrid>
            {correctGuesses.map((country, index) => (
              <AnswerBox key={index} correct>
                <FlagImage
                  src={country.flags.png || country.flagUrl}
                  alt={`Flag of ${country.name.common}`}
                />
                <p>{country.name.common}</p>
              </AnswerBox>
            ))}
          </FlagGrid>
        </Section>

        <Section>
          <h3>Forkerte svar:</h3>
          <FlagGrid>
            {wrongGuesses.map((country, index) => (
              <AnswerBox key={index}>
                <FlagImage
                  src={country.flags.png || country.flagUrl}
                  alt={`Flag of ${country.name.common}`}
                />
                <p>{country.name.common}</p>
              </AnswerBox>
            ))}
          </FlagGrid>
        </Section>
      </div>
    </Container>
  );
}

export default AfricaFlags;
  