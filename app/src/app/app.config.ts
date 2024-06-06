import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { generalInterceptor } from '../interceptors/general.interceptor';
import { DatePipe } from '@angular/common';

export const appConfig: ApplicationConfig = {
  providers: [DatePipe, provideRouter(routes), provideHttpClient(withInterceptors([generalInterceptor]))]
};
