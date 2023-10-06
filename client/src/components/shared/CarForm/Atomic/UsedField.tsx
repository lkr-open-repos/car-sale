import { ICarFormFields } from "@/types/CarFormFieldsInterface";

const UsedField: React.FC<ICarFormFields> = ({
  isCreate,
  register,
  classes,
}) => {
  return (
    <div className={`${classes!["radio-wrapper"]} flex`}>
      <label>
        <input
          {...register("used", {
            validate: {
              require: (value) =>
                !isCreate ||
                value !== null ||
                "Used / New Car Information Needed",
            },
          })}
          type="radio"
          value="New"
        />
        New
      </label>
      <label>
        <input
          {...register("used", {
            validate: {
              require: (value) =>
                !isCreate ||
                value !== null ||
                "Used / New Car Information Needed",
            },
          })}
          type="radio"
          value="Used"
        />
        Used
      </label>
    </div>
  );
};

export default UsedField;
