import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { ChosenLocation } from '../../interfaces/support';
import { FormsModule } from '@angular/forms';
import { CurrentWeather } from 'openweather-api-node';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-weather-admin',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './weather-admin.component.html',
  styleUrl: './weather-admin.component.scss',
  host: { class: 'container d-flex justify-content-center align-items-center flex-column' },
})
export class WeatherAdminComponent implements OnInit {

  cities: ChosenLocation[] = [];
  private countriesSet: Set<string> = new Set<string>();
  countries: string[] = [];
  selectedCountry: string = "";
  selectedCity: ChosenLocation | undefined;
  currentWeather: CurrentWeather | undefined = undefined;
  shownCity: string = '';
  shownCountry: string = '';
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

  /**
   * Once the city has been chosen, the current weather will be loaded and shown dinamycally
   */
  showWeather() {
    this.shownCity = this.selectedCity?.city ?? '';
    this.shownCountry = this.selectedCity?.country ?? '';
    this.weatherService.getCurrentWeather(this.selectedCity).subscribe(
      {
        next: (value) => {
          if (value.successful) {
            this.currentWeather = value.data;
          }
        },
        error: (err) => {
          console.error(err);
        },
      }
    )
  }

}
