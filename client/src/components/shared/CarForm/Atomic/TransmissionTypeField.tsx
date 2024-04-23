import { ICarFormFields } from "@/types/CarFormFieldsInterface";

const TransmissionTypeField: React.FC<ICarFormFields> = ({
  register,
  isCreate,
  classes,
}) => {
  return (
    <div className={`${classes!["radio-wrapper"]} flex`}>
      <label>
        <input
          {...register("transmissionType", {
            validate: {
              require: (value) =>
                !isCreate || value !== null || "Transmission Type Needed",
            },
          })}
          type="radio"
          value="Automatic"
        />
        Automatic
      </label>
      <label>
        <input
          {...register("transmissionType", {
            validate: {
              require: (value) =>
                !isCreate || value !== null || "Transmission Type Needed",
            },
          })}
          type="radio"
          value="Manual"
        />
        Manuel
      </label>
    </div>
  );
};

export default TransmissionTypeField;
