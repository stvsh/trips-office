import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService, Credentials } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  readonly alertMessage: string  = 'Invalid email or password';
  showAlert = false;

  loginForm: FormGroup = this.fb.group({
    email: [''],
    password: ['']
  });

  constructor(
    private auth: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loginForm.valueChanges.subscribe(form => {
      this.showAlert = false;
    });
  }

  login(loginForm: FormGroup): void {
    const credentials: Credentials = { ...loginForm.value };

    this.auth.login(credentials)
      .then(data => {
          const returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
          this.router.navigateByUrl(returnUrl);
      })
      .catch(error => {
        this.loginForm.reset();
        this.showAlert = true;
      });
  }
}
