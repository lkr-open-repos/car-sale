import { ICarFormFields } from "@/types/CarFormFieldsInterface";
import ColorSelectOptions from "../../CarFormSelectOptions/ColorSelectOptions";

const ColorField: React.FC<ICarFormFields> = ({ register, isCreate }) => {
  return (
    <select
      {...register("color", {
        validate: {
          require: (value) =>
            // @ts-ignore
            !isCreate || value !== "" || "Color Required",
        },
      })}
    >
      <ColorSelectOptions />
    </select>
  );
};

export default ColorField;
