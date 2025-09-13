import { NavLink } from "react-router-dom";
import styled from "styled-components";
import Card from "../../components/uiComponents/Card";

const HomeContainer = styled.div`
  padding: var(--space-12) var(--space-4);
  max-width: 1400px;
  margin: 0 auto;
`;

const HeroSection = styled.section`
  text-align: center;
  padding: var(--space-24) var(--space-6) var(--space-20);
  margin-bottom: var(--space-8);
`;

const HeroTitle = styled.h1`
  font-size: var(--text-5xl);
  font-weight: 800;
  color: var(--gray-900);
  margin-bottom: var(--space-6);
  background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  @media (max-width: 768px) {
    font-size: var(--text-4xl);
  }
`;

const HeroSubtitle = styled.p`
  font-size: var(--text-xl);
  color: var(--gray-600);
  max-width: 600px;
  margin: 0 auto var(--space-8);
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: var(--text-lg);
    margin-bottom: var(--space-6);
  }
`;

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: var(--space-6);
  justify-items: center;
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(3, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(6, 1fr);
    gap: var(--space-4);
  }
`;

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: inherit;
  
  &:hover {
    color: inherit;
  }
`;

function Home() {
  return (
    <HomeContainer>
      <HeroSection>
        <HeroTitle>Explore the World</HeroTitle>
        <HeroSubtitle>
          Test your geography knowledge with interactive quizzes covering countries, capitals, and flags from around the globe.
        </HeroSubtitle>
      </HeroSection>
      
      <CardsGrid>
        <StyledNavLink to="/world">
          <Card 
            title="World" 
            description="Identify countries, capitals and flags on a global scale - can you get them all?"
          />
        </StyledNavLink>
        
        <StyledNavLink to="/europe">
          <Card 
            title="Europe" 
            description="Explore Europe by identifying its countries, capitals and flags."
          />
        </StyledNavLink>
        
        <StyledNavLink to="/asia">
          <Card 
            title="Asia" 
            description="Can you pinpoint countries, capitals and flags across vast Asia?"
          />
        </StyledNavLink>
        
        <StyledNavLink to="/africa">
          <Card 
            title="Africa" 
            description="Identify the countries, capitals and flags of vibrant Africa."
          />
        </StyledNavLink>
        
        <StyledNavLink to="/north-america">
          <Card 
            title="North America" 
            description="Spot countries, capitals and flags in North America with confidence!"
          />
        </StyledNavLink>
        
        <StyledNavLink to="/south-america">
          <Card 
            title="South America" 
            description="How many South American countries, capitals and flags can you recall?"
          />
        </StyledNavLink>
      </CardsGrid>
    </HomeContainer>
  );
}

export default Home;
