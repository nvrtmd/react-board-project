import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components/macro";
import { theme } from "../../../styles/theme";
import Layout from "../../../layout/layout";
import moment from "moment";
import Button from "../../global/Button";

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
        <Button
          handleClick={() => navigate("/board/create")}
          buttonName="Write"
        />
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
                  <TableRow
                    key={data.post_id}
                    onClick={() => moveToPost(data.post_id)}
                  >
                    <TableCell>{data.post_id}</TableCell>
                    <TableCell>{data.post_title}</TableCell>
                    <TableCell>
                      {data.post_contents.substr(0, 5) + "..."}
                    </TableCell>
                    <TableCell>{data.post_views}</TableCell>
                    <TableCell>
                      {moment(data.post_register_date).format("YY-MM-DD HH:mm")}
                    </TableCell>
                    <TableCell>{data.post_register_user_name}</TableCell>
                  </TableRow>
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
  padding: 2rem 0;
`;

const TableRow = styled.tr`
  cursor: pointer;
`;

const TableCell = styled.td`
  padding: 0.5rem 1.5rem;
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
