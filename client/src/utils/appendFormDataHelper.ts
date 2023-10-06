import { ICarFormInput } from "@/types/CarFormInputInterface";
import { getCurrentDateHelper } from "./getCurrentDateHelper";

export const appendFormDataHelper = (
  data: Partial<ICarFormInput>,
  user: { id: string; email: string } | null,
  imageFile?: File
): FormData => {
  let formData = new FormData();
  for (let key in data) {
    // @ts-ignore
    formData.append(key, data[key]);
  }
  imageFile && formData.append("image", imageFile);
  formData.append("user", user!.id);
  formData.append("adDate", getCurrentDateHelper());

  return formData;
};
