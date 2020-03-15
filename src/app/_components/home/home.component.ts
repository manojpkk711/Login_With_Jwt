import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/_services/auth/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private _authService: AuthenticationService, private router: Router) { }

  ngOnInit() {
  }

  logout() {
    this._authService.logout();
    this.router.navigate(['/login']);
  }

}
