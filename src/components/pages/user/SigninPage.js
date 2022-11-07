import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components/macro";
import axios from "axios";
import { Layout } from "../../../layout/layout";
import { theme } from "../../../styles/theme";
import {
  PAGES_TITLES,
  BUTTONS_TEXT,
  INPUT_PLACEHOLDERS,
  ALERT_TEXT,
} from "../../../constants";
import { Button } from "../../global/Button";
import { ButtonWrapper } from "../board/ListPage";
import { InputContainer } from "../../board/InputContainer";

export function SigninPage() {
  const navigate = useNavigate();
  const [signinData, setSigninData] = useState({
    userId: "",
    userPassword: "",
  });

  const handleInputChange = useCallback((e) => {
    setSigninData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  const handleButtonClick = useCallback(async () => {
    try {
      await axios.post(`/user/signin`, signinData, { withCredentials: true });
      navigate(`/board/list`);
    } catch {
      alert(ALERT_TEXT.ID_OR_PASSWORD_DO_NOT_MATCH);
    }
  }, [navigate, signinData]);

  return (
    <Layout>
      <PageTitle>{PAGES_TITLES.SIGN_IN}</PageTitle>
      <SigninForm>
        <div>
          <UserIdWrapper>
            <InputContainer
              title="Id"
              placeholder={INPUT_PLACEHOLDERS.WRITE_ID}
              name="userId"
              handleChange={handleInputChange}
              type="text"
            />
          </UserIdWrapper>
          <UserPasswordWrapper>
            <InputContainer
              title="Password"
              type="password"
              placeholder={INPUT_PLACEHOLDERS.WRITE_PASSWORD}
              name="userPassword"
              handleChange={handleInputChange}
            />
          </UserPasswordWrapper>
        </div>
      </SigninForm>
      <ButtonWrapper>
        <Button
          handleClick={handleButtonClick}
          buttonName={BUTTONS_TEXT.SIGN_IN}
        />
      </ButtonWrapper>
      <SignupTextWrapper>
        <SignupText onClick={() => navigate("/user/signup")}>
          {BUTTONS_TEXT.CLICK_TO_SIGN_UP}
        </SignupText>
      </SignupTextWrapper>
    </Layout>
  );
}

const PageTitle = styled.div`
  text-align: center;
`;

const SigninForm = styled.div`
  display: flex;
  justify-content: center;
  padding: 2rem;
`;

const UserIdWrapper = styled.div`
  height: 4.5rem;
  margin-bottom: 1rem;
`;

const UserPasswordWrapper = styled(UserIdWrapper)``;

const SignupTextWrapper = styled.div`
  text-align: center;
  margin-top: 35px;
  display: grid;
  place-content: center;
`;

const SignupText = styled.div`
  color: ${theme.color.tertiary};
  font-size: 1rem;
  cursor: pointer;
  text-decoration: underline;
  text-underline-position: under;
  &:hover {
    color: ${theme.color.secondary};
    transition: all 0.3s ease;
  }
`;
