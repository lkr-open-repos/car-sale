import { ICarFormFields } from "@/types/CarFormFieldsInterface";
import BrandSelectOptions from "../../CarFormSelectOptions/BrandSelectOptions";

const BrandField: React.FC<ICarFormFields> = ({ isCreate, register }) => {
  return (
    <select
      {...register("brand", {
        validate: {
          require: (value) =>
            !isCreate || value !== "" || "Brand Name Required",
        },
      })}
    >
      <BrandSelectOptions />
    </select>
  );
};

export default BrandField;
