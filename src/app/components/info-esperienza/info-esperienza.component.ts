import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; // import di prova ❗
import { Experience } from 'src/app/models/experience.interface'; // importo l'interfaccia
import { EsperienzeService } from 'src/app/service/esperienze.service'; // importo il service

@Component({
  selector: 'app-info-esperienza',
  templateUrl: './info-esperienza.component.html',
  styleUrls: ['./info-esperienza.component.scss']
})
export class InfoEsperienzaComponent implements OnInit {
  esperienza: Experience = {
    key: '',
    genere: '',
    immagine: '',
    titolo: '',
    sottotitolo: '',
    descrizione: '',
    prezzo: 0,
    approfondimenti: '',
  };

  constructor(private route: ActivatedRoute, private esperienzeSrv: EsperienzeService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const key = params.get('key');
      if (key) {
        this.esperienzeSrv.getExperienceByKey(key).subscribe((experience) => {
          this.esperienza = experience;
        });
      }
    });
  }


}
