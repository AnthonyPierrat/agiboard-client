import { Component, OnInit, Input } from '@angular/core';
import { Workspace } from 'src/app/shared/models/workspace';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { WorkspaceService } from 'src/app/shared/services/workspace.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-workspaces',
  templateUrl: './workspaces.component.html',
  styleUrls: ['./workspaces.component.css']
})
export class WorkspacesComponent implements OnInit {

  @Input() workspaces: Workspace[];

  private currentUser: any;

  private workspaceForm: FormGroup;
  private workspaceNameCtrl: FormControl;
  private workspaceDescriptionCtrl: FormControl;

  constructor(private workspaceService: WorkspaceService, private authService: AuthService, private toastr: ToastrService) { }

  ngOnInit() {
    this.currentUser = this.authService.getLoggedUser();
    this.workspaceNameCtrl = new FormControl('', [Validators.required]);
    this.workspaceDescriptionCtrl = new FormControl('', [Validators.required]);

    this.workspaceForm = new FormGroup({
      name: this.workspaceNameCtrl,
      description: this.workspaceDescriptionCtrl
    });
  }

  addWorkspace(workspace: Workspace) {
    this.workspaceService.addWorkspace(workspace).subscribe(
      (result: any) => {
        this.workspaces.push(result.data);
      },
      error => {
        this.toastr.error(error, 'Workspace');
      },
      () => {
        this.toastr.success('New workspace added', 'Workspace');
      }
    )
  }

  onSubmitWorkspace() {
    // stop here if form is invalid
    if (this.workspaceForm.invalid) {
      return;
    }
    const workspace: Workspace = new Workspace();
    workspace.name = this.workspaceForm.value.name;
    workspace.description = this.workspaceForm.value.description;
    workspace.owner = this.currentUser.id;
    workspace.projects = [];
    this.addWorkspace(workspace);

  }

}
