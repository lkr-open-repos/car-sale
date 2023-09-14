import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import classes from "./Auth.module.css";

import { IUser } from "@/types/user-interface";
import { useDispatch } from "react-redux";
import { setAuth } from "@/app/authSlice";
import { useSignInMutation, useSignUpMutation } from "@/app/api/authApiSlice";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Button from "@/components/shared/Button/Button";

interface IFormInput {
  email: string;
  name?: string;
  password: string;
}

const Auth = () => {
  const [signUp] = useSignUpMutation();
  const [signIn] = useSignInMutation();
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [isSignUpMode, setSignUpMode] = useState(true);
  const [signError, setSignError] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormInput>();

  const signHelper = async (formData: IUser) => {
    try {
      let response;
      if (formData.name) {
        response = await signUp(formData).unwrap();
      } else {
        response = await signIn(formData).unwrap();
      }
      dispatch(setAuth(response));
      const backendTokenExpiresIn = 1000 * 60 * 60 * 24 * 7; //7 days
      const tokenExpiration = new Date(
        new Date().getTime() + backendTokenExpiresIn - 1
      );
      localStorage.setItem(
        "userData",
        JSON.stringify({
          user: response.user,
          token: response.token,
          tokenExpiration: tokenExpiration.toISOString(),
        })
      );
    } catch (err: any) {
      throw err.data.message;
    }
  };

  const switchSignUpMode = () => {
    setSignUpMode((prevMode) => !prevMode);
    reset();
  };

  const onSubmit: SubmitHandler<IFormInput> = async (formData: IUser) => {
    try {
      await signHelper(formData);
      navigate(from, { replace: true });
    } catch (err: any) {
      setSignError(err);
    }
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
        {signError && <p className={`error-text`}>{signError}!</p>}
        <label>E-mail</label>
        <input
          type="text"
          placeholder="email"
          {...register("email", {
            required: "Email is required",
            onChange: () => setSignError(null),
            pattern: {
              value:
                /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: "Invalid mail address",
            },
          })}
        />
        {errors.email && <p className={`error-text`}>{errors.email.message}</p>}
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
            {errors.name && (
              <p className={`error-text`}>{errors.name.message}</p>
            )}
          </>
        ) : null}
        <label>Password</label>
        <input
          type="password"
          placeholder="password"
          {...register("password", {
            required: "Password is required",
            onChange: () => setSignError(null),
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters long",
            },
          })}
        />
        {errors.password && (
          <p className={`error-text`}>{errors.password.message}</p>
        )}
        <Button isSubmit={true}>{isSignUpMode ? "Sign Up" : "Sign In"}</Button>
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
