import { ICarFormFields } from "@/types/CarFormFieldsInterface";

const DetailsField: React.FC<ICarFormFields> = ({ register, isCreate }) => {
  return (
    isCreate && (
      <textarea
        cols={30}
        rows={8}
        placeholder="More Details"
        {...register("details")}
      ></textarea>
    )
  );
};

export default DetailsField;
