import React, { useEffect, useState } from "react";
import styled from "styled-components/macro";
import axios from "axios";
import Layout from "../../../layout/layout";
import { theme } from "../../../styles/theme";

export default function Signup() {
  function hello() {
    console.log("hello");
  }
  return (
    <Layout>
      <label for="userId">아이디(메일주소)</label>
      <input type="text" id="userId" name="userId" />
      <label for="userPassword">비밀번호</label>
      <input type="password" id="userPassword" name="userPassword" />
      <label for="userPasswordConfirm">비밀번호 확인</label>
      <input
        type="password"
        id="userPasswordConfirm"
        name="userPasswordConfirm"
      />
      <label for="userName">이름</label>
      <input type="text" id="userName" name="userName" />
      <label for="userPhone">전화번호</label>
      <input type="text" id="userPhone" name="userPhone" />
      <ButtonWrapper>
        <Button onClick={hello}>회원가입</Button>
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
