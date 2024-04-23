import { ICarFormFields } from "@/types/CarFormFieldsInterface";

const EngineDispleacementField: React.FC<ICarFormFields> = ({
  isCreate,
  classes,
  register,
}) => {
  let engineDispleacementField;

  if (isCreate) {
    engineDispleacementField = (
      <input
        {...register("engineDisplacement", {
          required: "Engine displacement is required",
        })}
        type="text"
        placeholder="Engine Displacement"
      />
    );
  } else {
    engineDispleacementField = (
      <div className={`${classes!["min-max-wrapper"]} flex`}>
        <input
          {...register("minEngineDisplacement")}
          type="text"
          placeholder="Minimum Engine Displacement"
        />
        <input
          {...register("maxEngineDisplacement")}
          type="text"
          placeholder="Maximum Engine Displacement"
        />
      </div>
    );
  }

  return engineDispleacementField;
};

export default EngineDispleacementField;
