import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { useState } from "react";
import WorldLogo from "../assets/world.png";
import CapitalLogo from "../assets/capital.png";

const QuizContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--space-6);
  width: 100%;
  max-width: 800px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: var(--space-4);
  }
`;

const QuizCard = styled(NavLink)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: var(--space-6);
  background: var(--white);
  border: 2px solid var(--gray-200);
  border-radius: var(--radius-xl);
  text-decoration: none;
  color: var(--gray-900);
  transition: all var(--transition-normal);
  box-shadow: var(--shadow-md);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, var(--primary-color), var(--accent-color));
    transform: scaleX(0);
    transition: transform var(--transition-normal);
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-xl);
    border-color: var(--primary-color);
    color: var(--primary-color);

    &::before {
      transform: scaleX(1);
    }
  }

  &:active {
    transform: translateY(-2px);
  }
`;

const QuizIcon = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 50%;
  margin-bottom: var(--space-4);
  border: 3px solid var(--gray-200);
  transition: all var(--transition-normal);

  ${QuizCard}:hover & {
    border-color: var(--primary-color);
    transform: scale(1.1);
    box-shadow: 0 8px 20px rgba(37, 99, 235, 0.3);
  }
`;

const QuizTitle = styled.span`
  font-family: var(--font-family-display);
  font-size: var(--text-base);
  font-weight: 600;
  text-align: center;
  line-height: 1.4;
  
  @media (max-width: 768px) {
    font-size: var(--text-sm);
  }
`;

const QuizBadge = styled.div`
  position: absolute;
  top: var(--space-3);
  right: var(--space-3);
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--success-color);
  opacity: 0;
  transform: scale(0);
  transition: all var(--transition-normal);

  ${QuizCard}:hover & {
    opacity: 1;
    transform: scale(1);
  }
`;

function QuizOverview(props) {
  const [hovered, setHovered] = useState(null);

  const quizTypes = [
    {
      type: "capital",
      path: props.capitalPath,
      icon: CapitalLogo,
      title: `${props.continent} Capital Quiz`,
      alt: "capital icon"
    },
    {
      type: "country", 
      path: props.countryPath,
      icon: WorldLogo,
      title: `${props.continent} Country Quiz`,
      alt: "country icon"
    },
    {
      type: "flag",
      path: props.flagPath,
      icon: "flagicon.png",
      title: `${props.continent} Flag Quiz`,
      alt: "flag icon"
    }
  ];

  return (
    <QuizContainer>
      {quizTypes.map((quiz) => (
        <QuizCard
          key={quiz.type}
          to={quiz.path}
          onMouseEnter={() => setHovered(quiz.type)}
          onMouseLeave={() => setHovered(null)}
        >
          <QuizBadge />
          <QuizIcon src={quiz.icon} alt={quiz.alt} />
          <QuizTitle>{quiz.title}</QuizTitle>
        </QuizCard>
      ))}
    </QuizContainer>
  );
}

export default QuizOverview;
