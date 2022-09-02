import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "../../../layout/layout";

export default function Profile() {
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

  return (
    <Layout>
      <div>아이디: {userData.userId}</div>
      <div>이름: {userData.userName}</div>
      <div>닉네임: {userData.userNickname}</div>
      <div>전화번호: {userData.userPhone}</div>
    </Layout>
  );
}
