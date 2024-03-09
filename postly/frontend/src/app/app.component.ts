import { Component } from '@angular/core';
import { AuthService } from './shared/services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'postly';

  private authSubscription = new Subscription();

  constructor(
    private authService: AuthService,
    private cookieService: CookieService
  ) {}

  ngOnInit() {
    if (this.cookieService.check('token')) {
      this.authSubscription.add(
        this.authService.me().subscribe((response) => {
          this.authService.setUser(response.user);
        })
      );
    }
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }
}
