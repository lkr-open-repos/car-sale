import { ICarFormFields } from "@/types/CarFormFieldsInterface";

const PriceField: React.FC<ICarFormFields> = ({ isCreate, register }) => {
  let priceField;

  if (isCreate) {
    priceField = (
      <input
        type="text"
        placeholder="Price"
        {...register("price", {
          required: "price is required",
        })}
      />
    );
  } else {
    priceField = (
      <>
        <input
          type="text"
          placeholder="Minimum Price"
          {...register("minPrice")}
        />
        <input
          type="text"
          placeholder="Maximum Price"
          {...register("maxPrice")}
        />
      </>
    );
  }

  return priceField;
};

export default PriceField;
