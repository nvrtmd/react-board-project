import React, { memo } from "react";
import styled from "styled-components/macro";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { theme } from "../styles/theme";
import headerLogoImage from "../assets/header_logo.png";
import { BUTTONS_TEXT } from "../constants";

export const Header = memo(({ isSignedin, setIsSignedin }) => {
  const navigate = useNavigate();

  const handleSignoutButtonClick = async () => {
    await axios.get(`/user/signout`, { withCredentials: true });
    setIsSignedin(false);
    navigate(`/`);
  };

  return (
    <HeaderContainer>
      <HeaderWrapper>
        <HeaderLogo
          src={headerLogoImage}
          alt=""
          onClick={() => navigate("/")}
        />
        <AuthenticationWrapper>
          {isSignedin ? (
            <>
              <ClickableText onClick={() => navigate("/user/profile")}>
                {BUTTONS_TEXT.PROFILE}
              </ClickableText>
              <ClickableText onClick={handleSignoutButtonClick}>
                {BUTTONS_TEXT.SIGN_OUT}
              </ClickableText>
            </>
          ) : (
            <>
              <ClickableText onClick={() => navigate("/user/signin")}>
                {BUTTONS_TEXT.SIGN_IN}
              </ClickableText>
              <ClickableText onClick={() => navigate("/user/signup")}>
                {BUTTONS_TEXT.SIGN_UP}
              </ClickableText>
            </>
          )}
        </AuthenticationWrapper>
      </HeaderWrapper>
    </HeaderContainer>
  );
});

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  height: ${theme.layout.headerHeight};
  padding: 1rem;
  background-color: ${theme.color.tertiary};
`;

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const HeaderLogo = styled.img`
  width: 4rem;
  border-radius: 20%;
  cursor: pointer;
`;

const AuthenticationWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 13rem;
`;

const ClickableText = styled.div`
  cursor: pointer;
  &:hover {
    color: ${theme.color.secondary};
    transition: all 0.3s ease;
  }
`;
