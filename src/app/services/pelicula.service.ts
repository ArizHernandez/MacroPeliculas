import { Injectable } from '@angular/core';
import { PeliculasResponse, Movie } from '../Models/Peliculas.model';

import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs';
import { Cast, CastResponse } from '../Models/Cast.model';
import { TrailerResponse, Result } from '../Models/Trailer.model';
import { PeliculaResponse } from '../Models/Pelicula.model';

@Injectable({
  providedIn: 'root'
})
export class PeliculaService {

  //Atributos
  private url = 'https://api.themoviedb.org/3/';
  private key = 'baa9c30d23a4f97a482922709ae18b1f'
  private page: number = 1;
  
  private params = {
    api_key: this.key,
    language:'es-MX',
    page: String(this.page)
  }

  constructor( private http:HttpClient ) { }

  //Metodo para obtener el cataloco de peliculas
  getPeliculas():Observable<Movie[]>{
    return this.http.get<PeliculasResponse>(`${this.url}movie/popular?`,{
                params: this.params
              })
              .pipe(
                map( resp => resp.results )
              )
  }

  //Obtener información de la pelicula
  getPelicula( peliculaId ):Observable<PeliculaResponse>{
    const params = {
      ...this.params, 
      page: '1'
    }
  
    return this.http.get<PeliculaResponse>(`${this.url}movie/${peliculaId}`,{
      params
    })
  }

  // obtener trailer
  getTrailer( pelicualId ):Observable<Result>{
    const params = {
      ...this.params,
      page: '1'
    }

    return this.http.get<TrailerResponse>(`${this.url}movie/${pelicualId}/videos`,{
      params
    }).pipe(
      map( resp => {
        return resp.results[0]
      })
    );
  }

  getTrailerEn( pelicualId ):Observable<Result>{
    const params = {
      ...this.params,
      language:'en-EN',
      page: '1'
    }

    return this.http.get<TrailerResponse>(`${this.url}movie/${pelicualId}/videos`,{
      params
    }).pipe(
      map( resp => {
        return resp.results[0]
      })
    );
  }
  
  //Obtener el cast
  getCast( peliculaId ):Observable<Cast[]>{
    return this.http.get<CastResponse>(`${this.url}movie/${peliculaId}/credits?api_key=${this.key}`)
            .pipe(
              map( resp => resp.cast )
            )
  }

  //Buscar una pelicula
  buscarPelicula(nombre):Observable<Movie[]>{
    const params = {
      ...this.params,
      query: nombre
    }

    return this.http.get<PeliculasResponse>('https://api.themoviedb.org/3/search/movie',{
      params
    }).pipe(
      map((resp:PeliculasResponse) => {
        return resp.results
      })
    )
  }

}
