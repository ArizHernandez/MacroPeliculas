import { Component} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PeliculaService } from '../../services/pelicula.service';
import { Location } from '@angular/common';
import { TrailerResponse} from '../../Models/Trailer.model';
import Swiper from 'swiper';
import { Cast } from '../../Models/Cast.model';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrls: ['./pelicula.component.css']
})
export class PeliculaComponent  {

  //Atributos de la clase
  peliculaId:string
  videoURL:string = 'https://www.youtube.com/embed/'
  trailerLink:string = ''
  actores:Cast[] = []
  pelicula
  private swipper:Swiper

  //Constructor
  constructor(private peliculaService:PeliculaService,
              private route:ActivatedRoute,
              private router:Router,
              private location:Location) {

    //Obtener el id de la ruta
    route.params.subscribe( ruta => this.peliculaId = ruta.id )

    //Hacer la petición para obtener la información de la pelicula
    peliculaService.getPelicula( this.peliculaId )
      .subscribe( resp => {
        this.pelicula = resp
        console.log(this.pelicula);
      })

    //Hacer la petición para obtener el cast de la pelicula
    peliculaService.getCast(this.peliculaId)
      .subscribe( resp =>{
        console.log(resp);
        this.actores = resp
      })

    //Petición para obtener el trailer
    peliculaService.getTrailer( this.peliculaId )
      .subscribe( resp => {
        console.log(resp.key)
        return this.trailerLink = resp.key
      });

    //Validar si se obtuvo el link del trailer, en tal cazo que no se obtenga el link se hace la petición al trailer en ingles
    console.log(this.trailerLink);
    if( this.trailerLink == '' ){
      peliculaService.getTrailerEn( this.peliculaId )
      .subscribe( resp => {
        return this.trailerLink = resp.key
      })
    }  

   }
  
  //Metodo de la clase
  regresar(){
    this.location.back();
  }


}
