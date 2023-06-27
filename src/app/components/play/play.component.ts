import { Component, OnInit } from '@angular/core';
import { Experience } from 'src/app/models/experience.interface'; // importo l'interfaccia
import { EsperienzeService } from 'src/app/service/esperienze.service';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss'],
})
export class PlayComponent implements OnInit {
  esperienze!: any[];
  esperienzeFiltrate: Experience[] = []; // inizializzo una variabile ti tipo: Interfaccia che mi riempirò con le esperienze filtrate

  constructor(private esperienzeSrv : EsperienzeService) {}

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

  modifica: string | null = null;

  ngOnInit(): void {
      this.esperienzeSrv.getEsperienze().subscribe((data) => {
        this.esperienze = data;
        this.esperienzeFiltrate = [...this.esperienze]; // Inizialemente mostra tutte le esperienze non fitrate
      })
  }

  // METODO AGGIUNGI ESPERIENZA
  addEsperienza(): void {
    this.esperienzeSrv.addEsperienza(this.esperienza)
      .then(() => {
        console.log('esperienza aggiunta con successo', this.esperienza);
        this.resetForm();
      })
      .catch((error) => {
        console.error('esperienza non aggiunta con successo', error);
      });
  }

  //METODO PER FILTRARE LE ESPERIENZE IN BASE AL GENERE (eat, play, relax)
 /*  filterEsperienze(genere: string): void {
    this.esperienzeFiltrate = this.esperienze.filter((esperienza) => {
      return esperienza.genere.toLowerCase() === genere.toLowerCase();
    });
  } */


  // METODO MODIFICA ESPERIENZA
  modificaEsperienza(key: string, esperienzaModificata: Experience): void {
    this.esperienzeSrv.modificaEsperienza(key, esperienzaModificata)
      .then(() => {
        console.log('esperienza modificata con successo', esperienzaModificata);
      })
      .catch((error) => {
        console.error('esperienza non modificata con successo', error);
      });
  }



  // METODO ELIMINA ESPERIENZA
  eliminaEsperienza(key: string): void {
    this.esperienzeSrv.eliminaEsperienza(key)
      .then(() => {
        console.log('esperienza eliminata con successo');
      })
      .catch((error) => {
        console.error('errore durante l\'eliminazione dell\'esperienza', error);
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
