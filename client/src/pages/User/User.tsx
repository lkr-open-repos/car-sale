import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface IFormInput {
  Email: string;
  Password: string;
}

const User = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        placeholder="email"
        {...register("Email", { required: true, pattern: /^\S+@\S+$/i })}
      />
      <input
        type="password"
        placeholder="password"
        {...register("Password", { required: true, minLength: 6 })}
      />
    </form>
  );
};

export default User;
