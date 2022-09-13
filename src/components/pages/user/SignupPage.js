import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components/macro";
import axios from "axios";
import { Layout } from "../../../layout/layout";
import { Button } from "../../global/Button";
import { ButtonWrapper } from "../board/ListPage";
import { InputContainer } from "../../board/InputContainer";

export function SignupPage() {
  const navigate = useNavigate();
  const [signupData, setSignupData] = useState({
    userId: "",
    userPassword: "",
    userName: "",
    userNickname: "",
    userPhone: "",
  });

  const handleInputChange = (e) => {
    setSignupData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleButtonClick = async () => {
    await axios.post(`/user/signup`, signupData);
    navigate(`/user/signin`);
  };

  return (
    <Layout>
      <PageTitle>SIGN UP</PageTitle>
      <SignupForm>
        <div>
          <UserIdWrapper>
            <InputContainer
              title="Id"
              placeholder="Write id"
              name="userId"
              handleChange={handleInputChange}
              type="text"
            />
          </UserIdWrapper>
          <UserPasswordWrapper>
            <InputContainer
              title="Password"
              placeholder="Write password"
              name="userPassword"
              handleChange={handleInputChange}
              type="password"
            />
          </UserPasswordWrapper>
          <UserNicknameWrapper>
            <InputContainer
              title="Nickname"
              placeholder="Write nickname"
              name="userNickname"
              handleChange={handleInputChange}
              type="text"
            />
          </UserNicknameWrapper>
          <UserNameWrapper>
            <InputContainer
              title="Name"
              placeholder="Write name"
              name="userName"
              handleChange={handleInputChange}
              type="text"
            />
          </UserNameWrapper>
          <UserPhoneWrapper>
            <InputContainer
              title="Phone"
              placeholder="Write phone number"
              name="userPhone"
              handleChange={handleInputChange}
              type="text"
            />
          </UserPhoneWrapper>
        </div>
      </SignupForm>
      <ButtonWrapper>
        <Button handleClick={handleButtonClick} buttonName="Sign up" />
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
