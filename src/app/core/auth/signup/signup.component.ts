import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  private submitted: boolean = false;
  private signupForm: FormGroup;
  private emailCtrl: FormControl;
  private passwordCtrl: FormControl;

  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router,
  ) { }

  ngOnInit() {

    this.emailCtrl = new FormControl('', [Validators.required, Validators.email]);
    this.passwordCtrl = new FormControl('', [Validators.required, Validators.minLength(6)]);

    this.signupForm = new FormGroup({
      email: this.emailCtrl,
      password: this.passwordCtrl
    });

  }

  signup(data: any) {
    this.authService.signup(data).subscribe(
      result => {
        // nothing
      },
      error => {
        this.toastr.error(error, 'Sign up Error');
      },
      () => {
        // redirect
        this.router.navigateByUrl('/signin');
        this.toastr.success('Successfully signed up', 'Authentification');
      })
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.signupForm.invalid) {
      return;
    }

    this.signup(this.signupForm.value);

    this.submitted = false;

  }

}
