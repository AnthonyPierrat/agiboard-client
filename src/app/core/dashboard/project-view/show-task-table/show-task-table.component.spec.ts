import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowTaskTableComponent } from './show-task-table.component';

describe('ShowTaskTableComponent', () => {
  let component: ShowTaskTableComponent;
  let fixture: ComponentFixture<ShowTaskTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowTaskTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowTaskTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
