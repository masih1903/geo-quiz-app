import styled from "styled-components";
import WorldLogo from "../../assets/world.png";

const CardContainer = styled.div`
  background: var(--white);
  border: 1px solid var(--gray-200);
  border-radius: var(--radius-2xl);
  box-shadow: var(--shadow-md);
  padding: var(--space-8);
  margin: var(--space-4);
  text-align: center;
  max-width: 380px;
  width: 100%;
  cursor: pointer;
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
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
    transition: left var(--transition-slow);
  }

  &:hover {
    transform: translateY(-8px);
    box-shadow: var(--shadow-xl);
    border-color: var(--primary-color);

    &::before {
      left: 100%;
    }
  }

  @media (max-width: 768px) {
    margin: var(--space-3);
    padding: var(--space-6);
    max-width: 100%;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  margin-bottom: var(--space-6);
`;

const CardImage = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  transition: all var(--transition-normal);
  border: 4px solid var(--primary-light);
  
  ${CardContainer}:hover & {
    transform: scale(1.1);
    border-color: var(--primary-color);
    box-shadow: 0 8px 25px rgba(37, 99, 235, 0.3);
  }

  @media (max-width: 768px) {
    width: 100px;
    height: 100px;
  }
`;

const CardTitle = styled.h2`
  font-family: var(--font-family-display);
  font-size: var(--text-2xl);
  font-weight: 700;
  color: var(--gray-900);
  margin: 0 0 var(--space-4) 0;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 3px;
    background: linear-gradient(90deg, var(--primary-color), var(--accent-color));
    border-radius: var(--radius-sm);
    transition: width var(--transition-normal);
  }

  ${CardContainer}:hover &::after {
    width: 60px;
  }

  @media (max-width: 768px) {
    font-size: var(--text-xl);
  }
`;

const CardDescription = styled.p`
  font-family: var(--font-family-sans);
  font-size: var(--text-base);
  color: var(--gray-600);
  line-height: 1.6;
  margin: 0;

  @media (max-width: 768px) {
    font-size: var(--text-sm);
  }
`;

const GradientOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--primary-color), var(--accent-color), var(--primary-color));
  opacity: 0;
  transition: opacity var(--transition-normal);

  ${CardContainer}:hover & {
    opacity: 1;
  }
`;

function Card(props) {
  return (
    <CardContainer>
      <GradientOverlay />
      <ImageContainer>
        <CardImage src={WorldLogo} alt={`${props.title} continent`} />
      </ImageContainer>
      <CardTitle>{props.title}</CardTitle>
      <CardDescription>{props.description}</CardDescription>
    </CardContainer>
  );
}

export default Card;
