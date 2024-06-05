import {Component} from '@angular/core';
import {Brawler} from 'src/app/models/brawler';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent {
  public info: Brawler[];

  constructor(){
    this.info=[
      { 
      id:"",
      nombre:"NITA",
      rareza:"ESPECIAL",
      tipo:"DESTRUCTORA", 
      imagen:"https://www.chillbs.com/wp-content/uploads/2020/05/nita-oso-brawl-stars.png"
    },
    { 
      id:"",
      nombre:"BARLEY",
      rareza:"ESPECIAL",
      tipo:"ARTILLERIA",
      imagen:"https://www.chillbs.com/wp-content/uploads/2019/09/barley-brawl-stars.png"
    },
    { 
      id:"",
      nombre:"BO",
      rareza:"EPICO",
      tipo:"CONTROL",
      imagen:"https://www.brawlstarsdicas.com.br/wp-content/uploads/2017/06/bo-brawler-lose-animation-pose-brawl-stars.png"
    },
    ] 
  }
}
 




