import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components/macro";
import axios from "axios";
import { Layout } from "../../../layout/layout";
import { Button } from "../../global/Button";
import { ButtonWrapper } from "../board/ListPage";
import { InputContainer } from "../../board/InputContainer";
import {
  PAGES_TITLES,
  BUTTONS_TEXT,
  INPUT_PLACEHOLDERS,
} from "../../../constants";

export function SignupPage() {
  const navigate = useNavigate();
  const [signupData, setSignupData] = useState({
    userId: "",
    userPassword: "",
    userName: "",
    userNickname: "",
    userPhone: "",
  });

  const handleInputChange = useCallback((e) => {
    setSignupData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  const handleButtonClick = useCallback(async () => {
    await axios.post(`/user/signup`, signupData);
    navigate(`/user/signin`);
  }, [signupData, navigate]);

  return (
    <Layout>
      <PageTitle>{PAGES_TITLES.SIGN_UP}</PageTitle>
      <SignupForm>
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
              placeholder={INPUT_PLACEHOLDERS.WRITE_PASSWORD}
              name="userPassword"
              handleChange={handleInputChange}
              type="password"
            />
          </UserPasswordWrapper>
          <UserNicknameWrapper>
            <InputContainer
              title="Nickname"
              placeholder={INPUT_PLACEHOLDERS.WRITE_NICKNAME}
              name="userNickname"
              handleChange={handleInputChange}
              type="text"
            />
          </UserNicknameWrapper>
          <UserNameWrapper>
            <InputContainer
              title="Name"
              placeholder={INPUT_PLACEHOLDERS.WRITE_NAME}
              name="userName"
              handleChange={handleInputChange}
              type="text"
            />
          </UserNameWrapper>
          <UserPhoneWrapper>
            <InputContainer
              title="Phone"
              placeholder={INPUT_PLACEHOLDERS.WRITE_PHONE_NUMBER}
              name="userPhone"
              handleChange={handleInputChange}
              type="text"
            />
          </UserPhoneWrapper>
        </div>
      </SignupForm>
      <ButtonWrapper>
        <Button
          handleClick={handleButtonClick}
          buttonName={BUTTONS_TEXT.SIGN_UP}
        />
      </ButtonWrapper>
    </Layout>
  );
}

const PageTitle = styled.div`
  text-align: center;
`;

const SignupForm = styled.div`
  display: flex;
  justify-content: center;
  padding: 2rem;
`;

const UserIdWrapper = styled.div`
  height: 4.5rem;
  margin-bottom: 1rem;
`;

const UserPasswordWrapper = styled(UserIdWrapper)``;
const UserNicknameWrapper = styled(UserIdWrapper)``;
const UserNameWrapper = styled(UserIdWrapper)``;
const UserPhoneWrapper = styled(UserIdWrapper)``;
