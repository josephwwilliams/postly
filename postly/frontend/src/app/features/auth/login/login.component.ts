import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService, LoginUser } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  public loginForm = this.formBuilder.group({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  private authSubscription = new Subscription();

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  public submit() {
    if (this.loginForm.invalid) return;

    const formValue = this.loginForm.getRawValue() as LoginUser;

    this.authSubscription.add(
      this.authService.login(formValue).subscribe((response) => {
        const { user } = response;

        this.authService.setUser(user);
        this.router.navigate(['/', 'blog', user.username]);
      })
    );
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }
}
