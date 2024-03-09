import { Component } from '@angular/core';
import { map } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  public user$ = this.authService.currentUser;

  constructor(private authService: AuthService) {}

  logout() {
    this.authService.logout();
  }
}
