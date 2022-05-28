import React from 'react'
import styled from 'styled-components'
import logo from "../assets/images/logo.svg";


const NavbarContainer = styled.div`
  height: 48px;
  padding-inline: 1.25rem;
  border-bottom: 1.1px solid #D1D1D1;
  display: flex;
  align-items: center;
`;

const NavbarLogo = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
`;

const Logo = styled.img`
  height: 31px;
  width: 31px;
`;

const LogoText = styled.h3`
  /* font-family: 'SF Pro Text'; */
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-weight: 600;
  font-size: 16px;
  word-spacing: 1.5px;
  /* line-height: 24px; */
  /* identical to box height, or 150% */
  color: #7E8185;
  padding-left: 1.1rem;
`;

const Navbar = () => {
  return (
    <NavbarContainer>
        
        <NavbarLogo>
            <Logo src={logo} alt="logo" />
        </NavbarLogo>

        <LogoText>
            Monk Upsell & Cross-sell  
        </LogoText>        

    </NavbarContainer>
  )
}

export default Navbar