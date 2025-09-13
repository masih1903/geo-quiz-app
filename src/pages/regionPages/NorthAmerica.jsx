import QuizOverview from "../../layouts/QuizOverview";
import WorldIcon from "../../assets/worlds.png";
import styled from "styled-components";
import { useState, useEffect } from "react";

const PageContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-8);
  padding: var(--space-8);
  min-height: 60vh;
  align-items: start;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: var(--space-6);
    padding: var(--space-4);
  }
`;

const FactsSection = styled.div`
  background: var(--white);
  border-radius: var(--radius-2xl);
  padding: var(--space-8);
  box-shadow: var(--shadow-lg);
  border: 1px solid var(--gray-200);
`;

const FactsTitle = styled.h2`
  font-family: var(--font-family-display);
  font-size: var(--text-2xl);
  font-weight: 700;
  color: var(--primary-color);
  margin: 0;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 60px;
    height: 3px;
    background: linear-gradient(90deg, var(--primary-color), var(--accent-color));
    border-radius: var(--radius-sm);
  }
`;

const FactsText = styled.div`
  font-family: var(--font-family-sans);
  font-size: var(--text-base);
  line-height: 1.8;
  color: var(--gray-700);
  text-align: left;
  white-space: pre-wrap;
  word-wrap: break-word;
  
  @media (max-width: 768px) {
    font-size: var(--text-sm);
  }
`;

const QuizSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-6);
`;

const PageTitle = styled.h1`
  font-family: var(--font-family-display);
  font-size: var(--text-4xl);
  font-weight: 800;
  background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-align: center;
  margin: 0;
  padding: var(--space-4) var(--space-6);
  border-radius: var(--radius-xl);
  transition: all var(--transition-normal);
  cursor: pointer;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
    opacity: 0;
    border-radius: var(--radius-xl);
    transition: opacity var(--transition-normal);
    z-index: -1;
  }

  &:hover {
    transform: translateY(-2px);
    
    &::before {
      opacity: 0.1;
    }
  }

  @media (max-width: 768px) {
    font-size: var(--text-3xl);
  }
`;

const ContinentImage = styled.img`
  width: 280px;
  height: 280px;
  object-fit: contain;
  margin-bottom: var(--space-6);
  border-radius: 50%;
  box-shadow: var(--shadow-lg);
  transition: all var(--transition-normal);

  &:hover {
    transform: rotate(5deg) scale(1.05);
    box-shadow: var(--shadow-xl);
  }

  @media (max-width: 768px) {
    width: 200px;
    height: 200px;
  }
`;

function NorthAmerica() {
  const [hover, setHover] = useState(false);
  const [text, setText] = useState("");

  const fullText = `- Did you know that North America is the third-largest continent in the world, covering about 24.71 million square kilometers (9.54 million square miles)?

- Did you know that Canada has the longest coastline in the world, stretching over 202,080 kilometers (125,567 miles)?

- Did you know that the Great Lakes in North America contain about 20% of the world's surface freshwater?

- Did you know that the Grand Canyon in the United States is so massive it can be seen from space and stretches 446 kilometers (277 miles) long?`;

  useEffect(() => {
    let index = 0;

    const interval = setInterval(() => {
      if (index < fullText.length) {
        const nextChar = fullText[index];
        if (nextChar !== undefined) {
          setText((prev) => prev + nextChar);
        }
        index++;
      } else {
        clearInterval(interval);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [fullText]);

  return (
    <PageContainer>
      <FactsSection className="fade-in-up">
        <h2 className="fun-facts">Fun Facts About North America</h2>
        <FactsText>{text}</FactsText>
      </FactsSection>
      
      <QuizSection className="fade-in-up">
        <PageTitle
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          North America Quizzes
        </PageTitle>
        <ContinentImage src={WorldIcon} alt="North America icon" />
        <QuizOverview
          continent="North America"
          capitalPath="/north-america-capital-quiz"
          countryPath="/north-america-country-quiz"
          flagPath="/north-america-flag-quiz"
        />
      </QuizSection>
    </PageContainer>
  );
}

export default NorthAmerica;
