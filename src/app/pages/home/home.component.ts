import { Component, OnInit } from '@angular/core';
import { PeliculaService } from '../../services/pelicula.service';
import { Movie } from '../../Models/Peliculas.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // Atributos de la clase
  moviesSliceShow:Movie[] = [];
  movies:Movie[] = [];
  
  // Constructor de la clase
  constructor( private peliculaService:PeliculaService) {
   }

  // Siclo de vida de angular onInit, Se ejecuta cuando se crea el component
  ngOnInit(): void {

    //Petición al service para obtener las peliculas, Controlador
    this.peliculaService.getPeliculas()
        .subscribe( data => {
          this.movies = data;
          this.moviesSliceShow = data;
          console.log(data);
        })    

  }

  

}
