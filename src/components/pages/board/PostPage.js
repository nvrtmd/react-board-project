import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components/macro";
import { theme } from "../../../styles/theme";
import Layout from "../../../layout/layout";

export default function PostPage() {
  const navigate = useNavigate();
  const params = useParams();
  const [postData, setPostData] = useState({
    postId: null,
    postTitle: "",
    postContents: "",
    postViews: null,
    postDisplay: null,
  });

  useEffect(() => {
    const getPostData = async () => {
      const fetchedPostData = await (
        await axios.get(`/board/${params.postId}`)
      ).data.data;

      setPostData({
        postId: fetchedPostData.post_id,
        postTitle: fetchedPostData.post_title,
        postContents: fetchedPostData.post_contents,
        postViews: fetchedPostData.post_views,
        postDisplay: fetchedPostData.post_display,
      });
    };

    getPostData();
  }, [params.postId]);

  const handleDeleteButtonClick = async () => {
    try {
      await axios.delete(`/board/delete/${postData.postId}`, {
        withCredentials: true,
      });
      navigate("/board/list");
    } catch {
      alert("삭제 권한이 없습니다.");
    }
  };

  return (
    <Layout>
      <div>{postData.postTitle}</div>
      <div>{postData.postContents}</div>
      <div>{postData.postViews}</div>
      <div>{postData.postDisplay}</div>
      <ButtonWrapper>
        <Button>수정</Button>
        <Button onClick={handleDeleteButtonClick}>삭제</Button>
        <Button onClick={() => navigate("/board/list")}>목록</Button>
      </ButtonWrapper>
    </Layout>
  );
}
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
