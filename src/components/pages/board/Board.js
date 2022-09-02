import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "../../../layout/layout";

export default function Board() {
  const navigate = useNavigate();
  const [postsData, setPostsData] = useState([]);

  useEffect(() => {
    axios
      .get(`/board/list`)
      .then((res) => setPostsData(res.data.data))
      .catch((err) => {});
  }, []);

  const moveToPost = (postId) => {
    navigate(`/board/${postId}`);
  };

  return (
    <Layout>
      {postsData &&
        postsData.map((data) => (
          <div key={data.post_id} onClick={() => moveToPost(data.post_id)}>
            {data.post_title}
          </div>
        ))}
    </Layout>
  );
}
