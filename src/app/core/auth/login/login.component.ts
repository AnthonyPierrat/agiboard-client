import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private submitted: boolean = false;
  private redirectUrl: string;
  private loginForm: FormGroup;
  private emailCtrl: FormControl;
  private passwordCtrl: FormControl;

  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {

    this.route.queryParams
      .subscribe(params => this.redirectUrl = params['return'] || '/dashboard');

    this.emailCtrl = new FormControl('', [Validators.required, Validators.email]);
    this.passwordCtrl = new FormControl('', [Validators.required, Validators.minLength(6)]);

    this.loginForm = new FormGroup({
      email: this.emailCtrl,
      password: this.passwordCtrl
    });

  }

  login(data: any) {
    this.authService.login(data).subscribe(
      result => {
        this.authService.setToken(result.data)
      },
      error => {
        this.toastr.error(error, 'Authentification Error');
      },
      () => {
        // redirect
        this.toastr.success('Successfully logged in', 'Authentification');
        this.router.navigateByUrl(this.redirectUrl);
      })
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.login(this.loginForm.value);

    this.submitted = false;

  }

}
