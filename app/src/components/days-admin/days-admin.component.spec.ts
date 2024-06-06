import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DaysAdminComponent } from './days-admin.component';

describe('DaysAdminComponent', () => {
  let component: DaysAdminComponent;
  let fixture: ComponentFixture<DaysAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DaysAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DaysAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
