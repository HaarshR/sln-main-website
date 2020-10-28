import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegularMemberPageComponent } from './regular-member-page.component';

describe('RegularMemberPageComponent', () => {
  let component: RegularMemberPageComponent;
  let fixture: ComponentFixture<RegularMemberPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegularMemberPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegularMemberPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
