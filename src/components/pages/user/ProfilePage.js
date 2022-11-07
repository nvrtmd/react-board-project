import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components/macro";
import { Layout } from "../../../layout/layout";
import {
  PAGES_TITLES,
  BUTTONS_TEXT,
  INPUT_PLACEHOLDERS,
} from "../../../constants";
import { Button } from "../../global/Button";
import { InputContainer } from "../../board/InputContainer";
import { ButtonWrapper } from "../board/ListPage";

export function ProfilePage() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    userId: "",
    userPassword: "",
    userName: "",
    userNickname: "",
    userPhone: "",
  });

  const getUserData = useCallback(async () => {
    const fetchedUserData = await (
      await axios.get(`/user/profile`, { withCredentials: true })
    ).data.data;

    setUserData({
      userId: fetchedUserData.user_id,
      userName: fetchedUserData.user_name,
      userNickname: fetchedUserData.user_nickname,
      userPhone: fetchedUserData.user_phone,
    });
  }, []);

  useEffect(() => {
    getUserData();
  }, [getUserData]);

  const handleInputChange = useCallback((e) => {
    setUserData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  const handleSignoutButtonClick = useCallback(async () => {
    await axios.get(`/user/signout`, { withCredentials: true });
    navigate(`/board/list`);
  }, [navigate]);

  const handleModifyButtonClick = useCallback(async () => {
    await axios.post(`/user/profile`, userData, { withCredentials: true });
    navigate(`/board/list`);
  }, [navigate, userData]);

  const handleUserDeleteButtonClick = useCallback(async () => {
    await axios.delete(`/user/deleteuser`, { withCredentials: true });
    navigate(`/board/list`);
  }, [navigate]);

  return (
    <Layout>
      <PageTitle>{PAGES_TITLES.PROFILE}</PageTitle>
      <ProfileForm>
        <div>
          <UserIdWrapper>
            <InputContainer
              title="Id"
              placeholder={INPUT_PLACEHOLDERS.WRITE_ID}
              name="userId"
              handleChange={handleInputChange}
              type="text"
              value={userData.userId}
            />
          </UserIdWrapper>
          <UserPasswordWrapper>
            <InputContainer
              title="Password"
              placeholder={INPUT_PLACEHOLDERS.WRITE_PASSWORD}
              name="userPassword"
              handleChange={handleInputChange}
              type="password"
              value={userData.userPassword}
            />
          </UserPasswordWrapper>
          <UserNicknameWrapper>
            <InputContainer
              title="Nickname"
              placeholder={INPUT_PLACEHOLDERS.WRITE_NICKNAME}
              name="userNickname"
              handleChange={handleInputChange}
              type="text"
              value={userData.userNickname}
            />
          </UserNicknameWrapper>
          <UserNameWrapper>
            <InputContainer
              title="Name"
              placeholder={INPUT_PLACEHOLDERS.WRITE_NAME}
              name="userName"
              handleChange={handleInputChange}
              type="text"
              value={userData.userName}
            />
          </UserNameWrapper>
          <UserPhoneWrapper>
            <InputContainer
              title="Phone"
              placeholder={INPUT_PLACEHOLDERS.WRITE_PHONE_NUMBER}
              name="userPhone"
              handleChange={handleInputChange}
              type="text"
              value={userData.userPhone}
            />
          </UserPhoneWrapper>
        </div>
      </ProfileForm>
      <ButtonWrapper>
        <Button
          handleClick={handleModifyButtonClick}
          buttonName={BUTTONS_TEXT.MODIFY}
        />
        <Button
          handleClick={handleSignoutButtonClick}
          buttonName={BUTTONS_TEXT.SIGN_OUT}
        />
        <Button
          handleClick={handleUserDeleteButtonClick}
          buttonName={BUTTONS_TEXT.DELETE_ACCOUNT}
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

const UserIdWrapper = styled.div`
  height: 4.5rem;
  margin-bottom: 1rem;
`;

const UserPasswordWrapper = styled(UserIdWrapper)``;
const UserNicknameWrapper = styled(UserIdWrapper)``;
const UserNameWrapper = styled(UserIdWrapper)``;
const UserPhoneWrapper = styled(UserIdWrapper)``;
