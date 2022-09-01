import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components/macro";
import axios from "axios";
import Layout from "../../../layout/layout";
import { theme } from "../../../styles/theme";

export default function Signin() {
  const navigate = useNavigate();
  const [signinData, setSigninData] = useState({
    userId: "",
    userPassword: "",
  });

  const handleInputChange = (e) => {
    setSigninData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleButtonClick = async () => {
    await axios.post(`/user/signin`, signinData);
    navigate(`/`);
  };

  return (
    <Layout>
      <label for="userId">아이디</label>
      <input
        type="text"
        id="userId"
        name="userId"
        onChange={handleInputChange}
      />
      <label for="userPassword">비밀번호</label>
      <input
        type="password"
        id="userPassword"
        name="userPassword"
        onChange={handleInputChange}
      />
      <ButtonWrapper>
        <Button onClick={handleButtonClick}>로그인</Button>
      </ButtonWrapper>
    </Layout>
  );
}

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
