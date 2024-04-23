import { ICarFormFields } from "@/types/CarFormFieldsInterface";

const SellerField: React.FC<ICarFormFields> = ({
  register,
  classes,
  isCreate,
}) => {
  return (
    <div className={`${classes!["radio-wrapper"]} flex`}>
      <label>
        <input
          {...register("seller", {
            validate: {
              require: (value) =>
                !isCreate || value !== null || "Seller Information Needed",
            },
          })}
          type="radio"
          value="Owner"
        />
        Owner
      </label>
      <label>
        <input
          {...register("seller", {
            validate: {
              require: (value) =>
                !isCreate || value !== null || "Seller Information Needed",
            },
          })}
          type="radio"
          value="Gallery"
        />
        Gallery
      </label>
    </div>
  );
};

export default SellerField;
