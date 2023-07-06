import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'; // importo
import { AngularFireDatabase } from '@angular/fire/compat/database'; // importp
import { Router } from '@angular/router'; // importo il Router

@Injectable({
  providedIn: 'root',
})
export class AuthService {
 private utenteLoggato: boolean = false; // Inizzializzo una variabile utenteLoggato a 'false' per gestire la visualizzazione dei bottoni Login e Logout
 private nomeUtente: string = ''; // Inizzializzo una variabile nomeUtente per visualizzare il nome dell'utente al momento loggato

  constructor(
    private authSrv: AngularFireAuth,
    private firebase: AngularFireDatabase,
    private router: Router
  ) {}

  isUtenteLoggato(): boolean {
    return this.utenteLoggato;
  }

  getNomeUtente(): string {
    return this.nomeUtente;
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
      /* this.nomeUtente = ; */
      console.log('Login effettuato');
    } catch (error) {
      console.error('Errore nel login', error);
      throw error; // Aggiungi questa riga per rilanciare l'errore
    }
  }
/*   async login(email: string, password: string) {
    try {
      const userCredential = await this.authSrv.signInWithEmailAndPassword(email, password);
      this.utenteLoggato = true;
      const userId = userCredential.user?.uid;
      if (userId) {
        const userSnapshot = await this.firebase.object(`users/${userId}`).valueChanges().toPromise();
        this.nomeUtente = userSnapshot.nome; // Assume che il nome dell'utente sia presente nel campo "nome" dell'oggetto userSnapshot
      }
      console.log('Login effettuato');
    } catch (error) {
      console.error('Errore nel login', error);
      throw error;
    }
  } */

  //LOGOUT
  async logout() {
    try {
      await this.authSrv.signOut();
      console.log('Logout effettuato');
    } catch (error) {
      console.error('Errore nella logout', error);
    }
  }
}
