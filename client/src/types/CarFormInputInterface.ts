import { ICar } from "./carInterface";

export interface ICarFormInput extends ICar {
  minYear: string;
  maxYear: string;
  minMileage: string;
  maxMileage: string;
  minPrice: string;
  maxPrice: string;
  minEngineDisplacement: string;
  maxEngineDisplacement: string;
  minEnginePower: string;
  maxEnginePower: string;
  imageFile: FileList;
}
