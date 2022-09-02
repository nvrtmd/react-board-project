import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components/macro";
import { theme } from "../../../styles/theme";
import Layout from "../../../layout/layout";
import moment from "moment";

export default function ListPage() {
  const navigate = useNavigate();
  const [postsData, setPostsData] = useState([]);

  const getPostsData = async () => {
    const fetchedPostsData = await (await axios.get(`/board/list`)).data.data;

    setPostsData(fetchedPostsData);
  };

  useEffect(() => {
    getPostsData();
  }, []);

  const moveToPost = (postId) => {
    navigate(`/board/${postId}`);
  };

  return (
    <Layout>
      <ButtonWrapper>
        <Button onClick={() => navigate("/board/create")}>게시글 작성</Button>
      </ButtonWrapper>
      <TableWrapper>
        <table>
          <thead>
            <tr>
              <th>Index</th>
              <th>Title</th>
              <th>Contents</th>
              <th>Views</th>
              <th>Date</th>
              <th>Writer</th>
            </tr>
          </thead>
          <tbody>
            {postsData &&
              postsData
                .filter((data) => data.post_display)
                .map((data) => (
                  <tr
                    key={data.post_id}
                    onClick={() => moveToPost(data.post_id)}
                  >
                    <td>{data.post_id}</td>
                    <td>{data.post_title}</td>
                    <td>{data.post_contents.substr(0, 5) + "..."}</td>
                    <td>{data.post_views}</td>
                    <td>
                      {moment(data.post_register_date).format("YY-MM-DD HH:mm")}
                    </td>
                    <td>{data.post_register_user_name}</td>
                  </tr>
                ))}
          </tbody>
        </table>
      </TableWrapper>
    </Layout>
  );
}

const TableWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

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
