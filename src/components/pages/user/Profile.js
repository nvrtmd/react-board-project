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

  useEffect(() => {
    app
      .get(`/user/profile`)
      .then((res) => setUserData(res.data.data))
      .catch((err) => {});
  }, []);

  console.log(userData);

  return <Layout></Layout>;
}
