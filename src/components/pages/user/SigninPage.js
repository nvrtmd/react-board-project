import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components/macro";
import axios from "axios";
import Layout from "../../../layout/layout";
import { theme } from "../../../styles/theme";
import Button from "../../global/Button";
import { ButtonWrapper } from "../board/ListPage";

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
    try {
      await axios.post(`/user/signin`, signinData, { withCredentials: true });
      navigate(`/board/list`);
    } catch {
      alert("아이디 또는 비밀번호가 일치하지 않습니다.");
    }
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
        <Button handleClick={handleButtonClick} buttonName="Sign in" />
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
