import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  currentUser: any;

  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private route: Router
  ) {
    this.currentUser = this.authService.getLoggedUser();
  }

  ngOnInit() {
    console.log(this.currentUser);
  }

  logout() {
    this.authService.clearStorage();
    this.route.navigateByUrl('/');
    this.toastr.success('Successfully logged out', 'Authentification');
  }

}
