import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components/macro";
import moment from "moment";
import { Layout } from "../../../layout/layout";
import { BUTTONS_TEXT } from "../../../constants";
import { Button } from "../../global/Button";
import { PostContainer } from "../../board/PostContainer";

export function ListPage() {
  const navigate = useNavigate();
  const [postsData, setPostsData] = useState([]);

  const getPostsData = useCallback(async () => {
    const fetchedPostsData = await axios.get(`/board/list`);
    setPostsData(fetchedPostsData.data.data);
  }, []);

  useEffect(() => {
    getPostsData();
  }, [getPostsData]);

  const moveToPost = useCallback(
    (postId) => {
      navigate(`/board/${postId}`);
    },
    [navigate]
  );

  const handleWriteButtonClick = useCallback(() => {
    navigate("/board/create");
  }, [navigate]);

  return (
    <Layout>
      <ButtonWrapper>
        <Button
          handleClick={() => handleWriteButtonClick()}
          buttonName={BUTTONS_TEXT.WRITE}
        />
      </ButtonWrapper>
      {postsData &&
        postsData
          .filter((data) => data.post_display)
          .map((data) => (
            <PostContainer
              handleClick={() => moveToPost(data.post_id)}
              key={data.post_id}
              postId={data.post_id}
              postTitle={data.post_title}
              postContents={data.post_contents.substr(0, 10) + "..."}
              postViews={data.post_views}
              postRegisterDate={moment(data.post_register_date).format(
                "YY-MM-DD HH:mm"
              )}
              postRegisterUserName={data.post_register_user_name}
            />
          ))}
    </Layout>
  );
}

export const ButtonWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  align-items: center;
  justify-content: center;
`;
