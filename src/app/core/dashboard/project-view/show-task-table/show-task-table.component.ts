import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Sprint } from "../../../../shared/models/sprint";
import { SprintService } from "../../../../shared/services/sprint.service";
import { ProjectService } from "../../../../shared/services/project.service";
import { TaskService } from "../../../../shared/services/task.service";
import { Project } from 'src/app/shared/models/project';
import { Task } from 'src/app/shared/models/task';
import { Status } from 'src/app/shared/enums/status.enum';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-show-task-table',
  templateUrl: './show-task-table.component.html',
  styleUrls: ['./show-task-table.component.css']
})
export class ShowTaskTableComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private sprintService: SprintService,
    private projectService: ProjectService,
    private taskService: TaskService,
    private toastr: ToastrService
  ) { }

  titleSelectSprint: string;
  idProject: number;
  sprints: Sprint[];
  project: Project;
  selectSprint: Sprint;
  tasks: Task[];
  Status: typeof Status = Status;
  sprintId: number;
  sprintSelected: Sprint;
  selectedTask: Task;

  //modal create sprint
  private sprintForm: FormGroup;
  private sprintNameCtrl: FormControl;
  private sprintStartDateCtrl: FormControl;
  private sprintEndDateCtrl: FormControl;

  //modal create task
  private taskForm: FormGroup;
  private taskDescriptionCtrl: FormControl;

  ngOnInit() {
    this.titleSelectSprint = "Select a sprint";
    this.sprintId = null;
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


    //init modal sprint
    this.sprintNameCtrl = new FormControl('', [Validators.required]);
    this.sprintStartDateCtrl = new FormControl(new Date(), [Validators.required]);
    this.sprintEndDateCtrl = new FormControl(new Date(), [Validators.required]);
    this.sprintForm = new FormGroup({
      name: this.sprintNameCtrl,
      startDate: this.sprintStartDateCtrl,
      endDate: this.sprintEndDateCtrl
    });

    //init modal task
    this.taskDescriptionCtrl = new FormControl('', [Validators.required]);
    this.taskForm = new FormGroup({
      description: this.taskDescriptionCtrl
    });
  }

  private initSelectBox() {
    this.selectSprint = this.sprints[0];
  }

  private changeSprint(changed) {
    this.sprintId = changed;
    this.sprintService.getSprint(changed).subscribe(
      (result: any) => {
        //this.selectSprint = result.data;
        this.sprintSelected = result.data;
        this.tasks = result.data.tasks;
      },
      error => {

      },
      () => {
      });
  }


  /*
  * Method to add a sprint
  */
  onSubmitSprint() {
    // stop here if form is invalid
    if (this.sprintForm.invalid) {
      return;
    }
    const sprint: Sprint = new Sprint();
    sprint.name = this.sprintForm.value.name;
    sprint.startDate = this.sprintForm.value.startDate;
    sprint.endDate = this.sprintForm.value.endDate;
    (sprint.project as unknown) = this.project.id;
    this.addSprint(sprint);
  }
  addSprint(sprint: Sprint) {
    this.sprintService.addSprint(sprint).subscribe(
      (result: any) => {
        this.sprints.push(result.data);
        this.initSelectBox();
        this.changeSprint(result.data.id);
      },
      error => {
        this.toastr.error(error, 'Sprint');
      },
      () => {
        this.toastr.success('New sprint added', 'Sprint');
      }
    )
  }


  /*
  * Method to add a task
  */
  onSubmitTask() {
    // stop here if form is invalid
    if (this.taskForm.invalid) {
      return;
    }
    const task: Task = new Task();
    task.description = this.taskForm.value.description;
    task.status = 4;
    (task.sprint as unknown) = this.sprintId;
    this.addTask(task);
  }
  addTask(task: Task) {
    this.taskService.addTask(task).subscribe(
      (result: any) => {
        this.sprintSelected.tasks.push(result.data);
      },
      error => {
        this.toastr.error(error, 'Task');
      },
      () => {
        this.toastr.success('New task added', 'Task');
      }
    )
  }

  onChangeTask(task: Task) {
    this.selectedTask = task;
    console.log(this.selectedTask);
  }
}