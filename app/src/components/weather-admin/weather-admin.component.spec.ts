import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherAdminComponent } from './weather-admin.component';

describe('WeatherAdminComponent', () => {
  let component: WeatherAdminComponent;
  let fixture: ComponentFixture<WeatherAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeatherAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WeatherAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
