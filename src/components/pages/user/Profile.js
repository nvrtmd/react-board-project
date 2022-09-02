import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../../../layout/layout";
import styled from "styled-components/macro";
import { theme } from "../../../styles/theme";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    userId: "",
    userName: "",
    userNickname: "",
    userPhone: "",
  });

  const getUserData = async () => {
    const fetchedUserData = await (
      await axios.get(`/user/profile`, { withCredentials: true })
    ).data.data;

    setUserData({
      userId: fetchedUserData.user_id,
      userName: fetchedUserData.user_name,
      userNickname: fetchedUserData.user_nickname,
      userPhone: fetchedUserData.user_phone,
    });
  };

  useEffect(() => {
    getUserData();
  }, []);

  const handleSignoutButtonClick = async () => {
    await axios.get(`/user/signout`, { withCredentials: true });
    navigate(`/`);
  };

  const handleUserDeleteButtonClick = async () => {
    await axios.delete(`/user/deleteuser`, { withCredentials: true });
    navigate(`/`);
  };

  return (
    <Layout>
      <div>아이디: {userData.userId}</div>
      <div>이름: {userData.userName}</div>
      <div>닉네임: {userData.userNickname}</div>
      <div>전화번호: {userData.userPhone}</div>
      <ButtonWrapper>
        <Button onClick={handleSignoutButtonClick}>로그아웃</Button>
        <Button onClick={handleUserDeleteButtonClick}>회원탈퇴</Button>
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
