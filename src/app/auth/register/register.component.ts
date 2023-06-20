import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service'; // importo
import { Router } from '@angular/router'; // importo


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  email = '';
  password = '';
  nome = '';
  cognome = '';

  constructor( private authSrv: AuthService, private router : Router) { }

  ngOnInit(): void {
  }

  registra(): void {
    this.authSrv.register(this.email, this.password, this.nome, this.cognome)
    .then(() => {
      console.log('Utente registrato con successo');
      this.router.navigate(['/login']);
    })
    .catch(error => {
      console.error('Errore nella registrazione', error);
    })
  }
}
