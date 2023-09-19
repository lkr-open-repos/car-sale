import { Model, Document, Schema } from "mongoose";

enum TransmissionType {
  MANUAL = "MANUAL",
  AUTOMATIC = "AUTOMATIC",
}

enum FuelType {
  PETROL = "PETROL",
  DIESEL = "DIESEL",
  ELECTRIC = "ELECTRIC",
  HYBRID = "HYBRID",
}

enum Seller {
  OWNER = "OWNER",
  GALLERY = "GALLERY",
}

enum Currency {
  USD = "USD",
  EUR = "EUR",
  TRY = "TRY",
}

enum Colors {
  BLACK = "BLACK",
  WHITE = "WHITE",
  SILVER = "SILVER",
  RED = "RED",
  BLUE = "BLUE",
  GREEN = "GREEN",
  YELLOW = "YELLOW",
  BROWN = "BROWN",
  PURPLE = "PURPLE",
}

//fix "any"s with search data helper

export interface ICar {
  user: Schema.Types.ObjectId;
  used: boolean;
  brand: string;
  series: string;
  year: any;
  color: Colors;
  metallicColor: boolean;
  mileage: any;
  transmissionType: TransmissionType;
  fuelType: FuelType;
  bodyType: string;
  engineDisplacement: any;
  enginePower: any;
  traction: string;
  paintChanged: boolean;
  eligibleForTrade: boolean;
  adDate: string;
  seller: Seller;
  price: any;
  currency: Currency;
  image?: string;
  details?: any;
}

export interface CarDocument extends ICar, Document {}

export interface CarModel extends Model<CarDocument> {}
