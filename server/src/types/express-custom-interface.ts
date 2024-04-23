import { Request as Req, Response as Res, NextFunction as Next } from "express";
import { IUser } from "./";

interface User {
  user?: Omit<Partial<IUser>, "password"> & { Id: string };
}

export type Request = Req & User;
export type Response = Res & User;
export type NextFunction = Next;
