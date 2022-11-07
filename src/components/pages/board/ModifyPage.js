import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components/macro";
import { Layout } from "../../../layout/layout";
import { Button } from "../../global/Button";
import { ButtonWrapper } from "./ListPage";
import { InputContainer } from "../../board/InputContainer";
import { TextInputContainer } from "../../board/TextInputContainer";
import { SelectContainer } from "../../board/SelectContainer";
import {
  BUTTONS_TEXT,
  PAGES_TITLES,
  INPUT_PLACEHOLDERS,
  POST_DISPLAY_SELECT_OPTIONS,
} from "../../../constants";

export function ModifyPage() {
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

  const getPostData = useCallback(async () => {
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
  }, [params.postId]);

  useEffect(() => {
    getPostData();
  }, [getPostData]);

  const handleInputChange = useCallback((e) => {
    setPostData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  const handleModifyButtonClick = useCallback(async () => {
    setPostData((prev) => ({
      ...prev,
      postDisplay: prev.postDisplay === "true" ? 1 : 0,
    }));
    await axios.post(`/board/modify/${postData.postId}`, postData, {
      withCredentials: true,
    });
    navigate(`/board/${postData.postId}`);
  }, [navigate, postData]);

  return (
    <Layout>
      <PageTitle>{PAGES_TITLES.MODIFY_POST}</PageTitle>
      <PostModifyFormWrapper>
        <PostModifyForm>
          <PostTitleWrapper>
            <InputContainer
              title="Title"
              type="text"
              placeholder={INPUT_PLACEHOLDERS.WRITE_TITLE}
              name="postTitle"
              handleChange={handleInputChange}
              value={postData.postTitle}
            />
          </PostTitleWrapper>
          <PostContentsWrapper>
            <TextInputContainer
              placeholder={INPUT_PLACEHOLDERS.WRITE_CONTENTS}
              type="text"
              name="postContents"
              handleChange={handleInputChange}
              value={postData.postContents}
            />
          </PostContentsWrapper>
          <SelectWrapper>
            <SelectContainer
              optionList={POST_DISPLAY_SELECT_OPTIONS}
              name="postDisplay"
              handleChange={handleInputChange}
              value={Boolean(postData.postDisplay)}
            />
          </SelectWrapper>
        </PostModifyForm>
      </PostModifyFormWrapper>
      <ButtonWrapper>
        <Button
          handleClick={handleModifyButtonClick}
          buttonName={BUTTONS_TEXT.MODIFY}
        />
        <Button
          handleClick={() => navigate("/board/list")}
          buttonName={BUTTONS_TEXT.CANCEL}
        />
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
