import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components/macro";
import moment from "moment";
import { Layout } from "../../../layout/layout";
import { Button } from "../../global/Button";
import { ButtonWrapper } from "./ListPage";
import { BUTTONS_TEXT, ALERT_TEXT } from "../../../constants";

export function PostPage() {
  const navigate = useNavigate();
  const params = useParams();
  const [postData, setPostData] = useState({
    postId: null,
    postTitle: "",
    postContents: "",
    postRegisterUserName: "",
    postRegisterDate: "",
    postViews: null,
    postDisplay: null,
  });

  const getPostData = useCallback(async () => {
    const fetchedPostData = await (
      await axios.get(`/board/${params.postId}`)
    ).data.data;
    setPostData({
      postId: fetchedPostData.post_id,
      postTitle: fetchedPostData.post_title,
      postContents: fetchedPostData.post_contents,
      postRegisterUserName: fetchedPostData.post_register_user_name,
      postRegisterDate: fetchedPostData.post_register_date,
      postViews: fetchedPostData.post_views,
      postDisplay: fetchedPostData.post_display,
    });
  }, [params.postId]);

  useEffect(() => {
    getPostData();
  }, [getPostData]);

  const handleDeleteButtonClick = useCallback(async () => {
    try {
      await axios.delete(`/board/delete/${postData.postId}`, {
        withCredentials: true,
      });
      navigate("/board/list");
    } catch {
      alert(ALERT_TEXT.CANNOT_DELETE_THE_POST);
    }
  }, [navigate, postData.postId]);

  const handleModifyButtonClick = useCallback(async () => {
    try {
      const userData = await axios.get(`/user/profile`, {
        withCredentials: true,
      });
      if (userData.data.data.user_nickname === postData.postRegisterUserName) {
        navigate(`/board/modify/${postData.postId}`);
      } else {
        const error = new Error("unauthorized user");
        throw error;
      }
    } catch {
      alert(ALERT_TEXT.CANNOT_MODIFY_THE_POST);
    }
  }, [navigate, postData.postId, postData.postRegisterUserName]);

  return (
    <Layout>
      <PostContainer>
        <PostWrapper>
          <PostHeader>
            <PostTitle>{postData.postTitle}</PostTitle>
            <PostRegisterUserName>
              posted by {postData.postRegisterUserName}
            </PostRegisterUserName>
            <PostRegisterDate>
              <div>
                {postData.postRegisterDate &&
                  moment(postData.postRegisterDate).format("YY-MM-DD HH:mm")}
              </div>
              <div>views {postData.postViews}</div>
            </PostRegisterDate>
          </PostHeader>
          <PostBody>{postData.postContents} </PostBody>
        </PostWrapper>
        <ButtonWrapper>
          <Button
            handleClick={handleModifyButtonClick}
            buttonName={BUTTONS_TEXT.MODIFY}
          />
          <Button
            handleClick={handleDeleteButtonClick}
            buttonName={BUTTONS_TEXT.DELETE}
          />
          <Button
            handleClick={() => navigate("/board/list")}
            buttonName={BUTTONS_TEXT.LIST}
          />
        </ButtonWrapper>
      </PostContainer>
    </Layout>
  );
}

const PostContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

const PostWrapper = styled.div`
  height: auto;
`;

const PostHeader = styled.div`
  border-bottom: 1px solid black;
  padding-bottom: 0.5rem;
`;

const PostTitle = styled.div`
  font-size: 2.5rem;
`;
const PostRegisterUserName = styled.div`
  font-size: 1.25rem;
`;
const PostRegisterDate = styled.div`
  display: flex;
  justify-content: space-between;
  width: 35%;
  font-size: 1rem;
`;

const PostBody = styled.div`
  padding: 2rem 0;
`;
