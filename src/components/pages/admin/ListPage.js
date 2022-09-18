import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components/macro";
import { Layout } from "../../../layout/layout";
import { theme } from "../../../styles/theme";

export function ListPage() {
  const navigate = useNavigate();
  const [usersData, setUsersData] = useState([]);

  const getUsersData = useCallback(async () => {
    try {
      const fetchedUsersData = await axios.get(`/admin/userlist`, {
        withCredentials: true,
      });
      setUsersData(fetchedUsersData.data.data);
    } catch {
      navigate("/user/signin");
    }
  }, [navigate]);

  const deleteUserData = async (userIndex) => {
    if (window.confirm("삭제하시겠습니까?")) {
      await axios.delete(`/admin/user/${userIndex}`, {
        withCredentials: true,
      });
      getUsersData();
    } else {
      return;
    }
  };

  useEffect(() => {
    getUsersData();
  }, [getUsersData]);

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
            <UsersTh>Manage</UsersTh>
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
                <UsersTd>
                  <DeleteButton onClick={() => deleteUserData(data.id)}>
                    Delete
                  </DeleteButton>
                </UsersTd>
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
  border: 1px solid ${theme.color.deepGrey};
  text-align: center;
`;

const UsersTh = styled.th`
  border-bottom: 1px solid ${theme.color.deepGrey};
`;

const UsersTr = styled.tr``;

const UsersTd = styled.td`
  border-bottom: 1px solid ${theme.color.deepGrey};
`;

const DeleteButton = styled.div`
  cursor: pointer;
  &:hover {
    color: ${theme.color.secondary};
    transition: all 0.3s ease;
  }
`;
