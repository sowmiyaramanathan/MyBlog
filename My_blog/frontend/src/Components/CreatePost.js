import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom'
import "../styles/styles.css";

function CreatePost(props) {
  const [title, setTitle] = useState(null);
  const [content, setContent] = useState(null);
  const { reset } = useForm();
  const navigate = useNavigate();

  function createBlogPost() {
    console.log("Hello")
    axios({
      method: "POST",
      url: "/user/createBlogPost",
      headers: {
        Authorization: "Bearer " + props.token,
      },
      data: {
        title: title,
        content: content,
      },
    })
      .then((response) => {
        const res = response.data;
        console.log(res);
        res.token && props.setToken(res.token);
        alert(`${res.message}`);
        navigate('/user/homepage')
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
        }
      });
    reset();
  }

  return (
    <div>
      <div className="blogForm">
        <div className="blogTitle">
          <label className="blogLabel">* Title </label>
          <input
            className="blogTitleInp"
            required
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          ></input>
        </div>
        <div className="blogContent">
          <label>* Blog Content </label>
          <textarea
            className="blogContentInp"
            required
            onChange={(e) => {
              setContent(e.target.value);
            }}
          ></textarea>
        </div>
        <div>
          <button onClick={createBlogPost}>Post Blog</button>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;
