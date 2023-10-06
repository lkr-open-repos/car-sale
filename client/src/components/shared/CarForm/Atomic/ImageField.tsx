import { ICarFormFields } from "@/types/CarFormFieldsInterface";

interface IImageFieldProps extends ICarFormFields {
  imageThumbnail: string;
  uploadIcon: string;
  setImageThumbnailHandler: (value: any) => void;
}
const ImageField: React.FC<IImageFieldProps> = ({
  register,
  isCreate,
  imageThumbnail,
  classes,
  uploadIcon,
  setImageThumbnailHandler,
}) => {
  let imageFieldValue;
  if (isCreate) {
    imageFieldValue = (
      <div className={`${classes!["image-wrapper"]}`}>
        {imageThumbnail && (
          <img
            className={`${classes!["image-thumbnail"]}`}
            src={imageThumbnail}
            alt="car image thumbnail"
          />
        )}
        <label
          className={`${classes!["upload-image-label"]} flex`}
          htmlFor="upload"
        >
          <img src={uploadIcon} alt="" />
          Upload Car Image
          <input
            type="file"
            id="upload"
            className={classes!["upload-image"]}
            accept="image/*"
            {...register("imageFile", {
              required: "Car image is required",
              onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                e.target.files &&
                  setImageThumbnailHandler(
                    URL.createObjectURL(e.target.files[0])
                  );
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

export default ImageField;
