import React from "react";
import { Form, Button } from "semantic-ui-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function SiginPage(props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = (details) => {
    axios({
      method: "post",
      url: "/loginuser",
      data: {
        userName: details.userName,
        password: details.password,
      },
    })
      .then((response) => {
        const res = response.data.data;
        console.log(res);
        props.setToken(res.token);
        res.token && props.setToken(res.token);
        navigate('/user/homepage')
        // history.pushState(url='/user/homepage')
      })
      .catch((error) => {
        if (error.response) {
          alert(error.response.status);
        }
      });
    reset();
  };

  return (
    <div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Field>
          <label>* User Name</label>
          <input
            placeholder="User Name"
            type="text"
            {...register("userName")}
          />
        </Form.Field>
        <Form.Field>
          <label>* Password</label>
          <input
            placeholder="Password"
            type="password"
            {...register("password")}
          />
        </Form.Field>
        <Button type="submit">Sign In</Button>
      </Form>
    </div>
  );
}

export default SiginPage;
