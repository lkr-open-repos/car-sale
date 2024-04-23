import { ICarFormFields } from "@/types/CarFormFieldsInterface";

const EligibleForTradeField: React.FC<ICarFormFields> = ({
  register,
  classes,
}) => {
  return (
    <label className={`${classes!["checkbox_label"]} flex`}>
      <input {...register("eligibleForTrade")} type="checkbox" />
      Eligible For Trade{" "}
    </label>
  );
};

export default EligibleForTradeField;
