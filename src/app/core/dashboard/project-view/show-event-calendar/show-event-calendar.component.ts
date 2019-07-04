import { Component, OnInit } from '@angular/core';
import { CalendarEvent, CalendarView, CalendarEventTimesChangedEvent } from 'angular-calendar';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';
import { EventService } from "../../../../shared/services/event.service";
import { SprintService } from "../../../../shared/services/sprint.service";
import { ProjectService } from 'src/app/shared/services/project.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Project } from 'src/app/shared/models/project';
import { Sprint } from 'src/app/shared/models/sprint';
import { Event } from 'src/app/shared/models/event';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-show-event-calendar',
  templateUrl: './show-event-calendar.component.html',
  styleUrls: ['./show-event-calendar.component.css']
})
export class ShowEventCalendarComponent implements OnInit {

  view: CalendarView;
  viewDate: Date;
  calendarEvents: CalendarEvent[];
  events: Event[];
  activeDayIsOpen: boolean = false;

  idProject: number;
  project: Project;
  sprints: Sprint[];
  selectSprint: Sprint;
  sprintId: number;
  sprintSelected: Sprint;

  //modal create event
  private eventForm: FormGroup;
  private eventNameCtrl: FormControl;
  private eventStartDateCtrl: FormControl;
  private eventEndDateCtrl: FormControl;
  

  constructor(
    private eventService: EventService,
    private sprintService: SprintService,
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private toastr: ToastrService
    ) { }

  ngOnInit() {
    //get events of project
    this.idProject = Number.parseInt(this.route.snapshot.paramMap.get("projectId"));
    this.projectService.getProject(this.idProject).subscribe(
      (result: any) => {
      this.project = result.data;
      this.sprints = this.project.sprints;
    }, 
    error => {

    },
    () => {
      this.initSelectBox();
    });

    this.viewDate = new Date();
    this.calendarEvents = [];

    //init modal event
    this.eventNameCtrl = new FormControl('', [Validators.required]);
    this.eventStartDateCtrl = new FormControl(new Date(), [Validators.required]);
    this.eventEndDateCtrl = new FormControl(new Date(), [Validators.required]);
    this.eventForm = new FormGroup({
      name: this.eventNameCtrl,
      startDate: this.eventStartDateCtrl,
      endDate: this.eventEndDateCtrl
    });
  }

  private initSelectBox(){
    this.selectSprint = this.sprints[0];
  }

  private changeSprint(changed){
    this.sprintId = changed;
    this.sprintService.getSprint(changed).subscribe(
      (result: any) => {
        this.sprintSelected = result.data;
        this.events = result.data.events;
      }, 
      error => {
  
      },
      () => {
        //add events fetched to events list
        this.calendarEvents = [];
        for(let event of this.events){
          this.calendarEvents.push(
            {
              start: new Date(event.startDate),
              end: new Date(event.endDate),
              title: event.description
            }
          );
        }
      });
  }


  /*sprintsprint
  * Method to add a sprint
  */
 onSubmitEvent() {
  // stop here if form is invalid
  if (this.eventForm.invalid) {
    return;
  }
  const event: Event = new Event();
  event.description = this.eventForm.value.name;
  event.startDate = this.eventForm.value.startDate;
  event.endDate = this.eventForm.value.endDate;
  (event.sprint as unknown) = this.sprintId;
  event.type = 1;
  this.addEvent(event);
}
addEvent(event: Event) {
  this.eventService.addEvent(event).subscribe(
    (result: any) => {
      console.log("startDate : "+result.data.startDate);
      let buffer = this.calendarEvents;
      this.calendarEvents = [];
      for(let event of buffer){
        this.calendarEvents.push(event);
      }
      this.calendarEvents.push(
        {
          start: new Date(result.data.startDate),
          end: new Date(result.data.endDate),
          title: result.data.description
        }
      );    
    },
    error => {
      this.toastr.error(error, 'Event');
    },
    () => {
      this.toastr.success('New event added', 'Event');
    }
  )
}


  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      this.viewDate = date;
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
    }
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

}
