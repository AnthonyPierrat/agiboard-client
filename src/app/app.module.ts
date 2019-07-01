import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './core/auth/login/login.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { DashboardComponent } from './core/dashboard/dashboard.component';
import { HeaderComponent } from './core/header/header.component';
import { HomeComponent } from './core/home/home.component';
import { SignupComponent } from './core/auth/signup/signup.component';
import { TokenInterceptor } from './shared/interceptors/token.interceptor';
import { WorkspacesComponent } from './core/dashboard/workspaces/workspaces.component';
import { ProjectsComponent } from './core/dashboard/workspaces/projects/projects.component';
import { ProjectViewComponent } from './core/dashboard/project-view/project-view.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    HeaderComponent,
    HomeComponent,
    SignupComponent,
    WorkspacesComponent,
    ProjectsComponent,
    ProjectViewComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule, // required animations module
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
