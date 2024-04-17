import { ICarFormFields } from "@/types/CarFormFieldsInterface";

const MileageField: React.FC<ICarFormFields> = ({
  register,
  classes,
  isCreate,
}) => {
  let mileageField;
  if (isCreate) {
    mileageField = (
      <input
        type="text"
        placeholder="Mileage"
        {...register("mileage", {
          required: "Car milage is required",
        })}
      />
    );
  } else {
    mileageField = (
      <div className={`${classes!["min-max-wrapper"]} flex`}>
        <input
          type="text"
          placeholder="Minimum mileage"
          {...register("minMileage")}
        />
        <input
          type="text"
          placeholder="Maximum mileage"
          {...register("maxMileage")}
        />
      </div>
    );
  }

  return mileageField;
};

export default MileageField;
