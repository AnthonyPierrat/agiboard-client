import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowEventCalendarComponent } from './show-event-calendar.component';

describe('ShowEventCalendarComponent', () => {
  let component: ShowEventCalendarComponent;
  let fixture: ComponentFixture<ShowEventCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowEventCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowEventCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
