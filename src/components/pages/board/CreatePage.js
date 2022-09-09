import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components/macro";
import axios from "axios";
import Layout from "../../../layout/layout";
import { theme } from "../../../styles/theme";
import Button from "../../global/Button";

export default function CreatePage() {
  const navigate = useNavigate();
  const [newPostData, setNewPostData] = useState({
    postTitle: "",
    postContents: "",
    postDisplay: "true",
    postRegisterUserName: "",
  });

  useEffect(() => {
    const isSignedinUser = async () => {
      try {
        const userData = await axios.get(`/user/profile`, {
          withCredentials: true,
        });

        setNewPostData((prev) => ({
          ...prev,
          postRegisterUserName: userData.data.data.user_nickname,
        }));
      } catch {
        navigate("/user/signin");
      }
    };

    isSignedinUser();
  }, [navigate]);

  const handleInputChange = (e) => {
    setNewPostData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCreateButtonClick = async () => {
    setNewPostData((prev) => ({
      ...prev,
      postDisplay: prev.postDisplay === "true" ? 1 : 0,
    }));
    await axios.post(`/board/create`, newPostData, { withCredentials: true });
    navigate(`/board/list`);
  };

  return (
    <Layout>
      <PageTitle>CREATE POST</PageTitle>
      <PostCreateForm>
        <div>
          <div>
            <label htmlFor="postTitle">제목</label>
            <input
              id="postTitle"
              name="postTitle"
              type="text"
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="postContents">내용</label>
            <textarea
              name="postContents"
              rows="20"
              cols="50"
              onChange={handleInputChange}
            ></textarea>
          </div>
          <div>
            <select
              id="postDisplay"
              name="postDisplay"
              onChange={handleInputChange}
            >
              <option value={true}>게시함</option>
              <option value={false}>게시안함</option>
            </select>
          </div>
        </div>
      </PostCreateForm>

      <ButtonWrapper>
        <Button handleClick={handleCreateButtonClick} buttonName="Write" />
        <Button
          handleClick={() => navigate("/board/list")}
          buttonName="Cancel"
        />
      </ButtonWrapper>
    </Layout>
  );
}

const PageTitle = styled.div`
  text-align: center;
`;

const PostCreateForm = styled.div`
  display: flex;
  justify-content: center;
  padding: 2rem;
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 20%;
  margin: 0 auto;
`;
