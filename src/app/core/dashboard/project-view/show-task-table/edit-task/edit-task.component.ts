import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators, Form } from '@angular/forms';
import { Task } from 'src/app/shared/models/task';
import { ProjectService } from 'src/app/shared/services/project.service';
import { ActivatedRoute } from '@angular/router';
import { Select2OptionData } from 'ng-select2';
import { UserProject } from 'src/app/shared/models/userProject';
import { TaskService } from 'src/app/shared/services/task.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {

  @Input() task: Task;

  //modal create task
  private taskForm: FormGroup;
  private taskDescriptionCtrl: FormControl;
  private taskStatusCtrl: FormControl;
  private memberUserCtrl: FormControl;
  private items: Array<Select2OptionData>;
  private value: string;
  private projectId: number;
  private members: UserProject[];

  public options = {
    width: '300',
    multiple: true,
    tags: true
  };


  constructor(private projectService: ProjectService, private route: ActivatedRoute, private taskService: TaskService, private toastr: ToastrService) { }

  ngOnInit() {
    this.projectId = Number.parseInt(this.route.snapshot.paramMap.get("projectId"));
    this.getMembers();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.initForm();
  }

  getMembers() {
    this.projectService.getMembers(this.projectId).subscribe((result: any) => {
      this.members = result.data;
      this.items = this.members.map((item: any) => ({ id: item.user.id, text: item.user.name }));
      this.value = this.task.members.map(item => item.name).join(',');
      console.log(this.value, this.items);
    });
  }

  initForm() {
    //init modal task
    this.taskDescriptionCtrl = new FormControl(this.task.description);
    this.taskStatusCtrl = new FormControl(this.task.status, [Validators.required]);
    this.memberUserCtrl = new FormControl(this.task.status);
    this.taskForm = new FormGroup({
      description: this.taskDescriptionCtrl,
      status: this.taskStatusCtrl,
      members: this.memberUserCtrl,
    });
  }

  onSubmitTask() {
    this.task.members = this.taskForm.value.members;
    this.task.status = this.taskForm.value.status;
    this.taskService.updateTask(this.task).subscribe(
      (result: any) => {

      },
      error => {
        this.toastr.error(error, 'Task');
      },
      () => {
        this.toastr.success('Task updated', 'Task');
      }
    )

  }

}
