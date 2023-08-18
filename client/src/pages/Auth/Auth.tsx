import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch } from "react-redux";

import classes from "./Auth.module.css";
import {
  useSignUpMutation,
  useSignInMutation,
} from "../../app/api/authApiSlice";
import { IUser } from "../../types/user-interface";
import { useSelector } from "react-redux";
import { selectCurrentUser, setAuth } from "../../app/authSlice";

interface IFormInput {
  email: string;
  name?: string;
  password: string;
}

const Auth = () => {
  const [signUp] = useSignUpMutation();
  const [signIn] = useSignInMutation();
  const dispatch = useDispatch();

  const user = useSelector(selectCurrentUser);

  const [isSignUpMode, setSignUpMode] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormInput>();

  const switchSignUpMode = () => {
    setSignUpMode((prevMode) => !prevMode);
    reset();
  };

  useEffect(() => {
    console.log(user);
  }, [user]);

  const onSubmit: SubmitHandler<IFormInput> = async (formData: IUser) => {
    const response = isSignUpMode
      ? await signUp(formData)
      : await signIn(formData);
    dispatch(setAuth(response));
    console.log(response);

    reset();
  };

  /*Test User
   * test@test.com
   * testtest
   * test
   */

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
        {/* change to custom component */}
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
