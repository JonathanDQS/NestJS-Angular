import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  isLoading = new BehaviorSubject<number>(0);
  public isLoading$ = this.isLoading.asObservable();

  show(): void {
    this.isLoading.next(this.isLoading.value + 1);
  }

  hide(): void {
    if (this.isLoading.value === 0) {
      this.isLoading.next(0);
    }
    else {
      this.isLoading.next(this.isLoading.value - 1);
    }
  }
}
