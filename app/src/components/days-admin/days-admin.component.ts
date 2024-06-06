import { CommonModule, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ForecastWeather } from 'openweather-api-node';
import { ChosenLocation } from '../../interfaces/support';
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-days-admin',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './days-admin.component.html',
  styleUrl: './days-admin.component.scss',
  host: { class: 'container d-flex justify-content-center align-items-center flex-column' },
})
export class DaysAdminComponent {
  cities: ChosenLocation[] = [];
  today: Date = new Date();
  selectedDate: Date = this.today;
  forecasted: ForecastWeather[] | undefined;
  days: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  /**
   * Constructor which has the weather service and date pipe needed, injected
   */
  constructor(private weatherService: WeatherService, private datePipe: DatePipe) { }

  /**
   * Implementation of OnInit to load the necessary list to use cities
   */
  ngOnInit(): void {
    this.weatherService.getCityList().subscribe(
      {
        next: (value) => {
          if (value.successful) {
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
   * Once the date has been chosen, the forecast will be loaded and shown dinamycally showing a random city weather since there's no access to the history API
   */
  showWeather() {
    this.weatherService.getForecast(this.cities[Math.floor(Math.random() * this.cities.length)]).subscribe(
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
   * Get function to update and show the date appropriately
   */
  get formattedDate() {
    return this.datePipe.transform(this.selectedDate, 'yyyy-MM-dd');
  }
}
