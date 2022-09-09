import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components/macro";
import axios from "axios";
import Layout from "../../../layout/layout";
import { theme } from "../../../styles/theme";
import Button from "../../global/Button";

export default function SignupPage() {
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
          <SignupInput>
            <label htmlFor="userId">아이디</label>
            <input
              type="text"
              id="userId"
              name="userId"
              onChange={handleInputChange}
            />
          </SignupInput>
          <SignupInput>
            <label htmlFor="userPassword">비밀번호</label>
            <input
              type="password"
              id="userPassword"
              name="userPassword"
              onChange={handleInputChange}
            />
          </SignupInput>
          <SignupInput>
            <label htmlFor="userName">닉네임</label>
            <input
              type="text"
              id="userNickname"
              name="userNickname"
              onChange={handleInputChange}
            />
          </SignupInput>
          <SignupInput>
            <label htmlFor="userName">이름</label>
            <input
              type="text"
              id="userName"
              name="userName"
              onChange={handleInputChange}
            />
          </SignupInput>
          <SignupInput>
            <label htmlFor="userPhone">전화번호</label>
            <input
              type="text"
              id="userPhone"
              name="userPhone"
              onChange={handleInputChange}
            />
          </SignupInput>
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

const SignupInput = styled.div`
  padding: 0.3rem 0;
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
