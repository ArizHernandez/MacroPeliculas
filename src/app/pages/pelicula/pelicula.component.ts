import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PeliculaService } from '../../services/pelicula.service';
import { Location } from '@angular/common';

import { MatDialog } from '@angular/material/dialog';

import { Cast } from '../../Models/Cast.model';
import { AuthService } from '../../services/auth.service';
import { RentarFormComponent } from '../../components/rentar-form/rentar-form.component';
import { PeliculaResponse } from '../../Models/Pelicula.model';
import { RentarPeliculaService } from '../../services/rentar-pelicula.service';
import { RentaResponse } from '../../Models/Renta.model';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrls: ['./pelicula.component.css']
})
export class PeliculaComponent {

  //Atributos de la clase
  peliculaId:string;
  videoURL:string = 'https://www.youtube.com/embed/';
  trailerLink:string = '';
  actores:Cast[] = [];
  pelicula:PeliculaResponse;
  historial:RentaResponse;

  //Constructor
  constructor(private peliculaService :PeliculaService,
              private route           :ActivatedRoute,
              private router          :Router,
              private location        :Location,
              private dialog          :MatDialog,
              private authService     :AuthService,
              private rentarService   :RentarPeliculaService) {

    //Obtener el id de la ruta
    route.params.subscribe( ruta => this.peliculaId = ruta.id )

    //Hacer la petición para obtener la información de la pelicula
    peliculaService.getPelicula( this.peliculaId )
      .subscribe( resp => this.pelicula = resp );

    //Hacer la petición para obtener el cast de la pelicula
    peliculaService.getCast(this.peliculaId)
      .subscribe( resp => this.actores = resp );

    //Petición para obtener el trailer
    peliculaService.getTrailer( this.peliculaId )
      .subscribe(resp => !resp ? peliculaService.getTrailerEn(this.peliculaId).subscribe(resp => this.trailerLink = resp.key) : this.trailerLink = resp.key );
  }

  //Metodo de la clase
  regresar(){
    this.location.back();
  }

  rentar(){
    const id = JSON.parse( localStorage.getItem('id') );
    const dialogRef = this.dialog.open(RentarFormComponent,{
      width:'300px'
    })

    dialogRef.afterClosed()
             .subscribe( result => {

              if( result ){
                const data = {
                  "nombre":          result.nombre,
                  "nombre_pelicula": this.pelicula.title,
                  "direccion":       result.direccion,
                  "url":             `https://image.tmdb.org/t/p/w500${ this.pelicula.poster_path }`,
                  "precio":           result.precio,
                  "fecha_inicio":     result.start,
                  "fecha_fin":        result.end,
                 }

                 this.rentarService.getRentas( id ).subscribe( (resp:any) => {
                  if('exist' in resp) {
                    return this.rentarService.nuevaRenta(id, data).subscribe( resp => console.log(resp) );

                  } else {
                    const nuevoHistorial = resp.datos;
                    nuevoHistorial.push( data );

                    const compras = { "datos": nuevoHistorial };
                    
                    this.rentarService.actualizarRenta(id,compras).subscribe( resp => console.log(resp) );
                  }
                });
              }

             })
  }


}
