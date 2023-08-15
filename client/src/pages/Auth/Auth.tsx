import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import classes from "./Auth.module.css";
import { useGetAllUsersQuery, useSignUpMutation } from "../../api/userApiSlice";
import { IUser } from "../../types/user-interface";

interface IFormInput {
  email: string;
  name?: string;
  password: string;
}

const Auth = () => {
  const [signUp] = useSignUpMutation();
  const { data } = useGetAllUsersQuery();

  const [isSignUpMode, setSignUpMode] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const switchSignUpMode = () => {
    setSignUpMode((prevMode) => !prevMode);
  };

  const onSubmit: SubmitHandler<IFormInput> = async (formData: IUser) => {
    console.log(formData);
    const signUpResponse = await signUp(formData);
    console.log(signUpResponse);
  };

  return (
    <div className={`${classes["auth-wrapper"]} flex`}>
      <h1>{isSignUpMode ? "Sign Up" : "Sign In"}</h1>
      <form
        className={`${classes["auth-form"]} flex`}
        onSubmit={handleSubmit(onSubmit)}
      >
        <label>E-mail</label>
        <input
          type="text"
          placeholder="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value:
                /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: "Invalid mail address",
            },
          })}
        />
        {errors.email && (
          <p className={classes["error-text"]}>{errors.email.message}</p>
        )}
        {isSignUpMode ? (
          <>
            <label>Name</label>
            <input
              type="text"
              placeholder="Name"
              {...register("name", {
                required: "Name is required",
                minLength: {
                  value: 2,
                  message: "Name must be at least 2 characters long",
                },
              })}
            />
          </>
        ) : null}
        <label>Password</label>
        <input
          type="password"
          placeholder="password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters long",
            },
          })}
        />
        {errors.password && (
          <p className={classes["error-text"]}>{errors.password.message}</p>
        )}
        <input type="submit" value={isSignUpMode ? "Sign Up" : "Sign In"} />
      </form>
      {isSignUpMode ? (
        <p>
          Already member yet? <span onClick={switchSignUpMode}>Sign In</span>
        </p>
      ) : (
        <p>
          Not a member? <span onClick={switchSignUpMode}>Sign Up</span>
        </p>
      )}
    </div>
  );
};

export default Auth;
