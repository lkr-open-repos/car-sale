export enum TransmissionType {
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

export interface ICar {
  user: string;
  used: boolean;
  brand: string;
  type: Type;
  series: string;
  model: string;
  year: number;
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
  id: string;
}
