import styled from "styled-components";
import QuizOverview from "../layouts/QuizOverview";
import WorldIcon from "../assets/worlds.png";
import { useState, useEffect } from "react";

const PageContainer = styled.div`
  padding: var(--space-8) var(--space-4);
  max-width: 1400px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    padding: var(--space-6) var(--space-3);
  }
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-12);
  align-items: start;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: var(--space-8);
  }
`;

const FactsSection = styled.div`
  background: var(--white);
  border-radius: var(--radius-2xl);
  padding: var(--space-8);
  box-shadow: var(--shadow-lg);
  border: 1px solid var(--gray-200);
`;

const QuizSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const PageTitle = styled.h1`
  font-family: var(--font-family-display);
  font-size: var(--text-4xl);
  font-weight: 800;
  color: var(--white);
  margin: 0 0 var(--space-6) 0;
  padding: var(--space-4) var(--space-8);
  background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
  border-radius: var(--radius-2xl);
  box-shadow: var(--shadow-lg);
  transition: all var(--transition-normal);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left var(--transition-slow);
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-xl);
    
    &::before {
      left: 100%;
    }
  }

  @media (max-width: 768px) {
    font-size: var(--text-3xl);
    padding: var(--space-3) var(--space-6);
  }
`;

const WorldImage = styled.img`
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

const TypingCursor = styled.span`
  display: inline-block;
  width: 2px;
  height: 1.2em;
  background-color: var(--primary-color);
  animation: blink 1s infinite;
  margin-left: 2px;

  @keyframes blink {
    0%, 50% { opacity: 1; }
    51%, 100% { opacity: 0; }
  }
`;

function World() {
  const [text, setText] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  const fullText = `- Did you know that in Norway, above the Arctic Circle, the sun does not set for about 76 days during the summer? It is called the Land of the Midnight Sun.

- Did you know that the Great Wall of China stretches over 21,000 kilometers, making it the longest wall in the world?

- Did you know that Antarctica is actually the largest desert in the world? Deserts are defined by low precipitation, not heat.

- Did you know that Nepal's flag is the only national flag in the world that is not rectangular or square? It is shaped like a double pennon.

- Did you know that Papua New Guinea has over 850 indigenous languages, making it the country with the most spoken languages in the world?`;

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
        setIsTypingComplete(true);
        clearInterval(interval);
      }
    }, 25);

    return () => clearInterval(interval);
  }, [fullText]);

  return (
    <PageContainer>
      <ContentGrid>
        <FactsSection>
          <h2 className="fun-facts">Fun Facts About Our World</h2>
          <FactsText>
            {text}
            {!isTypingComplete && <TypingCursor />}
          </FactsText>
        </FactsSection>
        
        <QuizSection>
          <PageTitle>World Geography Quizzes</PageTitle>
          <WorldImage src={WorldIcon} alt="World globe illustration" />
          <QuizOverview
            continent="World"
            capitalPath="/world-capital-quiz"
            countryPath="/world-country-quiz"
            flagPath="/world-flag-quiz"
          />
        </QuizSection>
      </ContentGrid>
    </PageContainer>
  );
}

export default World;
