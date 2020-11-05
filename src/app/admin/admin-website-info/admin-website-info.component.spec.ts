import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminWebsiteInfoComponent } from './admin-website-info.component';

describe('AdminWebsiteInfoComponent', () => {
  let component: AdminWebsiteInfoComponent;
  let fixture: ComponentFixture<AdminWebsiteInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminWebsiteInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminWebsiteInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
