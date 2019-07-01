import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Project } from 'src/app/shared/models/project';
import { Workspace } from 'src/app/shared/models/workspace';
import { ProjectService } from 'src/app/shared/services/project.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  @Input() workspace: Workspace;

  private projectForm: FormGroup;
  private projectNameCtrl: FormControl;
  private projectDescriptionCtrl: FormControl;
  private projectBudgetCtrl: FormControl;
  private projectStartDateCtrl: FormControl;
  private projectEndDateCtrl: FormControl;


  constructor(private projectService: ProjectService, private toastr: ToastrService) { }

  ngOnInit() {
    this.projectNameCtrl = new FormControl('', [Validators.required]);
    this.projectDescriptionCtrl = new FormControl('', [Validators.required]);
    this.projectBudgetCtrl = new FormControl('', [Validators.required]);
    this.projectStartDateCtrl = new FormControl(new Date(), [Validators.required]);
    this.projectEndDateCtrl = new FormControl(new Date(), [Validators.required]);


    this.projectForm = new FormGroup({
      name: this.projectNameCtrl,
      description: this.projectDescriptionCtrl,
      budget: this.projectBudgetCtrl,
      startDate: this.projectStartDateCtrl,
      endDate: this.projectEndDateCtrl
    });
  }

  addProject(project: Project) {
    this.projectService.addProject(project).subscribe(
      (result: any) => {
        this.workspace.projects.push(result.data);
      },
      error => {
        this.toastr.error(error, 'Project');
      },
      () => {
        this.toastr.success('New project added', 'Project');
      }
    )
  }

  onSubmitProject() {
    // stop here if form is invalid
    if (this.projectForm.invalid) {
      return;
    }

    const project: Project = new Project();
    project.name = this.projectForm.value.name;
    project.description = this.projectForm.value.description;
    project.budget = this.projectForm.value.budget;
    project.startDate = this.projectForm.value.startDate;
    project.endDate = this.projectForm.value.endDate;
    project.workspace = this.workspace;
    this.addProject(project);
  }

}
