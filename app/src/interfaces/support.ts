export interface ChosenLocation {
  city: string;
  lon: number;
  lat: number;
  country: string;
}

export interface MyResponse<T = undefined> {
    successful: boolean;
    data?: T;
    errorMessage?: string;
}