import { Component, OnInit } from '@angular/core';
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
export class LoginComponent implements OnInit {

  public forma:FormGroup
  constructor( private fb:FormBuilder,
               private authService:AuthService,
               private router:Router,
               private auth:AngularFireAuth ) { 
    this.crearForm()
    if( localStorage.getItem('correo') ){
      console.log(JSON.parse(localStorage.getItem('correo')));
      this.forma.reset({
        correo: JSON.parse(localStorage.getItem('correo')),
        password: '',
        recordar: true
      })
    }
  }

  ngOnInit(): void {

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
      password : ['',[Validators.required, Validators.minLength(6)] ],
      recordar : ['']
    })
  }

  login( forma:FormGroup ){
    swal.fire({
      icon: 'info',
      allowOutsideClick: false,
      title: 'Cargando',
      text: 'Espere por favor...'
    })
    swal.showLoading();

    if( forma.invalid ){
      swal.fire({
        title:'Los campos no son correctos',
        icon :'error'
      })
      return Object.values( this.forma.controls ).forEach( control => control.markAsTouched());
    }
  
    if( forma.value.recordar == true ){
      localStorage.setItem('correo', JSON.stringify( forma.value.correo ) );
    } else {
      localStorage.removeItem('correo');
    }
    swal.fire({
      title:'Ingreso con exito',
      text : 'Bienvenido',
      icon :'success'
    })

  }

  logInExternal( provider:string ){
    this.authService.login( provider )
    .then( data => {
      this.router.navigateByUrl('/home')
      localStorage.removeItem('correo');
      console.log('data:',data);
      this.authService.guardarToken(data.credential.accessToken)
    })
    .catch(err => {
      if (err.email && err.credential && err.code === 'auth/account-exists-with-different-credential') {
          swal.fire({
            icon:'error',
            title:'Error',
            text: 'Ya existe una cuenta con este correo'
          })
      } else {
        console.log(err);
        this.router.navigate(['home'])
      }
    })
  }
}


