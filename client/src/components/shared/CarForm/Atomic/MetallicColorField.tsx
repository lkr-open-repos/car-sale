import { ICarFormFields } from "@/types/CarFormFieldsInterface";

const MetallicColorField: React.FC<ICarFormFields> = ({
  register,
  classes,
  isCreate,
}) => {
  return (
    <div className={`${classes!["radio-wrapper"]} flex`}>
      <label>
        <input
          {...register("metallicColor", {
            validate: {
              require: (value) =>
                !isCreate ||
                value !== null ||
                "Metallic / Matte color Information Needed",
            },
          })}
          type="radio"
          value="true"
        />
        Metallic
      </label>
      <label>
        <input
          {...register("metallicColor", {
            validate: {
              require: (value) =>
                !isCreate ||
                value !== null ||
                "Metallic / Matte color Information Needed",
            },
          })}
          type="radio"
          value="false"
        />
        Matte
      </label>
    </div>
  );
};

export default MetallicColorField;