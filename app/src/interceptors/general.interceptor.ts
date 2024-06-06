import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoaderService } from '../services/loader.service';
import { finalize } from 'rxjs';

export const generalInterceptor: HttpInterceptorFn = (request, next) => {
  const loader = inject(LoaderService);
  loader.show();
  return next(request).pipe(
    finalize(() => loader.hide())
  );
};
