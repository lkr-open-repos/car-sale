import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import classes from "./Auth.module.css";

import { IUser } from "@/types/user-interface";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCurrentToken,
  selectCurrentUser,
  setAuth,
} from "@/app/authSlice";
import { useSignInMutation, useSignUpMutation } from "@/app/api/authApiSlice";

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
  const token = useSelector(selectCurrentToken);

  const [isSignUpMode, setSignUpMode] = useState(true);
  const [signError, setSignError] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormInput>();

  const signHelper = async (formData: IUser) => {
    if (formData.name) {
      let response;
      try {
        response = await signUp(formData).unwrap();
        dispatch(setAuth(response));
        localStorage.setItem("userData", JSON.stringify({ user, token }));
      } catch (err: any) {
        throw err.data.message;
      }
    }
    let response;
    try {
      response = await signIn(formData).unwrap();
      dispatch(setAuth(response));
      localStorage.setItem("userData", JSON.stringify({ user, token }));
    } catch (err: any) {
      throw err.data.message;
    }
  };

  const switchSignUpMode = () => {
    setSignUpMode((prevMode) => !prevMode);
    reset();
  };

  // useEffect(() => {
  //   console.log(user);
  // }, [user]);

  const onSubmit: SubmitHandler<IFormInput> = async (formData: IUser) => {
    try {
      await signHelper(formData);
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
        {signError ? (
          <p className={classes["error-text"]}>{signError}!</p>
        ) : null}
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
            {errors.name && (
              <p className={classes["error-text"]}>{errors.name.message}</p>
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
          <p className={classes["error-text"]}>{errors.password.message}</p>
        )}

        {/* change input to custom button component */}
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
