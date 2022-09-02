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
    userPassword: "",
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

  const handleInputChange = (e) => {
    setUserData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSignoutButtonClick = async () => {
    await axios.get(`/user/signout`, { withCredentials: true });
    navigate(`/`);
  };

  const handleModifyButtonClick = async () => {
    await axios.post(`/user/profile`, userData, { withCredentials: true });
    navigate(`/`);
  };

  const handleUserDeleteButtonClick = async () => {
    await axios.delete(`/user/deleteuser`, { withCredentials: true });
    navigate(`/`);
  };

  return (
    <Layout>
      <label for="userId">아이디</label>
      <input
        type="text"
        id="userId"
        name="userId"
        value={userData.userId}
        onChange={handleInputChange}
      />
      <label for="userPassword">비밀번호</label>
      <input
        type="password"
        id="userPassword"
        name="userPassword"
        onChange={handleInputChange}
      />
      <label for="userName">닉네임</label>
      <input
        type="text"
        id="userNickname"
        name="userNickname"
        value={userData.userNickname}
        onChange={handleInputChange}
      />

      <label for="userName">이름</label>
      <input
        type="text"
        id="userName"
        name="userName"
        value={userData.userName}
        onChange={handleInputChange}
      />
      <label for="userPhone">전화번호</label>
      <input
        type="text"
        id="userPhone"
        name="userPhone"
        value={userData.userPhone}
        onChange={handleInputChange}
      />

      <ButtonWrapper>
        <Button onClick={handleModifyButtonClick}>정보수정</Button>
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
