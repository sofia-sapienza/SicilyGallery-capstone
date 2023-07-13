import { Component, OnInit } from '@angular/core';
import { Experience } from 'src/app/models/experience.interface'; // importo l'interfaccia
import { EsperienzeService } from 'src/app/service/esperienze.service'; // importo il service
import { AuthService } from 'src/app/auth/auth.service'; // importo l'auth.service per gestire la visualizzazione degli elementi in base all'Admin

@Component({
  selector: 'app-relax',
  templateUrl: './relax.component.html',
  styleUrls: ['./relax.component.scss']
})
export class RelaxComponent implements OnInit {

  esperienze!: any[];
  esperienzeFiltrate: Experience[] = []; // inizializzo una variabile ti tipo: Interfaccia che mi riempirò con le esperienze filtrates
  modifica: string | null = null; // variabile che ci serve per la modalità modifica

  constructor(private esperienzeSrv : EsperienzeService, public authSrv: AuthService) { }

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

  ngOnInit(): void {
    this.esperienzeSrv.getEsperienze().subscribe((data) => {
      this.esperienze = data;
      this.filtraEsperienze();
    });
  }

  //METODO PER FILTRARE L'ESPERIENZA
  filtraEsperienze(): void {
    this.esperienzeFiltrate = this.esperienze.filter(
      (esperienza: Experience) => {
        return esperienza.genere === 'relax';
      }
    );
  }

  // METODO MODIFICA ESPERIENZA
  modificaEsperienza(key: string, esperienzaModificata: Experience): void {
    this.esperienzeSrv
      .modificaEsperienza(key, esperienzaModificata)
      .then(() => {
        console.log('esperienza modificata con successo', esperienzaModificata);
      })
      .catch((error) => {
        console.error('esperienza non modificata con successo', error);
      });
  }

  // METODO ELIMINA ESPERIENZA
  eliminaEsperienza(key: string): void {
    this.esperienzeSrv
      .eliminaEsperienza(key)
      .then(() => {
        console.log('esperienza eliminata con successo');
      })
      .catch((error) => {
        console.error("errore durante l'eliminazione dell'esperienza", error);
      });
  }

}

