import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService, Credentials } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup = this.fb.group({
    email: [''],
    password: [''],
    passwordConfirmed: ['']
  });

  constructor(
    private auth: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
  }

  register(registerForm: FormGroup): void {
    const { email, password, _passwordConfirmed } = registerForm.value;

    const credentials: Credentials = { email, password };

    this.auth.register(credentials)
      .then(
        data => {
          const returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
          this.router.navigateByUrl(returnUrl);
        }
      );
  }
}
