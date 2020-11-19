import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {

  public forma:FormGroup
  constructor( private fb:FormBuilder,
               private authService:AuthService,
               private router:Router,
               private auth:AngularFireAuth){

    this.crearForm();

    if( localStorage.getItem('correo') ){

      console.log( JSON.parse(localStorage.getItem('correo')) );

      this.forma.reset({
        correo: JSON.parse(localStorage.getItem('correo')),
        password: '',
        recordar: true
      }); 
    }

  }

  get correoInvalido(){
    return ( this.forma.controls.correo.invalid && this.forma.controls.correo.touched)
  }

  get passwordInvalida(){
    return ( this.forma.controls.password.invalid && this.forma.controls.password.touched )
  }

  crearForm(){

    this.forma = this.fb.group({
      correo   : ['',[Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')] ],
      password : ['',[Validators.required, Validators.minLength(8)] ],
      recordar : ['']
    })

  }

  login( forma:FormGroup ){

    const correo = forma.value.correo;
    const password = forma.value.password;
    
    forma.markAllAsTouched();
    
    swal.fire({
      icon: 'info',
      allowOutsideClick: false,
      title: 'Cargando',
      text: 'Espere por favor...'
    })
    swal.showLoading();

    if( forma.valid ){

      //Guardar correo en localStorage
      if( forma.value.recordar == true ){

        localStorage.setItem('correo', JSON.stringify( forma.value.correo ) );

      } else {

        localStorage.removeItem('correo');

      }

      //Logearse
      this.authService.loginCorreo( correo, password )
        .then( resp => {

        this.authService.guardarToken( resp.user.refreshToken, resp.user.uid );

        this.router.navigateByUrl('/home');

          //Mensaje de completado
          swal.fire({
            icon : 'success',
            title: 'Ingreso con exito',
            text : 'Bienvenido'
          });

        })
        .catch( err => {
          console.log(err);
          swal.fire({
            icon : 'error',
            title: err.code,
            text : err.message
          })
        });
        
      } else {
        swal.fire({
          title:'Los campos no son correctos',
          icon :'error'
        })
      }
  }

  logInExternal( provider:string ){

    this.authService.login( provider )
      .then( (data:any) => {  

        localStorage.removeItem('correo');
        this.authService.guardarToken(data.credential.accessToken, data.user.uid );

        this.router.navigateByUrl('/home');

      })
      .catch(err => {

        if (err.email && err.credential && err.code === 'auth/account-exists-with-different-credential') {
            
          swal.fire({
            icon:'error',
            title:'Error',
            text: 'Ya existe una cuenta con este correo'
          });

        } else {

          this.router.navigate(['home']);
        }
      })
  }


}