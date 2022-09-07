import React from "react";
import styled from "styled-components/macro";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { theme } from "../styles/theme";
import headerLogoImage from "../assets/header_logo.png";

function Header({ isSignedin }) {
  const navigate = useNavigate();

  const handleSignoutButtonClick = async () => {
    await axios.get(`/user/signout`, { withCredentials: true });
    navigate(`/board/list`);
  };

  return (
    <HeaderContainer>
      <HeaderWrapper>
        <HeaderLogo
          src={headerLogoImage}
          alt=""
          onClick={() => navigate("/board/list")}
        />
        <AuthenticationWrapper>
          {isSignedin ? (
            <>
              <ClickableText onClick={() => navigate("/user/profile")}>
                PROFILE
              </ClickableText>
              <ClickableText onClick={handleSignoutButtonClick}>
                SIGN OUT
              </ClickableText>
            </>
          ) : (
            <>
              <ClickableText onClick={() => navigate("/user/signin")}>
                SIGN IN
              </ClickableText>
              <ClickableText onClick={() => navigate("/user/signup")}>
                SIGN UP
              </ClickableText>
            </>
          )}
        </AuthenticationWrapper>
      </HeaderWrapper>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  height: ${theme.layout.headerHeight};
  padding: 1rem;
  background-color: ${theme.color.lightPurple};
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
  width: 33%;
`;

const ClickableText = styled.div`
  cursor: pointer;
  &:hover {
    color: ${theme.color.secondary};
    transition: all 0.3s ease;
  }
`;

export default React.memo(Header);
