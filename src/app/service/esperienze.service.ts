import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database'; // importo il database che ho su Firebase
import { Experience } from 'src/app/models/experience.interface'; // importo l'interfaccia
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EsperienzeService {
  constructor(private firedatabase: AngularFireDatabase) {}

  //METODO CHE RECUPERA LA LISTA DI ESPERIENZE NEL NOSTRO DB DI FIREBASE
  getEsperienze(): Observable<any[]> {
    return this.firedatabase.list('esperienze').valueChanges();
  }

   // Metodo per recuperare un'esperienza specifica in base alla chiave
   getExperienceByKey(key: string): Observable<Experience> {
    // Utilizza il metodo object() di AngularFireDatabase per ottenere un riferimento al percorso Firebase dell'esperienza
    const experienceRef = this.firedatabase.object(`/esperienze/${key}`);

    // Utilizza il metodo valueChanges() sull'oggetto di riferimento per ottenere i dati come osservabile
    return experienceRef.valueChanges() as Observable<Experience>;
  }

  //METODO CHE PERMETTE DI AGGIUNGERE LE ESPERIENZE
  addEsperienza(esperienza: Experience): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const ref = this.firedatabase.list('esperienze').push(esperienza);
      ref
        .then((item) => {
          if (item.key !== null) {
            //verifichiamo se la chiave generata dall'operazione di push non è null
            esperienza.key = item.key; //viene assegnata alla proprietà key dell'oggetto 'esperienza
            item.update(esperienza).then(() => {
              console.log('esperienza aggiunta con successo', esperienza);
              alert('Esperienza aggiunta con successo!');
              resolve();
            });
          }
        })
        .catch((error) => {
          console.error('esperienza NON aggiunta con successo', error);
          alert('Esperienza non aggiunta con successo :(');
          reject();
        });
    });
  }

  //METODO MODIFICA ESPERIENZE
  modificaEsperienza(
    // passo come parametri al metodo le key e l'oggetto
    key: string,
    esperienzaModificata: Experience
  ): Promise<void> {
    return this.firedatabase
      .object(`esperienze/${key}`) //viene utilizzato il metodo object() specifico di Firebase per ottenere un riferimento all'oggetto speficico
      .update(esperienzaModificata) // viene utilizzato il metodo update() specidico di Firebase per aggiornare l'oggetto del database con i valori forniti
      .then(() => {
        console.log('esperienza modificata con successo', esperienzaModificata);
        alert('Esperienza modificata con successo!');
      })
      .catch((error) => {
        console.error('esperienza NON modificata con successo', error);
        alert('Esperienza non modificata con successo :(');
      });
  }

  //METODO ELIMINA ESPERIENZA
  eliminaEsperienza(key: string): Promise<void> {
    return this.firedatabase.object(`esperienze/${key}`).remove();
  }
}
