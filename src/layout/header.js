import React, { useEffect } from "react";
import styled from "styled-components/macro";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { theme } from "../styles/theme";
import getDataFromLocalStorage from "../utils/getDataFromLocalStorage";
import saveDataToLocalStorage from "../utils/saveDataToLocalStorage";

export default function Header() {
  const navigate = useNavigate();

  useEffect(() => {
    if (getDataFromLocalStorage("isSignedin").length) return;
    const isSignedinUser = async () => {
      try {
        await axios.get(`/user/profile`, {
          withCredentials: true,
        });
        saveDataToLocalStorage("isSignedin", true);
      } catch {
        saveDataToLocalStorage("isSignedin", false);
      }
    };

    isSignedinUser();
  }, []);

  const handleSignoutButtonClick = async () => {
    await axios.get(`/user/signout`, { withCredentials: true });
    saveDataToLocalStorage("isSignedin", false);
    navigate(`/board/list`);
  };

  return (
    <HeaderContainer>
      <HeaderWrapper>
        <ClickableText onClick={() => navigate("/board/list")}>
          BOARD
        </ClickableText>
        <AuthenticationWrapper>
          {getDataFromLocalStorage("isSignedin") === true ? (
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
