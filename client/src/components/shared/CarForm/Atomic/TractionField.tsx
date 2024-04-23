import { ICarFormFields } from "@/types/CarFormFieldsInterface";

const TractionField: React.FC<ICarFormFields> = ({
  register,
  classes,
  isCreate,
}) => {
  return (
    <div className={`${classes!["radio-wrapper"]} flex`}>
      <label>
        <input
          {...register("traction", {
            validate: {
              require: (value) =>
                !isCreate || value !== null || "Traction Information Needed",
            },
          })}
          type="radio"
          value="2x4"
        />
        2x4
      </label>
      <label>
        <input
          {...register("traction", {
            validate: {
              require: (value) =>
                !isCreate || value !== null || "Traction Information Needed",
            },
          })}
          type="radio"
          value="4x4"
        />
        4x4
      </label>
    </div>
  );
};

export default TractionField;
