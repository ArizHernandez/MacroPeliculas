import { Component, Input } from '@angular/core';
import { DatoUsuario } from '../../Models/Renta.model';

@Component({
  selector: 'app-historial-card',
  templateUrl: './historial-card.component.html',
  styleUrls: ['./historial-card.component.css']
})
export class HistorialCardComponent {

  @Input() historial:DatoUsuario[];

  constructor() { 
    setTimeout(esp => console.log( this.historial ), 2000);

  }


}
