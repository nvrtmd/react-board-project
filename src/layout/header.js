import React from "react";
import styled from "styled-components/macro";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { theme } from "../styles/theme";

function Header({ isSignedin }) {
  const navigate = useNavigate();

  const handleSignoutButtonClick = async () => {
    await axios.get(`/user/signout`, { withCredentials: true });
    navigate(`/board/list`);
  };

  return (
    <HeaderContainer>
      <HeaderWrapper>
        <ClickableText onClick={() => navigate("/board/list")}>
          BOARD
        </ClickableText>
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
  padding: 1rem;
  color: ${theme.color.grey};
  height: ${theme.layout.headerHeight};
`;

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const AuthenticationWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 33%;
`;

const ClickableText = styled.div`
  cursor: pointer;
`;

export default React.memo(Header);
