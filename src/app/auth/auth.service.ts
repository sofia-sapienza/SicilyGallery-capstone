import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'; // importo
import { AngularFireDatabase } from '@angular/fire/compat/database'; // importp
import { Router } from '@angular/router'; // importo il Router

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private authSrv: AngularFireAuth,
    private firebase: AngularFireDatabase
  ) {}

  async register(
    email: string,
    password: string,
    nome: string,
    cognome: string
  ) {
    try {
      const user = await this.authSrv.createUserWithEmailAndPassword(
        email,
        password
      );
      if (user.user) {
        await this.firebase
          .object(`users/${user.user.uid}`)
          .set({ nome: nome, cognome: cognome, email: email });
      }
    } catch (error) {
      console.error('Errore nella registrazione', error);
    }
  }

  async login(email: string, password: string) {
    try {
      await this.authSrv.signInWithEmailAndPassword(email, password);
      console.log('Login effettuato');
    } catch (error) {
      console.error('Errore nel login', error);
    }
  }

  async logout() {
    try {
      await this.authSrv.signOut();
      console.log('Logout effettuato');
    } catch (error) {
      console.error('Errore nella logout', error);
    }
  }
}
