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
      <table>
        <thead>
          <tr>
            <Th>Index</Th>
            <Th>Id</Th>
            <Th>Nickname</Th>
            <Th>Name</Th>
            <Th>Phone</Th>
          </tr>
        </thead>
        <tbody>
          {usersData &&
            usersData.map((data) => (
              <tr key={data.id}>
                <Td>{data.id}</Td>
                <Td>{data.user_id}</Td>
                <Td>{data.user_nickname}</Td>
                <Td>{data.user_name}</Td>
                <Td>{data.user_phone}</Td>
              </tr>
            ))}
        </tbody>
      </table>
    </Layout>
  );
}

const Th = styled.th`
  border: 1px solid black;
`;

const Td = styled.td`
  border: 1px solid black;
`;
