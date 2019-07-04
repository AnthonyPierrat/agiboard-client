import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shared/guards/auth.guard';
import { DashboardComponent } from './core/dashboard/dashboard.component';
import { HomeComponent } from './core/home/home.component';
import { LoginComponent } from './core/auth/login/login.component';
import { SignupComponent } from './core/auth/signup/signup.component';
import { ProjectViewComponent } from './core/dashboard/project-view/project-view.component';
import { ProjectViewNavbarComponent } from './core/dashboard/project-view/project-view-navbar/project-view-navbar.component';
import { ShowTaskTableComponent } from './core/dashboard/project-view/show-task-table/show-task-table.component';
import { ShowEventCalendarComponent } from './core/dashboard/project-view/show-event-calendar/show-event-calendar.component';
import { ProjectMemberComponent } from './core/dashboard/project-view/project-member/project-member.component';
import { EditTaskComponent } from './core/dashboard/project-view/show-task-table/edit-task/edit-task.component';

const routes: Routes = [
  { path: 'signup', component: SignupComponent },
  { path: 'signin', component: LoginComponent },
  { path: '', component: HomeComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'dashboard/projects/:projectId', component: ProjectViewComponent },
  { path: 'dashboard/projects/:projectId/events', component: ShowEventCalendarComponent },
  { path: 'dashboard/projects/:projectId/sprints', component: ShowTaskTableComponent },
  { path: 'dashboard/projects/:projectId/members', component: ProjectMemberComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
