import { Component, OnInit } from '@angular/core';
import { Workspace } from 'src/app/shared/models/workspace';
import { UserService } from 'src/app/shared/services/user.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  currentUser: any;
  workspaces: Workspace[] = [];
  dataAvailable = false;

  constructor(private authService: AuthService, private userService: UserService) {
    this.currentUser = this.authService.getLoggedUser();
  }

  ngOnInit() {
    this.getWorkspaces(this.currentUser.id);
  }

  getWorkspaces(id: number) {
    this.userService.getUserWorkspaces(id).subscribe(
      (result: any) => { this.workspaces = result.data },
      (error: any) => { },
      () => { this.dataAvailable = true; }
    )
  }

}
