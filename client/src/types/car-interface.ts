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

enum BodyType {
  HATCHBACK = "HATCHBACK",
  SEDAN = "SEDAN",
  SUV = "SUV",
  COUPE = "COUPE",
  CONVERTIBLE = "CONVERTIBLE",
  PICKUP = "PICKUP",
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
  user: string;
  used: boolean; //
  brand: string; //
  series: string; //
  year: number; //
  color: Colors; //
  metallicColor: boolean; //
  mileage: string; //
  transmissionType: TransmissionType; //
  fuelType: FuelType; //
  bodyType: BodyType; //
  engineDisplacement: number; //
  enginePower: number; //
  traction: string; //
  paintChanged: boolean; //
  eligibleForTrade: boolean; //
  adDate: string;
  seller: Seller; //
  price: string; //
  currency: Currency; //
  image?: File; //
  details?: string;
  id: string;
}
