import { Injectable } from '@nestjs/common';
import OpenWeatherAPI, { AirPollution, Coordinates, CurrentWeather, ForecastWeather, Options } from "openweather-api-node";
import { defer, map, Observable } from 'rxjs';
import { CONFIGURATION } from 'src/constants/constants';
import { MyResponse } from 'src/interfaces/response';

@Injectable()
export class WeatherService {
  // Quito Coordinates
  location: Coordinates = {
    lat: -0.22985,
    lon: -78.52495
  };

  weather = new OpenWeatherAPI({
    key: CONFIGURATION.OWAPIKEY,
    coordinates: this.location,
    units: "metric",
  });

  getCurrent(location?: Coordinates): Observable<MyResponse<CurrentWeather>> {
    if (location) {
      this.weather.setLocationByCoordinates(location.lat, location.lon);
    }
    return defer(() => this.weather.getCurrent().then((currentWeather) => { return currentWeather }, (_err) => { return undefined; }))
      .pipe(map(currentWeather => {
        let response: MyResponse<CurrentWeather> = {
          successful: !!currentWeather,
          data: currentWeather,
          errorMessage: !currentWeather ? "Failure in OWAPI Current" : undefined,
        };
        return response;
      }));
  }

  getForecast(location?: Coordinates): Observable<MyResponse<ForecastWeather[]>> {
    if (location) {
      this.weather.setLocationByCoordinates(location.lat, location.lon);
    }
    return defer(() => this.weather.getForecast().then((forecastWeather) => { return forecastWeather }, (_err) => { return undefined; }))
      .pipe(map(forecastWeather => {
        let response: MyResponse<ForecastWeather[]> = {
          successful: !!forecastWeather,
          data: forecastWeather,
          errorMessage: !forecastWeather ? "Failure in OWAPI Forecast" : undefined,
        };
        return response;
      }));
  }

  getAirPollution(location?: Coordinates): Observable<MyResponse<AirPollution>> {
    if (location) {
      this.weather.setLocationByCoordinates(location.lat, location.lon);
    }
    return defer(() => this.weather.getCurrentAirPollution().then((airPollution) => { return airPollution }, (_err) => { return undefined; }))
      .pipe(map(airPollution => {
        let response: MyResponse<AirPollution> = {
          successful: !!airPollution,
          data: airPollution,
          errorMessage: !airPollution ? "Failure in OWAPI Air" : undefined,
        };
        return response;
      }));
  }

  getForecastAir(location?: Coordinates): Observable<MyResponse<AirPollution[]>> {
    if (location) {
      this.weather.setLocationByCoordinates(location.lat, location.lon);
    }
    return defer(() => this.weather.getForecastedAirPollution().then((airPollution) => { return airPollution }, (_err) => { return undefined; }))
      .pipe(map(airPollution => {
        let response: MyResponse<AirPollution[]> = {
          successful: !!airPollution,
          data: airPollution,
          errorMessage: !airPollution ? "Failure in OWAPI Air" : undefined,
        };
        return response;
      }));
  }
}
