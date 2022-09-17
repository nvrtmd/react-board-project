import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components/macro";
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
      <UsersTable>
        <thead>
          <tr>
            <UsersTh>Index</UsersTh>
            <UsersTh>Id</UsersTh>
            <UsersTh>Nickname</UsersTh>
            <UsersTh>Name</UsersTh>
            <UsersTh>Phone</UsersTh>
          </tr>
        </thead>
        <tbody>
          {usersData &&
            usersData.map((data) => (
              <UsersTr key={data.id}>
                <UsersTd>{data.id}</UsersTd>
                <UsersTd>{data.user_id}</UsersTd>
                <UsersTd>{data.user_nickname}</UsersTd>
                <UsersTd>{data.user_name}</UsersTd>
                <UsersTd>{data.user_phone}</UsersTd>
              </UsersTr>
            ))}
        </tbody>
      </UsersTable>
    </Layout>
  );
}

const UsersTable = styled.table`
  width: 100%;
  font-size: clamp(1rem, 2.5vw, 1.5rem);
  border: 1px solid black;
`;

const UsersTh = styled.th`
  border-bottom: 1px solid black;
`;

const UsersTr = styled.tr`
  cursor: pointer;
`;

const UsersTd = styled.td`
  border-bottom: 1px solid black;
`;
