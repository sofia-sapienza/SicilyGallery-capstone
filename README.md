# :it: Sicily Gallery - Capstone Project

Ho pensato a Sicily Gallery come una guida turistica intuitiva e completa che permette di scoprire le meraviglie dell'isola Siciliana. Con quest'app potrai esplorare facilmente i migliori ristoranti, le impedibili escursioni e le incatevoli spiaggie della Sicilia.

## Caratteristiche principali

- :fork_and_knife: Ristoranti: Trova i migliori ristoranti tradizionali, locali nascoti e ristoranti gourmet in tutta l'isola. Scopri le specialità culinarie siciliane e prenota il tuo tavolo.
- :volcano: Escursioni: Pianifica avventure emozionanti attraverso i paesaggi mozzafiato della Sicilia. 
- :beach_umbrella: Spiaggie: Trova le spiaggie più belle e suggestive in tutta la Sicilia. Scopri le caratteristiche di ogni spiaggia e ottieni indicazioni precise per raggiungerle.

:bust_in_silhouette: **Gestione delle Esperienze (solo per gli admin):** Gli utenti admin hanno la possibilità di gestire le esperienze turistiche. Possono aggiungere, modificare ed eliminare ristoranti, escursioni e spiagge dall'app per assicurare che le informazioni siano sempre aggiornate e pertinenti.

Sicily Gallery ti offre una panoramica completa delle attrazioni più interessanti dell'isola, consentendoti di pianificare al meglio la tua visita e sfruttare al massimo la tua esperienza in Sicilia.

## Installazione

Questo progetto è stato generato con [Angular CLI](https://github.com/angular/angular-cli) version 14.2.11. quindi prima di iniziare assicurati di aver installato anche **Node.js** sul tuo sistema.

- Clona questa repository sul tuo computer utilizzando il seguente comando:
`git clone https://github.com/sofia-sapienza/sicily-gallery.git`.
 Per rendere l'operazione più veloce puoi eseguire il comando direttamente nel terminale di Visual Studio Code, aprendo prima la cartella dove vuoi che venga clonata la repository.

- Per installare tutti le dipende necessarie affinché il progetto funzioni esegui il comando:
`npm install`
In particolare, come dipendenze esterne verranno installate:
```
"@angular/fire": "^7.6.1",
"@angular/localize": "^14.2.0",
"@ng-bootstrap/ng-bootstrap": "^13.0.0",
"firebase": "^9.22.2"
```
in quanto per il database mi sono appoggiata al sistema di *Realtime Database* offerto da Firebase e per l'autenticazione degli untenti al suo sistema di *Authentication*,
ho ulitizzato ng-boostrap per far collassare correttamente la navbar sui dispositivi mobile.

- Per avviare l'applicazione in modalità di sviluppo locale esegui il comando:
`ng serve`
Apri il tuo browser e visita http://localhost:4200/. L'applicazione verrà caricata automaticamente e dovresti essere pronto per esplorare le meraviglie della Sicilia con Sicily Gallery!




## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
