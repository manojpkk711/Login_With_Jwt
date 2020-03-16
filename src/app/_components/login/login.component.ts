import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/_services/auth/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  submitted = false;
  constructor(private _authService: AuthenticationService, private router: Router) { }

  loginForm = new FormGroup({
    usernamne: new FormControl('', [
      Validators.required,
    
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ]),
  });

  hide = true;

  ngOnInit() {
  }

  onSubmit() {
    this.submitted = true;

  
    if (this.loginForm.invalid) {
        return;
    }

    console.log(this.loginForm.value);
    let userData = this.loginForm.value;
    this._authService.login(userData.username, userData.password);
    this.router.navigate(['/home']);

   
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.loginForm.value, null, 4));
}

}

