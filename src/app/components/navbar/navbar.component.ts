import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {

  constructor( private authSrv: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  isUtenteLoggato(): boolean {
    return this.authSrv.isUtenteLoggato();
  }

  logout(): void {
    this.authSrv.logout()
    .then(() => {
      console.log('Logged out');
      this.router.navigate(['/login']);
    })
    .catch((error) => {
      console.error('Errore durante il logout', error);
    })
  }

}
