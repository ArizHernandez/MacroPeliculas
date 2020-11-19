import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DatoUsuario, RentaResponse } from '../Models/Renta.model';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RentarPeliculaService {

  url:string = environment.url;

  constructor( private http:HttpClient ){}

  // Ralizar una petición para obtener el historial
  getRentas( usuarioUid:string ) {
    return this.http.get(`${ this.url }/api/historial/${ usuarioUid }`)
              .pipe(
                catchError( err => of() )
              );
  }


  // Realizar una renta
  nuevaRenta( id:string, rentaInfo:DatoUsuario ){
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');


    return this.http.post(`${this.url}/api/rentar/${id}`, rentaInfo, {headers} )
  }

  actualizarRenta(id: string, rentaInfo) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return this.http.put(`${this.url}/api/rentar/${id}`, rentaInfo, {headers})
  }

}
