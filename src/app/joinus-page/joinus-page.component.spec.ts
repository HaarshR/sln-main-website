import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinusPageComponent } from './joinus-page.component';

describe('JoinusPageComponent', () => {
  let component: JoinusPageComponent;
  let fixture: ComponentFixture<JoinusPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JoinusPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinusPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
