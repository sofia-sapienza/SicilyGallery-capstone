import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  email = '';
  password = '';

  constructor(private authSrv: AuthService, private router: Router) {}

  ngOnInit(): void {}

  accedi(): void {
    this.authSrv.login(this.email, this.password)
    .then(() => {
      console.log('Logged in successfully');
      this.router.navigate(['/home']);
    });
  }
}
