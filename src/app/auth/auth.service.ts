import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'; // importo
import { AngularFireDatabase } from '@angular/fire/compat/database'; // importo
import { Router } from '@angular/router'; // importo il Router
import { switchMap, of } from 'rxjs'; //❗importo


@Injectable({
  providedIn: 'root',
})
export class AuthService {
 private utenteLoggato: boolean = false; // Inizzializzo una variabile utenteLoggato a 'false' per gestire la visualizzazione dei bottoni Login e Logout
 public Admin: boolean = false; // Inizzializzo una variabile isAdmin a false per gestire il ruolo all'iterno dell'app

  constructor(
    public authSrv: AngularFireAuth,
    private firebase: AngularFireDatabase,
    private router: Router
  ) {}

  isUtenteLoggato(): boolean {
    return this.utenteLoggato;
  }

  isAdmin(): boolean {
    return this.Admin;
  }

  //REGISTRAZIONE
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

  //LOGIN
  async login(email: string, password: string) {
    try {
      await this.authSrv.signInWithEmailAndPassword(email, password);
      this.utenteLoggato = true;
      console.log('Login effettuato');
      this.authSrv.authState.subscribe(user => {
        if (user && user.uid === 'sBOP1ryRXaX12a9rnoQ3lmOQJy32') {
          this.Admin = true;
        }
      });
    } catch (error) {
      console.error('Errore nel login', error);
      throw error; // Aggiungi questa riga per rilanciare l'errore
    }
  }
  //LOGOUT
  async logout() {
    try {
      await this.authSrv.signOut();
      this.utenteLoggato = false;
      console.log('Logout effettuato');
    } catch (error) {
      console.error('Errore nella logout', error);
    }
  }

   //GET UTENTE E MI RESTITUISCE L'UTENTE COLLEGATO
   getUserData() {
    return this.authSrv.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.firebase
            .object(`/users/${user.uid}`)
            .valueChanges()
            .pipe(
              switchMap((userData) => {
                const userDataWithUid = Object.assign({}, userData, {
                  uid: user.uid,
                });
                return of(userDataWithUid);
              })
            );
        } else {
          return of(null);
        }
      })
    );
  }
}
