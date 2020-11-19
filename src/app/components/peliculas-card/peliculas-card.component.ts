import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from '../../Models/Peliculas.model';

@Component({
  selector: 'app-peliculas-card',
  templateUrl: './peliculas-card.component.html',
  styleUrls: ['./peliculas-card.component.css']
})
export class PeliculasCardComponent {

  //Recibe un parametro el cual le asignara un valor a nuestra variable movies que es tipo Movie
  @Input() movies:Movie[] = []

  constructor( private router:Router ) { }

  // Redirrecciónar a la pagina de la pelicula seleccionada
  verPelicula( idPelicula ){
    this.router.navigate(['pelicula',idPelicula])
  }

}
