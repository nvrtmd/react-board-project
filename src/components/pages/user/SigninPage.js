import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components/macro";
import axios from "axios";
import Layout from "../../../layout/layout";
import { theme } from "../../../styles/theme";

export default function SigninPage() {
  const navigate = useNavigate();
  const [signinData, setSigninData] = useState({
    userId: "",
    userPassword: "",
  });

  const handleInputChange = (e) => {
    setSigninData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleButtonClick = async () => {
    await axios.post(`/user/signin`, signinData, { withCredentials: true });
    navigate(`/user/profile`);
  };

  return (
    <Layout>
      <PageTitle>SIGN IN</PageTitle>
      <SigninForm>
        <div>
          <SigninInput>
            <label htmlFor="userId">아이디</label>
            <input
              type="text"
              id="userId"
              name="userId"
              onChange={handleInputChange}
            />
          </SigninInput>
          <SigninInput>
            <label htmlFor="userPassword">비밀번호</label>
            <input
              type="password"
              id="userPassword"
              name="userPassword"
              onChange={handleInputChange}
            />
          </SigninInput>
        </div>
      </SigninForm>
      <ButtonWrapper>
        <Button onClick={handleButtonClick}>로그인</Button>
      </ButtonWrapper>
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

const SigninInput = styled.div`
  padding: 0.3rem 0;
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Button = styled.div`
  background: ${theme.color.lightPurple};
  width: 20%;
  padding: 1rem 0px;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  transition: all 0.3s ease;
  cursor: pointer;
  &:hover {
    background: ${theme.color.primary};
  }
`;
