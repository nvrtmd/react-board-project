import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components/macro";
import { theme } from "../../../styles/theme";
import Layout from "../../../layout/layout";

export default function ModifyPage() {
  const navigate = useNavigate();
  const params = useParams();
  const [postData, setPostData] = useState({
    postId: null,
    postTitle: "",
    postContents: "",
    postRegisterUserName: "",
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
        postRegisterUserName: fetchedPostData.post_register_user_name,
        postViews: fetchedPostData.post_views,
        postDisplay: fetchedPostData.post_display,
      });
    };

    getPostData();
  }, [params.postId]);

  const handleInputChange = (e) => {
    setPostData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleModifyButtonClick = async () => {
    console.log("modified");
  };

  return (
    <Layout>
      <label>제목</label>
      <input
        id="postTitle"
        name="postTitle"
        type="text"
        value={postData.postTitle}
        onChange={handleInputChange}
      />
      <label>내용</label>
      <textarea
        name="postContents"
        rows="20"
        cols="50"
        value={postData.postContents}
        onChange={handleInputChange}
      ></textarea>
      <select
        id="postDisplay"
        name="postDisplay"
        onChange={handleInputChange}
        value={postData.postDisplay ? true : false}
      >
        <option value={true}>게시함</option>
        <option value={false}>게시안함</option>
      </select>

      <ButtonWrapper>
        <Button onClick={handleModifyButtonClick}>수정</Button>
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
