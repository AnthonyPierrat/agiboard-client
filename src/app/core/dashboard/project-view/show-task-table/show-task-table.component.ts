import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Sprint } from "../../../../shared/models/sprint";
import { SprintService } from "../../../../shared/services/sprint.service";
import { ProjectService } from "../../../../shared/services/project.service";
import { Project } from 'src/app/shared/models/project';
import { Task } from 'src/app/shared/models/task';
import { Status } from 'src/app/shared/enums/status.enum';


@Component({
  selector: 'app-show-task-table',
  templateUrl: './show-task-table.component.html',
  styleUrls: ['./show-task-table.component.css']
})
export class ShowTaskTableComponent implements OnInit {

  constructor(
      private route: ActivatedRoute,
      private sprintService: SprintService,
      private projectService: ProjectService
    ) { }

  titleSelectSprint:string;
  idProject: number;
  sprints: Sprint[];
  project: Project;
  selectSprint: Sprint;
  tasks : Task[];
  Status: typeof Status = Status;

  ngOnInit() {
    this.titleSelectSprint = "Select a sprint";
    this.idProject = Number.parseInt(this.route.snapshot.paramMap.get("projectId"));
    this.projectService.getProject(this.idProject).subscribe(
      (result: any) => {
      this.project = result.data;
      this.sprints = this.project.sprints;
    }, 
    error => {

    },
    () => {
      this.selectSprint = this.sprints[0];
    });
  }

  private changeSprint(changed){
    this.sprintService.getSprint(changed).subscribe(
      (result: any) => {
        this.tasks = result.data.tasks;
      }, 
      error => {
  
      },
      () => {
        
    });
  }
}
