import { ICarFormFields } from "@/types/CarFormFieldsInterface";

const SeriesField: React.FC<ICarFormFields> = ({ isCreate, register }) => {
  return (
    <input
      {...register("series", {
        validate: {
          require: (value) =>
            !isCreate ||
            value !== "" ||
            "Car Series Required (ex. Corolla, Polo)",
        },
      })}
      type="text"
      placeholder="Series (Corolla, Polo etc.)"
    />
  );
};

export default SeriesField;
