import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectViewNavbarComponent } from './project-view-navbar.component';

describe('ProjectViewNavbarComponent', () => {
  let component: ProjectViewNavbarComponent;
  let fixture: ComponentFixture<ProjectViewNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectViewNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectViewNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
