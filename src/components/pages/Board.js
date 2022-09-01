import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../../layout/layout";

export default function Board() {
  const [postsData, setPostsData] = useState([]);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/board/list`)
      .then((res) => setPostsData(res.data.data))
      .catch((err) => {});
  }, []);

  return (
    <Layout>
      {postsData &&
        postsData.map((data, index) => (
          <div key={index}>{data.post_title}</div>
        ))}
    </Layout>
  );
}
