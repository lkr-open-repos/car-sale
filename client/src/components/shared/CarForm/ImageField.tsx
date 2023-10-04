import { ICarFormInput } from "@/types/car-form-input-interface";
import { useForm } from "react-hook-form";

const { register } = useForm<Partial<ICarFormInput>>();

interface IProps {
  isCreate?: boolean;
  imageThumbnail: string;
  classes: any;
  uploadIcon: string;
  setImageThumbnail: (value: any) => void;
}

export const imageField: React.FC<IProps> = ({
  isCreate,
  imageThumbnail,
  classes,
  uploadIcon,
  setImageThumbnail,
}) => {
  let imageFieldValue;
  if (isCreate) {
    imageFieldValue = (
      <div className={`${classes["image-wrapper"]}`}>
        {imageThumbnail && (
          <img
            className={`${classes["image-thumbnail"]}`}
            src={imageThumbnail}
            alt="car image thumbnail"
          />
        )}
        <label
          className={`${classes["upload-image-label"]} flex`}
          htmlFor="upload"
        >
          <img src={uploadIcon} alt="" />
          Upload Car Image
          <input
            type="file"
            id="upload"
            className={classes["upload-image"]}
            accept="image/*"
            {...register("imageFile", {
              required: "Car image is required",
              onChange: (e) => {
                setImageThumbnail(URL.createObjectURL(e.target.files[0]));
              },
            })}
          />
        </label>
      </div>
    );
  } else {
    imageFieldValue = "";
  }

  return imageFieldValue;
};
