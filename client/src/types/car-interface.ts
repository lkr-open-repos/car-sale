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

enum BodyType {
  Hatchback = "Hatchback",
  Sedan = "Sedan",
  SUV = "SUV",
  Coupe = "Coupe",
  Convertible = "Convertible",
  Pickup = "Pickup",
}

enum Used {
  New = "New",
  Used = "Used",
}

export interface ICar {
  user: string;
  used: Used; //
  brand: string; //
  series: string; //
  year: number; //
  color: Colors; //
  metallicColor: MetallicColor; //
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
  image?: File | string; //
  details?: string;
  id: string;
}
