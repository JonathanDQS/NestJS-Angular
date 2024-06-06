import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CurrentWeather, ForecastWeather } from 'openweather-api-node';
import { Observable } from 'rxjs';
import { CONFIGURATION } from '../constants/constants';
import { ChosenLocation, MyResponse } from '../interfaces/support';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }

  getCityList(): Observable<MyResponse<ChosenLocation[]>> {
    return this.http.get<MyResponse<ChosenLocation[]>>(`${CONFIGURATION.SERVER}cities`);
  }

  getCurrentWeather(location?: ChosenLocation): Observable<MyResponse<CurrentWeather>> {
    return this.http.get<MyResponse<CurrentWeather>>(`${CONFIGURATION.SERVER}weather` + (!!location ? `?lat=${location.lat}&lon=${location.lon}` : ''));
  }

  getForecast(location?: ChosenLocation): Observable<MyResponse<ForecastWeather[]>> {
    return this.http.get<MyResponse<ForecastWeather[]>>(`${CONFIGURATION.SERVER}forecast` + (!!location ? `?lat=${location.lat}&lon=${location.lon}` : ''));
  }
}
