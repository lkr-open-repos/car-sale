import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import classes from "./Auth.module.css";

interface IFormInput {
  Email: string;
  Name?: string;
  Password: string;
}

const Auth = () => {
  const [isSignUpMode, setSignUpMode] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const switchSignUpMode = () => {
    setSignUpMode((prevMode) => !prevMode);
  };

  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);

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
          {...register("Email", {
            required: "Email is required",
            pattern: /^\S+@\S+$/i,
          })}
        />
        {errors.Email && (
          <p className={classes["error-text"]}>{errors.Email.message}</p>
        )}
        {isSignUpMode ? (
          <>
            <label>Name</label>
            <input
              type="text"
              placeholder="Name"
              {...register("Name", {
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
          {...register("Password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters long",
            },
          })}
        />
        {errors.Password && (
          <p className={classes["error-text"]}>{errors.Password.message}</p>
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
