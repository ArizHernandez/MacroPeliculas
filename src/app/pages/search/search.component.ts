import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from '../../Models/Peliculas.model';
import { PeliculaService } from '../../services/pelicula.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  peliculaId:string;
  buscarId:string;
  peliculas:Movie[] = [];
  forma:FormGroup;
  buscando:boolean = true;

  constructor( private peliculaService:PeliculaService,
               private activatedRoute:ActivatedRoute,
               private router:Router,
               private fb:FormBuilder ) {
    this.crearForm();

    activatedRoute.params.subscribe( param => {
      
      this.peliculaId = param.pelicula
      if( this.peliculaId !== 'buscar'){
        peliculaService.buscarPelicula( this.peliculaId )
          .subscribe( resp => {
            console.log(resp);
            this.peliculas = resp
            this.buscando = false;
          })
      }
    });

   }

  ngOnInit(): void {
  }

  crearForm(){
    this.forma = this.fb.group({
      pelicula: ['']
    })
  }
  
  buscar( forma:FormGroup ){
    console.log(forma.value.pelicula);
    this.buscarId = forma.value.pelicula;
    
    if( this.buscarId.trim() === ''){
      return;
    }

    this.router.navigate(['search', forma.value.pelicula])
  }
}
