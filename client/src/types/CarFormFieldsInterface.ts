import { UseFormRegister } from "react-hook-form";
import { ICarFormInput } from "./CarFormInputInterface";

export interface ICarFormFields {
  register: UseFormRegister<ICarFormInput>;
  isCreate?: boolean;
  classes?: CSSModuleClasses;
}
