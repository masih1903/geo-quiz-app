import { NavLink, Outlet } from "react-router-dom";
import styled from "styled-components";
import HomeIcon from "../SvgComponents/HomeIcon";

const Container = styled.div`
  flex-direction: column;
  align-items: center;
  min-height: 100vh; /* Sørger for at fylde hele vinduet */
`;

const StyledHeader = styled.header`
  background-color: rgb(0, 0, 0);
  color: #ffffff;
  padding: 0.5rem 1rem; /* Reducér header-størrelse */
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1000;
  margin-bottom: 12px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Nav = styled.nav`
  ul {
    display: flex; /* Gør links horisontale */
    flex-wrap: wrap; /* Tillad menupunkterne at bryde til næste linje */
    list-style: none; /* Fjern punkttegn */

    @media (max-width: 768px) {
      justify-content: center; /* Centrer menupunkterne på små skærme */
    }
  }

  li {
    margin: 0 0.8rem; /* Giv mellemrum mellem links */
  }

  a {
    text-decoration: none; /* Fjern understregning */
    color: white;
    font-size: 1.5rem;

    &:hover {
      text-decoration: underline; /* Understreg ved hover */
    }
  }
`;

const StyledFooter = styled.footer`
  background-color: rgb(0, 0, 0);
  color: #ffffff;
  text-align: center;
  margin-top: 15px;
  padding: 0.1px;
`;

const Logo = styled.img`
  height: 7rem;
  cursor: pointer;
  transition: transform 0.3s ease, opacity 0.3s ease; /* Smooth hover effect */

  &:hover {
    transform: scale(1.1); /* Slightly increase size */
    opacity: 0.8; /* Slightly reduce opacity */
  }
`;

function MainLayout() {
  return (
    <>
      {" "}
      <StyledHeader>
        <NavLink to="/">
          <Logo src="/Atlaslogoblackcopy.png" alt="Atlas Logo" />
        </NavLink>
        <Nav>
          <ul>
            <li>
              <NavLink to="/">{HomeIcon}</NavLink>
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
      <Outlet />
      <StyledFooter>
        <p>© {new Date().getFullYear()} Atlas Quiz.</p>{" "}
      </StyledFooter>
    </>
  );
}

export default MainLayout;
