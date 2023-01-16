import React from "react";
import { Form, Button } from "semantic-ui-react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import axios from 'axios';

function SigupPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    control,
  } = useForm();

  const navigate = useNavigate();

  function onSubmitSignup (details) {
    axios({
      method: 'post',
      url: '/registeruser',
      data: {
        name: details.name,
        userName: details.userName,
        email: details.email,
        password: details.password,
        phoneNumber: details.phoneNumber
      }
    }).then((response) => {
      alert(`${response.data.message}`);
      navigate('/signin');
    }).catch((error) => {
      if(error.response) {
        alert(error.response.message)
      }
    })
    reset()
  }

  return (
    <div>
      <Form onSubmit={handleSubmit(onSubmitSignup)}>
        <Form.Field>
          <label>* Name</label>
          <input
            placeholder="Name"
            type="text"
            {...register("name", { required: true })}
          />
        </Form.Field>
        {errors.name && errors.name.type === "required" && (
          <p>Name is required.</p>
        )}
        <Form.Field>
          <label>* User Name</label>
          <input
            placeholder="User Name"
            type="text"
            {...register("userName", { required: true, minLength: 10 })}
          />
        </Form.Field>
        {errors.userName && errors.userName.type === "required" && (
          <p>User name is required.</p>
        )}
        {errors.userName && (
          <p>User name should atleast contain 10 characters</p>
        )}
        <Form.Field>
          <label>* Email</label>
          <input
            placeholder="Email"
            type="email"
            {...register("email", {
              required: true,
              pattern:
                /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            })}
          />
        </Form.Field>
        {errors.email && errors.email.type === "required" && (
          <p>Email is required.</p>
        )}
        {errors.email && errors.email.type === "pattern" && (
          <p>Invlaid Email</p>
        )}
        <Form.Field>
          <label>* Password</label>
          <input
            placeholder="Password"
            type="password"
            {...register("password", {
              required: true,
              validate: {
                checkLength: (value) => value.length >= 6,
                matchPattern: (value) =>
                  /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)(?=.*[!@#$*])/.test(
                    value
                  ),
              },
            })}
          />
        </Form.Field>
        {errors.password?.type === "required" && <p>Password is required.</p>}
        {errors.password?.type === "checkLength" && (
          <p>Password should be at-least 6 characters.</p>
        )}
        {errors.password?.type === "matchPattern" && (
          <p>
            Password should contain at least one uppercase letter, lowercase
            letter, digit, and special symbol.
          </p>
        )}
        <Form.Field>
          <label>* Phone number</label>
          <Controller
            name="phoneNumber"
            control={control}
            rules={{
              required: true,
              validate: (value) => isValidPhoneNumber(value),
            }}
            render={({ field: { onChange, value } }) => (
              <PhoneInput
                value={value}
                onChange={onChange}
                placeholder="Enter phone number"
              />
            )}
          />
        </Form.Field>
        {errors.phoneNumber?.type === "required" && (
          <p>Phone number is required.</p>
        )}
        {errors.phoneNumber && <p>Phone number is invalid.</p>}
        <Button type="submit">Sign Up</Button>
      </Form>
    </div>
  );
}

export default SigupPage;
