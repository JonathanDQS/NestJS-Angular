import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ForecastWeather } from 'openweather-api-node';
import { ChosenLocation } from '../../interfaces/support';
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-city-forecast',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './city-forecast.component.html',
  styleUrl: './city-forecast.component.scss',
  host: { class: 'container d-flex justify-content-center align-items-center flex-column' },
})
export class CityForecastComponent {
  cities: ChosenLocation[] = [];
  private countriesSet: Set<string> = new Set<string>();
  countries: string[] = [];
  selectedCountry: string = "";
  selectedCity: ChosenLocation | undefined;
  shownCity: string = '';
  shownCountry: string = '';
  forecasted: ForecastWeather[] | undefined;
  days: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  /**
   * Constructor which has the weather service needed, injected
   */
  constructor(private weatherService: WeatherService) { }

  /**
   * Implementation of OnInit to load the necessary lists to show countries and cities
   */
  ngOnInit(): void {
    this.weatherService.getCityList().subscribe(
      {
        next: (value) => {
          if (value.successful) {
            value.data?.map(location => { return location.country }).forEach(loc => this.countriesSet.add(loc));
            this.countries = Array.from(this.countriesSet);
            this.cities = value.data ? value.data : [];
          }
        },
        error: (err) => {
          console.error(err);
        },
      }
    );
  }

  /**
   * Once the city has been chosen, the forecast will be loaded and shown dinamycally
   */
  showWeather() {
    this.shownCity = this.selectedCity?.city ?? '';
    this.shownCountry = this.selectedCity?.country ?? '';
    this.weatherService.getForecast(this.selectedCity).subscribe(
      {
        next: (value) => {
          if (value.successful) {
            this.forecasted = value.data;
          }
        },
        error: (err) => {
          console.error(err);
        },
      }
    )
  }

  /**
   * Helper function to filter the data needed
   * @returns The filtered cities according to the country chosen
   * TODO: Move to a Utils class
   */
  filteredCities(): ChosenLocation[] {
    if (this.selectedCountry) {
      return this.cities.filter((city) => city.country == this.selectedCountry);
    }
    return [];
  }
}
