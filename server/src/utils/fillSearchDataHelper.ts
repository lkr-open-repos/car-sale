import { ICar, ICarFormInput } from "../types";

interface ICarSearchFields
  extends Omit<
    ICar,
    | "year"
    | "mileage"
    | "engineDisplacement"
    | "enginePower"
    | "price"
    | "details"
    | "user"
  > {
  year: {};
  mileage: {};
  engineDisplacement: {};
  enginePower: {};
  price: {};
  details: {};
  user: string;
}

export const fillSearchDataHelper = (rawSearchData: Partial<ICarFormInput>) => {
  let searchData: Partial<ICarSearchFields> = {};

  rawSearchData.minYear &&
    (searchData.year = {
      ...searchData.year,
      $gte: rawSearchData.minYear,
    });

  rawSearchData.maxYear &&
    (searchData.year = {
      ...searchData.year,
      $lte: rawSearchData.maxYear,
    });

  rawSearchData.minMileage &&
    (searchData.mileage = {
      ...searchData.mileage,
      $gte: rawSearchData.minMileage,
    });

  rawSearchData.maxMileage &&
    (searchData.mileage = {
      ...searchData.mileage,
      $lte: rawSearchData.maxMileage,
    });

  rawSearchData.minEngineDisplacement &&
    (searchData.engineDisplacement = {
      ...searchData.engineDisplacement,
      $gte: rawSearchData.minEngineDisplacement,
    });

  rawSearchData.maxEngineDisplacement &&
    (searchData.engineDisplacement = {
      ...searchData.engineDisplacement,
      $lte: rawSearchData.maxEngineDisplacement,
    });

  rawSearchData.minEnginePower &&
    (searchData.year = {
      ...searchData.enginePower,
      $gte: rawSearchData.minEnginePower,
    });

  rawSearchData.maxEnginePower &&
    (searchData.price = {
      ...searchData.enginePower,
      $lte: rawSearchData.maxEnginePower,
    });

  rawSearchData.minPrice &&
    (searchData.price = { ...searchData.price, $gte: rawSearchData.minPrice });

  rawSearchData.maxPrice &&
    (searchData.price = { ...searchData.price, $lte: rawSearchData.maxPrice });

  rawSearchData.used &&
    (searchData = { ...searchData, used: rawSearchData.used });

  rawSearchData.brand &&
    (searchData = { ...searchData, brand: rawSearchData.brand });

  rawSearchData.series &&
    (searchData = { ...searchData, series: rawSearchData.series });

  rawSearchData.color &&
    (searchData = { ...searchData, color: rawSearchData.color });

  rawSearchData.metallicColor &&
    (searchData = {
      ...searchData,
      metallicColor: rawSearchData.metallicColor,
    });

  rawSearchData.transmissionType &&
    (searchData = {
      ...searchData,
      transmissionType: rawSearchData.transmissionType,
    });

  rawSearchData.fuelType &&
    (searchData = { ...searchData, fuelType: rawSearchData.fuelType });

  rawSearchData.bodyType &&
    (searchData = { ...searchData, bodyType: rawSearchData.bodyType });

  rawSearchData.traction &&
    (searchData = { ...searchData, traction: rawSearchData.traction });

  rawSearchData.paintChanged &&
    (searchData = { ...searchData, paintChanged: rawSearchData.paintChanged });

  rawSearchData.eligibleForTrade &&
    (searchData = {
      ...searchData,
      eligibleForTrade: rawSearchData.eligibleForTrade,
    });

  rawSearchData.seller &&
    (searchData = { ...searchData, seller: rawSearchData.seller });

  rawSearchData.currency &&
    (searchData = { ...searchData, currency: rawSearchData.currency });

  rawSearchData.details &&
    (searchData.details = {
      ...searchData,
      details: { $regex: rawSearchData.details, $options: "i" },
    });

  rawSearchData.user &&
    (searchData = {
      ...searchData,
      user: searchData.user,
    });
  return searchData;
};
