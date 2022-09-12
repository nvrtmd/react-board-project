import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components/macro";
import Layout from "../../../layout/layout";
import Button from "../../global/Button";
import { ButtonWrapper } from "./ListPage";
import InputContainer from "../../board/InputContainer";
import TextInputContainer from "../../board/TextInputContainer";
import SelectContainer from "../../board/SelectContainer";

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
      <PostModifyFormWrapper>
        <PostModifyForm>
          <PostTitleWrapper>
            <InputContainer
              title="Title"
              type="text"
              placeholder="Write title"
              name="postTitle"
              handleChange={handleInputChange}
              value={postData.postTitle}
            />
          </PostTitleWrapper>
          <PostContentsWrapper>
            <TextInputContainer
              placeholder="Write Contents"
              type="text"
              name="postContents"
              handleChange={handleInputChange}
              value={postData.postContents}
            />
          </PostContentsWrapper>
          <SelectWrapper>
            <SelectContainer
              optionList={[
                { name: "게시함", value: true },
                { name: "게시 안함", value: false },
              ]}
              name="postDisplay"
              handleChange={handleInputChange}
              value={Boolean(postData.postDisplay)}
            />
          </SelectWrapper>
        </PostModifyForm>
      </PostModifyFormWrapper>
      <ButtonWrapper>
        <Button handleClick={handleModifyButtonClick} buttonName="Modify" />
      </ButtonWrapper>
    </Layout>
  );
}

const PageTitle = styled.div`
  text-align: center;
`;

const PostModifyFormWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 2rem;
`;

const PostModifyForm = styled.div`
  width: 100%;
`;

const PostTitleWrapper = styled.div`
  height: 4.5rem;
  margin-bottom: 1rem;
`;

const PostContentsWrapper = styled.div`
  height: 25rem;
  margin-bottom: 1rem;
`;

const SelectWrapper = styled.div`
  height: 4.5rem;
  width: 10rem;
`;
