import { Controller, Get, Query } from '@nestjs/common';
import { WeatherService } from '../services/weather.service';
import { AirPollution, Coordinates, CurrentWeather, ForecastWeather } from 'openweather-api-node';
import { Observable } from 'rxjs';
import { MyResponse } from 'src/interfaces/response';
import { SupportService } from 'src/services/support.service';
import { ChosenLocation } from 'src/schemas/support.schema';

@Controller()
export class AppController {
  constructor(private readonly appService: WeatherService, private readonly supService: SupportService) { }

  @Get("/weather")
  getCurrent(@Query('lon') long?: number, @Query('lat') lati?: number): Observable<MyResponse<CurrentWeather>> {
    let location: Coordinates | undefined;
    if (long && lati)
      location = {lon: +long, lat: +lati};
    return this.appService.getCurrent(location);
  }

  @Get("/forecast")
  getForecast(@Query('lon') long?: number, @Query('lat') lati?: number): Observable<MyResponse<ForecastWeather[]>> {
    let location: Coordinates | undefined;
    if (long && lati)
      location = {lon: +long, lat: +lati};
    return this.appService.getForecast(location);
  }

  @Get("/air")
  getAirPollution(@Query('lon') long?: number, @Query('lat') lati?: number): Observable<MyResponse<AirPollution>> {
    let location: Coordinates | undefined;
    if (long && lati)
      location = {lon: +long, lat: +lati};
    return this.appService.getAirPollution(location);
  }

  
  @Get("/forecastAir")
  getAirForecast(@Query('lon') long?: number, @Query('lat') lati?: number): Observable<MyResponse<AirPollution[]>> {
    let location: Coordinates | undefined;
    if (long && lati)
      location = {lon: +long, lat: +lati};
    return this.appService.getForecastAir(location);
  }

  @Get("/cities")
  getCities(): Observable<MyResponse<ChosenLocation[]>> {
    return this.supService.findAll();
  }
}
