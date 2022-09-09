import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../../../layout/layout";
import styled from "styled-components/macro";
import { theme } from "../../../styles/theme";
import { useNavigate } from "react-router-dom";
import Button from "../../global/Button";

export default function ProfilePage() {
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
    navigate(`/board/list`);
  };

  const handleModifyButtonClick = async () => {
    await axios.post(`/user/profile`, userData, { withCredentials: true });
    navigate(`/board/list`);
  };

  const handleUserDeleteButtonClick = async () => {
    await axios.delete(`/user/deleteuser`, { withCredentials: true });
    navigate(`/board/list`);
  };

  return (
    <Layout>
      <PageTitle>PROFILE</PageTitle>
      <ProfileForm>
        <div>
          <ProfileInput>
            <label htmlFor="userId">아이디</label>
            <input
              type="text"
              id="userId"
              name="userId"
              value={userData.userId}
              onChange={handleInputChange}
            />
          </ProfileInput>
          <ProfileInput>
            <label htmlFor="userPassword">비밀번호</label>
            <input
              type="password"
              id="userPassword"
              name="userPassword"
              onChange={handleInputChange}
            />
          </ProfileInput>
          <ProfileInput>
            <label htmlFor="userName">닉네임</label>
            <input
              type="text"
              id="userNickname"
              name="userNickname"
              value={userData.userNickname}
              onChange={handleInputChange}
            />
          </ProfileInput>
          <ProfileInput>
            <label htmlFor="userName">이름</label>
            <input
              type="text"
              id="userName"
              name="userName"
              value={userData.userName}
              onChange={handleInputChange}
            />
          </ProfileInput>
          <ProfileInput>
            <label htmlFor="userPhone">전화번호</label>
            <input
              type="text"
              id="userPhone"
              name="userPhone"
              value={userData.userPhone}
              onChange={handleInputChange}
            />
          </ProfileInput>
        </div>
      </ProfileForm>

      <ButtonWrapper>
        <Button handleClick={handleModifyButtonClick} buttonName="Modify" />
        <Button handleClick={handleSignoutButtonClick} buttonName="Sign out" />
        <Button
          handleClick={handleUserDeleteButtonClick}
          buttonName="Delete account"
        />
      </ButtonWrapper>
    </Layout>
  );
}

const PageTitle = styled.div`
  text-align: center;
`;

const ProfileForm = styled.div`
  display: flex;
  justify-content: center;
  padding: 2rem;
`;

const ProfileInput = styled.div`
  padding: 0.3rem 0;
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 45%;
  margin: 0 auto;
`;
