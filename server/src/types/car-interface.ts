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

enum Type {
  NEW = "NEW",
  USED = "USED",
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

export interface ICar {
  user: Schema.Types.ObjectId;
  used: boolean;
  brand: string;
  type: Type;
  series: string;
  model: string;
  year: number;
  color: Colors;
  metallicColor: boolean;
  mileage: string;
  transmissionType: TransmissionType;
  fuelType: FuelType;
  bodyType: string;
  engineDisplacement: number;
  enginePower: number;
  traction: string;
  fuelTankCapacity: number;
  paintChanged: boolean;
  eligibleForTrade: boolean;
  adDate: string;
  seller: Seller;
  price: string;
  currency: Currency;
  image?: string;
}

export interface CarDocument extends ICar, Document {}

export interface CarModel extends Model<CarDocument> {}
