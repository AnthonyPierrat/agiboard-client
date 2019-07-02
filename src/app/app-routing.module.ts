import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shared/guards/auth.guard';
import { DashboardComponent } from './core/dashboard/dashboard.component';
import { HomeComponent } from './core/home/home.component';
import { LoginComponent } from './core/auth/login/login.component';
import { SignupComponent } from './core/auth/signup/signup.component';
import { ProjectViewComponent } from './core/dashboard/project-view/project-view.component';
import { ProjectViewNavbarComponent } from './core/dashboard/project-view/project-view-navbar/project-view-navbar.component';

const routes: Routes = [
  { path: 'signup', component: SignupComponent },
  { path: 'signin', component: LoginComponent },
  { path: '', component: HomeComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'dashboard/projects/:projectId', component: ProjectViewComponent },
  { path: 'dashboard/projects/:projectId/events', component: ProjectViewComponent},
  { path: 'dashboard/projects/:projectId/tasks', component: ProjectViewComponent},
  { path: 'dashboard/projects/:projectId/members', component: ProjectViewComponent},
  { path: 'dashboard/projects/:projectId/sprints', component: ProjectViewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
