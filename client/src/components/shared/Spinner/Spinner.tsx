import classes from "@/components/shared/Spinner/Spinner.module.css";

const Spinner = () => {
  return (
    <div className={`${classes["spinner-wrapper"]}`}>
      <div className={`${classes["lds-default"]}`}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Spinner;
