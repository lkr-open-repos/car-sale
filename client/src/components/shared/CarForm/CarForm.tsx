import { useForm, SubmitHandler } from "react-hook-form";
import { ReactNode, useEffect, useState } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { selectCurrentUser } from "@/app/authSlice";
import { useCreateCarMutation } from "@/app/api/carsApiSlice";
import { appendFormDataHelper } from "@/utils/appendFormDataHelper";
import { ICarFormInput } from "@/types/CarFormInputInterface";
import { useNavigate } from "react-router-dom";

import classes from "./CarForm.module.css";
import Button from "@/components/shared/Button/Button";
import uploadIcon from "@/assets/icons/uploadIcon.svg";
import ImageField from "./Atomic/ImageField";
import YearField from "./Atomic/YearField";
import MileageField from "./Atomic/MileageFiled";
import EngineDispleacementField from "./Atomic/EngineDispleacementField";
import EnginePowerField from "./Atomic/EnginePower";
import PriceField from "./Atomic/PriceField";
import BrandField from "./Atomic/BrandField";
import SeriesField from "./Atomic/SeriesField";
import UsedField from "./Atomic/UsedField";
import ColorField from "./Atomic/ColorField";
import MetallicColorField from "./Atomic/MetallicColorField";
import TransmissionTypeField from "./Atomic/TransmissionTypeField";
import FuelTypeField from "./Atomic/FuelTypeField";
import BodyTypeField from "./Atomic/BodyTypeField";
import TractionField from "./Atomic/TractionField";
import PaintChangedField from "./Atomic/PaintChangedField";
import EligibleForTradeField from "./Atomic/EligibleForTradeField";
import SellerField from "./Atomic/SellerField";
import CurrencyField from "./Atomic/CurrencyField";
import DetailsField from "./Atomic/DetailsField";
import { getCurrentDateHelper } from "@/utils/getCurrentDateHelper";

interface IProps {
  children?: ReactNode;
  isCreate?: boolean;
}

const CarForm: React.FC<IProps> = ({ isCreate = false, children }) => {
  const [createCar] = useCreateCarMutation();
  const user = useSelector(selectCurrentUser);
  const navigate = useNavigate();

  const [imageThumbnail, setImageThumbnail] = useState("");
  const [queryError, setQueryError] = useState<string>("");
  const [createdCar, setCreatedCar] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ICarFormInput>();

  const onSubmit: SubmitHandler<ICarFormInput> = async (
    data: Partial<ICarFormInput>
  ) => {
    if (isCreate) {
      let imageFile: File | undefined = undefined;
      if (data.imageFile) {
        imageFile = data.imageFile[0];
      }

      const formData = appendFormDataHelper(data, user, imageFile);
      formData.append("adDate", getCurrentDateHelper());

      await createCar(formData)
        .unwrap()
        .then((res) => {
          setCreatedCar(res.car.id);
        })
        .catch((error) => {
          setQueryError(error);
        });
    } else {
      navigate("/searchresults", {
        replace: true,
        state: { ...data },
      });
    }
  };

  useEffect(() => {
    createdCar && reset();
    createdCar && navigate(`/cars/${createdCar}`);
  }, [createdCar]);

  const setImageThumbnailHandler = (value: string) => {
    setImageThumbnail(value);
  };

  return (
    <div className={`${classes["car-form-wrapper"]} flex`}>
      {children || ""}
      <form
        className={`${classes["car-form_form"]} grid`}
        onSubmit={handleSubmit(onSubmit)}
      >
        {errors.imageFile && (
          <p className={`error-text`}>{errors.imageFile.message}</p>
        )}
        <ImageField
          register={register}
          isCreate={isCreate}
          imageThumbnail={imageThumbnail}
          classes={classes}
          uploadIcon={uploadIcon}
          setImageThumbnailHandler={setImageThumbnailHandler}
        />
        {errors.brand && <p className={`error-text`}>{errors.brand.message}</p>}
        <BrandField isCreate={isCreate} register={register} />
        {errors.series && (
          <p className={`error-text`}>{errors.series.message}</p>
        )}
        <SeriesField register={register} isCreate={isCreate} />
        {errors.used && <p className={`error-text`}>{errors.used.message}</p>}
        <UsedField register={register} classes={classes} isCreate={isCreate} />
        {errors.year && <p className={`error-text`}>{errors.year.message}</p>}
        <YearField classes={classes} register={register} isCreate={isCreate} />
        {errors.color && <p className={`error-text`}>{errors.color.message}</p>}
        <ColorField register={register} />

        {errors.metallicColor && (
          <p className={`error-text`}>{errors.metallicColor.message}</p>
        )}
        <MetallicColorField
          register={register}
          classes={classes}
          isCreate={isCreate}
        />
        {errors.mileage && (
          <p className={`error-text`}>{errors.mileage.message}</p>
        )}
        <MileageField
          classes={classes}
          register={register}
          isCreate={isCreate}
        />
        {errors.transmissionType && (
          <p className={`error-text`}>{errors.transmissionType.message}</p>
        )}
        <TransmissionTypeField
          register={register}
          classes={classes}
          isCreate={isCreate}
        />
        {errors.fuelType && (
          <p className={`error-text`}>{errors.fuelType.message}</p>
        )}
        <FuelTypeField register={register} isCreate={isCreate} />
        {errors.bodyType && (
          <p className={`error-text`}>{errors.bodyType.message}</p>
        )}
        <BodyTypeField register={register} isCreate={isCreate} />
        {errors.engineDisplacement && (
          <p className={`error-text`}>{errors.engineDisplacement.message}</p>
        )}
        <EngineDispleacementField
          classes={classes}
          isCreate={isCreate}
          register={register}
        />
        {errors.enginePower && (
          <p className={`error-text`}>{errors.enginePower.message}</p>
        )}
        <EnginePowerField
          classes={classes}
          register={register}
          isCreate={isCreate}
        />
        {errors.traction && (
          <p className={`error-text`}>{errors.traction.message}</p>
        )}
        <TractionField
          register={register}
          classes={classes}
          isCreate={isCreate}
        />
        <PaintChangedField register={register} classes={classes} />
        <EligibleForTradeField register={register} classes={classes} />
        {errors.seller && (
          <p className={`error-text`}>{errors.seller.message}</p>
        )}
        <SellerField
          register={register}
          classes={classes}
          isCreate={isCreate}
        />
        {errors.price && <p className={`error-text`}>{errors.price.message}</p>}
        {errors.currency && (
          <p className={`error-text`}>{errors.currency.message}</p>
        )}
        <div className={`${classes["min-max-wrapper"]} flex`}>
          <PriceField
            classes={classes}
            register={register}
            isCreate={isCreate}
          />
          <CurrencyField register={register} isCreate={isCreate} />
        </div>
        <DetailsField register={register} isCreate={isCreate} />
        {queryError && <p className={`error-text`}>{queryError}</p>}
        <Button isSubmit={true}>{isCreate ? "SELL" : "SEARCH"}</Button>
      </form>
    </div>
  );
};

export default CarForm;
