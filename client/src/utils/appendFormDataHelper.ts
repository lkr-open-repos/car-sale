import { IFormInput } from "@/components/shared/CarForm/CarForm";
import { getCurrentDateHelper } from "./getCurrentDateHelper";

export const appendFormDataHelper = (
  data: Partial<IFormInput>,
  user: { id: string; email: string } | null,
  imageFile?: File
): FormData => {
  let formData = new FormData();
  for (let key in data) {
    // @ts-ignore
    formData.append(key, data[key]);
  }
  imageFile ? formData.append("image", imageFile) : null;
  formData.append("user", user!.id);
  formData.append("adDate", getCurrentDateHelper());
  return formData;
};
