import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExecutiveMemberPageComponent } from './executive-member-page.component';

describe('ExecutiveMemberPageComponent', () => {
  let component: ExecutiveMemberPageComponent;
  let fixture: ComponentFixture<ExecutiveMemberPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExecutiveMemberPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExecutiveMemberPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
