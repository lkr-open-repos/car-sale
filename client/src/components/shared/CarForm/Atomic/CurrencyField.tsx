import { ICarFormFields } from "@/types/CarFormFieldsInterface";
import CurrencyOptions from "../../CarFormSelectOptions/CurrencyOptions";

const CurrencyField: React.FC<ICarFormFields> = ({ register, isCreate }) => {
  return (
    <select
      {...register("currency", {
        validate: {
          require: (value) =>
            // @ts-ignore
            !isCreate || value !== "" || "Currency Required",
        },
      })}
    >
      <CurrencyOptions />
    </select>
  );
};

export default CurrencyField;
