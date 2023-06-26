import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database'; // importo il database che ho su Firebase
import { Experience } from 'src/app/models/experience.interface'; // importo l'interfaccia

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss'],
})
export class PlayComponent implements OnInit {
  esperienze!: any[];

  constructor(private firedatabase: AngularFireDatabase) {}

  esperienza = {
    key: '',
    immagine: '',
    titolo: '',
    sottotitolo: '',
    descrizione: '',
    prezzo: '',
  };

  modifica: string | null = null;

  ngOnInit(): void {
    this.firedatabase
      .list('esperienze')
      .valueChanges()
      .subscribe((data) => {
        this.esperienze = data;
      });
  }

  // METODO AGGIUNGI ESPERIENZA
  addEsperienza(): void {
    const ref = this.firedatabase.list('esperienze').push(this.esperienza);
    ref
      .then((item) => {
        // Assicuriamoci che la chiave sia stata generata
        if (item.key !== null) {
          // Aggiungi la chiave all'oggetto
          this.esperienza.key = item.key;
          // Aggiorna l'oggetto nel database con la nuova chiave
          item.update(this.esperienza).then(() => {
            console.log('esperienza aggiunta con successo', this.esperienza);
            this.resetForm();
          });
        }
      })
      .catch((error) => {
        console.error('esperienza non aggiunta con successo', error);
      });
  }

  // METODO MODIFICA ESPERIENZA
  modificaEsperienza(key: string, esperienzaModificata: Experience) {
    return this.firedatabase
      .object(`esperienze/${key}`)
      .update(esperienzaModificata)
      .then(() => {
        console.log('esperienza modificata con successo', esperienzaModificata);
      })
      .catch((error) => {
        console.error('esperienza non modificata con successo', error);
      });
  }

  // METODO ELIMINA ESPERIENZA
  eliminaEsperienza(key: string) {
    return this.firedatabase.object(`esperienze/${key}`).remove();
  }

  // METODO CHE SVUOTA IL FORM
  resetForm(): void {
    this.esperienza = {
      key: '',
      immagine: '',
      titolo: '',
      sottotitolo: '',
      descrizione: '',
      prezzo: '',
    };
  }
}
