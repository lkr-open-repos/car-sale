import { ICarFormFields } from "@/types/CarFormFieldsInterface";

const YearField: React.FC<ICarFormFields> = ({
  register,
  classes,
  isCreate,
}) => {
  let yearField;

  if (isCreate) {
    yearField = (
      <input
        type="text"
        placeholder="Year"
        {...register("year", {
          required: "Manufacture year is required",
        })}
      />
    );
  } else {
    yearField = (
      <div className={`${classes!["min-max-wrapper"]} flex`}>
        <input
          type="text"
          placeholder="Minimum Year"
          {...register("minYear")}
        />
        <input
          type="text"
          placeholder="Maximum Year"
          {...register("maxYear")}
        />
      </div>
    );
  }

  return yearField;
};

export default YearField;
