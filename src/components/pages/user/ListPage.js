import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Layout } from "../../../layout/layout";

export function ListPage() {
  const navigate = useNavigate();
  const [usersData, setUsersData] = useState([]);

  const getUsersData = async () => {
    const fetchedUsersData = await axios.get(`/user/list`, {
      withCredentials: true,
    });

    setUsersData(fetchedUsersData.data);
  };

  useEffect(() => {
    getUsersData();
  }, []);

  return (
    <Layout>
      {usersData && usersData.map((data) => <div>{data.user_nickname}</div>)}
    </Layout>
  );
}
