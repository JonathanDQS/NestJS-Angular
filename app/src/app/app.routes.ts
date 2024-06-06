import { Routes } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { WeatherAdminComponent } from '../components/weather-admin/weather-admin.component';
import { DaysAdminComponent } from '../components/days-admin/days-admin.component';
import { CityForecastComponent } from '../components/city-forecast/city-forecast.component';

export const routes: Routes = [
    {
        path: 'admin',
        component: WeatherAdminComponent
    },
    {
        path: 'days',
        component: DaysAdminComponent
    },
    {
        path: 'forecast',
        component: CityForecastComponent
    },
    {
        path: '**',
        component: HomeComponent
    }
];
