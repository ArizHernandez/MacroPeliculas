import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app'
import { Usuario } from '../Models/usuario.models';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //Propiedades de nuestra clase
  public usuario:Usuario = {}; //usuario es de tipo Usuario
  private userToken:string;
  
  //Constructor de la clase
  constructor( private auth:AngularFireAuth,
                private router:Router ) { 

    //Verificamos el estado del usuario
    this.auth.authState.subscribe(user => {
          //Si no se esta haciendo la autenticación del usuario
      if(!user){
        return; //No retorna nada
      } 
      this.usuario.nombre = user.displayName;
      this.usuario.correo = user.email;
      this.usuario.uid = user.uid;
    })
  }
  
  guardarToken(token){
    localStorage.setItem('AccessToken',JSON.stringify(token))
  }

  //Metodo para loguearse
  login( provider:string){
    if( provider == 'google'){
      return this.auth.signInWithPopup( new auth.GoogleAuthProvider() ); //Enseña el popup del login seleccionado
    } 
    else if ( provider == 'facebook'){
      return this.auth.signInWithPopup( new auth.FacebookAuthProvider() );
    }
    else if ( provider == 'twitter'){
      return this.auth.signInWithPopup( new auth.TwitterAuthProvider() );
    }
  }

  //Metodo para cerrar sesión
  logOut(){
    this.borrarToken();
    this.usuario = {};
    this.auth.signOut();
    this.router.navigateByUrl('/login');
  }

  borrarToken(){
    localStorage.removeItem('AccessToken');
    this.userToken = ''
  }

  leerToken(){
    if(localStorage.getItem('AccessToken')){
      this.userToken = JSON.parse(localStorage.getItem('AccessToken'));
    } else {
      this.userToken = '';
    }

    return this.userToken;
  }

  estaAutenticado():boolean{
    this.leerToken()
    if ( this.userToken.length > 2 ){
      return true
    } else {
      return false
    }
  }
}
