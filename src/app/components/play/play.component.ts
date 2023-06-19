import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/compat/database';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss'],
})
export class PlayComponent implements OnInit {

  esperienze!: any[]
  constructor(private firedatabase: AngularFireDatabase) {

  }
  esperienza = {
    titolo: '',
    descrizione: '',
    immagine: '',
  }



  ngOnInit(): void {

    this.firedatabase.list('esperienze').valueChanges().subscribe((data) => {
      this.esperienze = data;
    });
  }

  addEsperienza(): void{
    const esperienze = this.firedatabase.list('esperienze').push(this.esperienza) // .list mi recupera l'array esperienze
    .then(() => {
      console.log('esperienza aggiunta con successo', this.esperienza);
      this.resetForm();
    })
    .catch((error) => {
      console.error('esperienza non aggiunta con successo', error);

  })

}

eliminaEsperienza(key: string) :void {
  const esperienze = this.firedatabase.object(`firedatabase/${key}`);
  esperienze.remove()
  .then(() => {
    console.log('esperienza eliminata con successo', key);
  })
  .catch((error) => {
    console.error('esperienza non eliminata con successo', error);
  });
}

  resetForm(): void {
    this.esperienza = {
      titolo: '',
      descrizione: '',
      immagine: '',
    }
  }
}
