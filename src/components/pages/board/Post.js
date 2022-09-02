import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Layout from "../../../layout/layout";

export default function Post() {
  const navigate = useNavigate();
  const params = useParams();
  const [postData, setPostData] = useState([]);

  console.log(params.postId);

  return <Layout></Layout>;
}
