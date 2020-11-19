import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RentarPeliculaService } from '../../services/rentar-pelicula.service';
import { DatoUsuario } from '../../Models/Renta.model';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {

  usuarioUid:string;
  historial:DatoUsuario[] = [];

  constructor( private rentarPeliculaService:RentarPeliculaService,
               private route:ActivatedRoute ) { 

      route.params.subscribe( resp => {
        this.usuarioUid = resp.usuarioId;
      });

      this.getCompras( this.usuarioUid );
    }

  ngOnInit(): void {
  }

  getCompras( id:string ){
    this.rentarPeliculaService.getRentas( id )
              .subscribe( (resp:any) => {
                console.log( resp );
                !resp ? null : this.historial = resp.datos;
              })
  }

}
