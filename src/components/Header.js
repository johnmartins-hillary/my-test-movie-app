import React from "react";
import styled from "styled-components";
import { mobile } from "../responsive.js";

const HeaderStyled = styled.div`
  position: sticky;
  top: 0;
  display: flex;
  justify-content: flex-start;
  background-color: #222;
  width: 100%;
  padding: 20px 40px;
  ${mobile({ justifyContent: "center" })}
  z-index: 1000;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #fff;
  padding: 10px;
  color: #fff;
  font-size: 20px;
  font-weight: 100;
`;

function Header() {
  return (
    <HeaderStyled>
      <Logo>MyTestApp</Logo>
    </HeaderStyled>
  );
}

export default Header;
