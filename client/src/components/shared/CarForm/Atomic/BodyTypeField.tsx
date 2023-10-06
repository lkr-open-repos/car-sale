import { ICarFormFields } from "@/types/CarFormFieldsInterface";
import BodyTypeOptions from "../../CarFormSelectOptions/BodyTypeOptions";

const BodyTypeField: React.FC<ICarFormFields> = ({ register, isCreate }) => {
  return (
    <select
      {...register("bodyType", {
        validate: {
          require: (value) =>
            // @ts-ignore
            !isCreate || value !== "" || "Body Type Required",
        },
      })}
    >
      <BodyTypeOptions />
    </select>
  );
};

export default BodyTypeField;
