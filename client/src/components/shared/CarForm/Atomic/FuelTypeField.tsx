import { ICarFormFields } from "@/types/CarFormFieldsInterface";
import FuelTypeOptions from "../../CarFormSelectOptions/FuelTypeOptions";

const FuelTypeField: React.FC<ICarFormFields> = ({ register, isCreate }) => {
  return (
    <select
      {...register("fuelType", {
        validate: {
          require: (value) =>
            // @ts-ignore
            !isCreate || value !== "" || "Fuel Type Required",
        },
      })}
    >
      <FuelTypeOptions />
    </select>
  );
};

export default FuelTypeField;
