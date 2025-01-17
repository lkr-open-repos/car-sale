import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import classes from "./Auth.module.css";

import { IUser } from "@/types/userInterface";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser, setAuth } from "@/app/authSlice";
import { useSignInMutation, useSignUpMutation } from "@/app/api/authApiSlice";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "@/components/shared/Button/Button";
import { sendErrorLog } from "@/utils/sendErrorLog";

interface IFormInput {
  email: string;
  name?: string;
  password: string;
}

// Functional component for authentication (Sign Up / Sign In)
const Auth = () => {
  const [signUp] = useSignUpMutation();
  const [signIn] = useSignInMutation();
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [isSignUpMode, setSignUpMode] = useState(true);
  const [signError, setSignError] = useState(null);

  const user = useSelector(selectCurrentUser);

  // helps refresh redirecting to login page on a auth required page.
  // does not seem like a good practice. needs a more elegant way.
  useEffect(() => {
    user && navigate(from, { replace: true });
  }, [user]);

  // Form management hook react-hook-form config.
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormInput>();

  // Helper function for signing in or signing up a user
  const signHelper = async (formData: IUser) => {
    try {
      let response;
      if (formData.name) {
        response = await signUp(formData).unwrap();
      } else {
        response = await signIn(formData).unwrap();
      }

      // Dispatch Redux action to set authentication
      dispatch(setAuth(response));

      // Set token and user data in local storage
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
    } catch (error: any) {
      sendErrorLog(`${error.message} => Auth Error`);
      throw error.data.message;
    }
  };

  // Click handler function to toggle between Sign Up and Sign In modes
  const switchSignUpMode = () => {
    setSignUpMode((prevMode) => !prevMode);
    reset();
  };

  // Form submission handler
  const onSubmit: SubmitHandler<IFormInput> = async (formData: IUser) => {
    try {
      await signHelper(formData);
      navigate(from, { replace: true });
    } catch (error: any) {
      sendErrorLog(`${error.message} => Auth Error`);
      setSignError(error);
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
      {/* Toggle between Sign Up and Sign In modes */}
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
