import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components/macro";
import Layout from "../../../layout/layout";
import Button from "../../global/Button";
import { ButtonWrapper } from "./ListPage";

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
    setPostData((prev) => ({
      ...prev,
      postDisplay: prev.postDisplay === "true" ? 1 : 0,
    }));
    await axios.post(`/board/modify/${postData.postId}`, postData, {
      withCredentials: true,
    });
    navigate(`/board/${postData.postId}`);
  };

  return (
    <Layout>
      <PageTitle>MODIFY POST</PageTitle>
      <PostModifyForm>
        <div>
          <div>
            <label htmlFor="postTitle">제목</label>
            <input
              id="postTitle"
              name="postTitle"
              type="text"
              value={postData.postTitle}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="postContents">내용</label>
            <textarea
              name="postContents"
              rows="20"
              cols="50"
              value={postData.postContents}
              onChange={handleInputChange}
            ></textarea>
          </div>
          <div>
            <select
              id="postDisplay"
              name="postDisplay"
              onChange={handleInputChange}
              value={postData.postDisplay ? true : false}
            >
              <option value={true}>게시함</option>
              <option value={false}>게시안함</option>
            </select>
          </div>
        </div>
      </PostModifyForm>
      <ButtonWrapper>
        <Button handleClick={handleModifyButtonClick} buttonName="Modify" />
      </ButtonWrapper>
    </Layout>
  );
}

const PageTitle = styled.div`
  text-align: center;
`;

const PostModifyForm = styled.div`
  display: flex;
  justify-content: center;
  padding: 2rem;
`;
