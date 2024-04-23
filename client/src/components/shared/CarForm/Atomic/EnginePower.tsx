import { ICarFormFields } from "@/types/CarFormFieldsInterface";

const EnginePowerField: React.FC<ICarFormFields> = ({
  classes,
  register,
  isCreate,
}) => {
  let enginePowerField;

  if (isCreate) {
    enginePowerField = (
      <input
        {...register("enginePower", {
          required: "Engine power is required",
        })}
        type="text"
        placeholder="Engine Power"
      />
    );
  } else {
    enginePowerField = (
      <div className={`${classes!["min-max-wrapper"]} flex`}>
        <input
          {...register("minEnginePower")}
          type="text"
          placeholder="Minimum Engine Power"
        />
        <input
          {...register("maxEnginePower")}
          type="text"
          placeholder="Maximum Engine Power"
        />
      </div>
    );
  }

  return enginePowerField;
};

export default EnginePowerField;
