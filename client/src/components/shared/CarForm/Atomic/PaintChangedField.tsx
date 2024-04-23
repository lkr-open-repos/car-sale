import { ICarFormFields } from "@/types/CarFormFieldsInterface";

const PaintChangedField: React.FC<ICarFormFields> = ({ register, classes }) => {
  return (
    <label className={`${classes!["checkbox_label"]} flex`}>
      <input {...register("paintChanged")} type="checkbox" />
      Paint Change
    </label>
  );
};

export default PaintChangedField;
