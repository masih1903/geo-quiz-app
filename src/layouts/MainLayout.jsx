import { NavLink, Outlet } from "react-router-dom";
import styled from "styled-components";
import HomeIcon from "../components/svgComponents/HomeIcon.jsx";
import ScrollToTop from "../components/UIComponents/ScrollToTop";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: var(--gray-50);
`;

const StyledHeader = styled.header`
  background: linear-gradient(135deg, var(--white) 0%, var(--gray-100) 100%);
  border-bottom: 1px solid var(--gray-200);
  box-shadow: var(--shadow-sm);
  padding: var(--space-4) var(--space-6);
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1000;
  position: sticky;
  top: 0;
  backdrop-filter: blur(8px);

  @media (max-width: 768px) {
    flex-direction: column;
    gap: var(--space-4);
    padding: var(--space-4);
  }
`;

const Nav = styled.nav`
  ul {
    display: flex;
    align-items: center;
    gap: var(--space-6);
    list-style: none;
    margin: 0;
    padding: 0;

    @media (max-width: 768px) {
      flex-wrap: wrap;
      justify-content: center;
      gap: var(--space-4);
    }
  }

  li {
    display: flex;
    align-items: center;
  }

  a {
    text-decoration: none;
    color: var(--gray-700);
    font-size: var(--text-base);
    font-weight: 600;
    padding: var(--space-2) var(--space-4);
    border-radius: var(--radius-lg);
    transition: all var(--transition-fast);
    position: relative;

    &:hover {
      color: var(--primary-color);
      background-color: var(--primary-light);
      transform: translateY(-1px);
    }

    &.active {
      color: var(--primary-color);
      background-color: var(--primary-light);
    }

    @media (max-width: 768px) {
      font-size: var(--text-sm);
      padding: var(--space-2) var(--space-3);
    }
  }
`;

const StyledFooter = styled.footer`
  background: linear-gradient(135deg, var(--gray-800) 0%, var(--gray-900) 100%);
  color: var(--white);
  text-align: center;
  margin-top: auto;
  padding: var(--space-6);
  font-size: var(--text-sm);
`;

const Logo = styled.img`
  height: 3rem;
  cursor: pointer;
  transition: all var(--transition-normal);
  border-radius: var(--radius-lg);
  transform: translateY(16px) scale(1.7);

  &:hover {
    transform: translateY(16px) scale(1.785);
  }

  @media (max-width: 768px) {
    height: 3rem;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-3);
`;

const BrandText = styled.span`
  font-family: var(--font-family-display);
  font-size: var(--text-xl);
  font-weight: 700;
  color: var(--gray-900);
  margin-left: 10px;
  
  @media (max-width: 768px) {
    font-size: var(--text-lg);
  }
`;

function MainLayout() {
  return (
    <Container>
      <StyledHeader>
        <LogoContainer>
          <NavLink to="/">
            <Logo src="/mk.png" alt="Atlas Logo" />
          </NavLink>
          <BrandText>GeoQuiz</BrandText>
        </LogoContainer>
        <Nav>
          <ul>
            <li>
              <NavLink to="/"><HomeIcon /></NavLink>
            </li>
            <li>
              <NavLink to="/world">World</NavLink>
            </li>
            <li>
              <NavLink to="/europe">Europe</NavLink>
            </li>
            <li>
              <NavLink to="/asia">Asia</NavLink>
            </li>
            <li>
              <NavLink to="/africa">Africa</NavLink>
            </li>
            <li>
              <NavLink to="/north-america">North America</NavLink>
            </li>
            <li>
              <NavLink to="/south-america">South America</NavLink>
            </li>
          </ul>
        </Nav>
      </StyledHeader>
      <ScrollToTop />
      <Outlet />
      <StyledFooter>
        <p>© {new Date().getFullYear()} MK GeoQuiz - Explore the World Through Geography</p>
      </StyledFooter>
    </Container>
  );
}

export default MainLayout;
