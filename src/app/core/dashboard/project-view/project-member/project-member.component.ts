import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from 'src/app/shared/services/project.service';
import { UserProject } from 'src/app/shared/models/userProject';
import { MemberType } from 'src/app/shared/enums/member-type.enum';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/shared/services/user.service';
import { User } from 'src/app/shared/models/user';
import { Select2OptionData } from 'ng-select2';
import { Project } from 'src/app/shared/models/project';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-project-member',
  templateUrl: './project-member.component.html',
  styleUrls: ['./project-member.component.css']
})
export class ProjectMemberComponent implements OnInit {

  private projectId: number;
  private currentProject: Project;
  private members: UserProject[];
  private users: User[];
  public items: Array<Select2OptionData>;
  MemberType: typeof MemberType = MemberType;

  private memberForm: FormGroup;
  private memberTypeCtrl: FormControl;
  private memberUserCtrl: FormControl;

  public options = {
    width: '300',
    multiple: true,
    tags: true
  };

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private userService: UserService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.memberTypeCtrl = new FormControl('', [Validators.required]);
    this.memberUserCtrl = new FormControl('', [Validators.required]);
    this.memberForm = new FormGroup({
      type: this.memberTypeCtrl,
      users: this.memberUserCtrl,
    });
    this.projectId = Number.parseInt(this.route.snapshot.paramMap.get("projectId"));
    this.getMembers();
    this.getUsers();
    this.getProject();
    this.members = [];
  }

  getMembers() {
    this.projectService.getMembers(this.projectId).subscribe((result: any) => {
      if (result.data[0].user && result.data[0].project)
        this.members = result.data;
    });
  }

  getUsers() {
    this.userService.getUsers().subscribe((result: any) => {
      this.users = result.data;
      this.items = this.users.map((item: any) => ({ id: item.id, text: item.name }));
    });
  }

  getProject() {
    this.projectService.getProject(this.projectId).subscribe((result: any) => {
      this.currentProject = result.data;
    });
  }

  // remove(data: any) {
  //   const filtered = this.currentProject.userProjects.filter(element => { return element.user.id === data.user.id });
  //   this.projectService.updateMembers(this.projectId, filtered).subscribe((result: any) => {
  //     this.members = this.currentProject.userProjects.filter(element => { return element.user.id !== result.data.user.id });
  //   });
  // }

  onSubmitMember() {

    const type = this.memberForm.value.type;

    if (this.memberForm.value.users.length > 0) {
      this.memberForm.value.users.forEach(user => {
        this.projectService.addMembers(this.projectId, { project: this.projectId, user: user, type: type }).subscribe((result: any) => {
          this.members.push(result.data);
        },
          error => {
            this.toastr.error(error, 'Members');
          },
          () => {
            this.toastr.success('New member added', 'Members');
          })
      });
    }
  }

}
