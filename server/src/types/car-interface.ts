import { Model, Document, Schema } from "mongoose";

enum TransmissionType {
  Manual = "Manual",
  Automatic = "Automatic",
}

enum FuelType {
  Petrol = "Petrol",
  Diesel = "Diesel",
  Electric = "Electric",
  Hybrid = "Hybrid",
}

enum Seller {
  Owner = "Owner",
  Gallery = "Gallery",
}

enum Currency {
  USD = "USD",
  EUR = "EUR",
  TRY = "TRY",
}

enum Colors {
  Black = "Black",
  White = "White",
  Silver = "Silver",
  Red = "Red",
  Blue = "Blue",
  Green = "Green",
  Yellow = "Yellow",
  Brown = "Brown",
  Purple = "Purple",
}

enum MetallicColor {
  Metallic = "Metallic",
  Matte = "Matte",
}

enum Used {
  New = "New",
  Used = "Used",
}

export interface ICar {
  user: Schema.Types.ObjectId;
  used: Used;
  brand: string;
  series: string;
  year: number;
  color: Colors;
  metallicColor: MetallicColor;
  mileage: number;
  transmissionType: TransmissionType;
  fuelType: FuelType;
  bodyType: string;
  engineDisplacement: number;
  enginePower: number;
  traction: string;
  paintChanged: boolean;
  eligibleForTrade: boolean;
  adDate: string;
  seller: Seller;
  price: number;
  currency: Currency;
  image?: string;
  details?: string;
}

export interface CarDocument extends ICar, Document {}

export interface CarModel extends Model<CarDocument> {}
