import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service'; //importo l'auth.service per poter utilizzare i suoi metodi
import { Experience } from 'src/app/models/experience.interface'; // importo l'interfaccia
import { EsperienzeService } from 'src/app/service/esperienze.service'; // importo il service
import { AngularFireDatabase } from '@angular/fire/compat/database'; // import di prova ❗
import { AngularFireAuth } from '@angular/fire/compat/auth'; // import di prova ❗

@Component({
  selector: 'app-table-add',
  templateUrl: './table-add.component.html',
  styleUrls: ['./table-add.component.scss'],
})
export class TableAddComponent implements OnInit {
  esperienze!: any[];

  constructor(
    public authSrv: AuthService,
    private esperienzeSrv: EsperienzeService,
    private firebase: AngularFireDatabase,
    private fireAuth: AngularFireAuth
  ) {}

  esperienza = {
    key: '',
    genere: '',
    immagine: '',
    titolo: '',
    sottotitolo: '',
    descrizione: '',
    prezzo: 0,
    approfondimenti: '',
  };

  ngOnInit(): void {}

  // METODO AGGIUNGI ESPERIENZA
  addEsperienza(): void {
    this.esperienzeSrv
      .addEsperienza(this.esperienza)
      .then(() => {
        console.log('esperienza aggiunta con successo', this.esperienza);
        this.resetForm();
      })
      .catch((error) => {
        console.error('esperienza non aggiunta con successo', error);
      });
  }

   // METODO CHE SVUOTA IL FORM
   resetForm(): void {
    this.esperienza = {
      key: '',
      genere: '',
      immagine: '',
      titolo: '',
      sottotitolo: '',
      descrizione: '',
      prezzo: 0,
      approfondimenti: '',
    };
  }
}
