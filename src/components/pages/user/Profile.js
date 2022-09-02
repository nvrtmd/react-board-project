import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components/macro";
import axios from "axios";
import Layout from "../../../layout/layout";
import { theme } from "../../../styles/theme";
import app from "../../../utils/axiosConfig";

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
    return await fetch(`${process.env.REACT_APP_API_URL}/user/profile`, {
      method: "GET",
      withCredentials: true,
      credentials: "include",
    });
  };

  useEffect(() => {
    const data = getUserData();
    console.log(data);
    // axios
    //   .get(`/user/profile`, { withCredentials: true })
    //   .then((res) => setUserData(res.data.data))
    //   .catch((err) => {});
  }, []);

  console.log(userData);

  return <Layout></Layout>;
}
