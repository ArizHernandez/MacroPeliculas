import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent{

  forma:FormGroup
  constructor( private fb:FormBuilder,
               private auth:AuthService ) { 
    this.crearFormulario()
  }
  
  // Validar si el usuario es valido 
  get correoInvalido( ){
    return this.forma.controls.correo.invalid && this.forma.controls.correo.touched
  }

  get passwordInvalido(){
    return this.forma.controls.password.invalid && this.forma.controls.password.touched
  }

  // Crear formulario
  crearFormulario(){
    this.forma = this.fb.group({
      correo  : ['',[ Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$') ]],
      password: ['',[ Validators.required, Validators.minLength(8) ]],
      recordar: ['']
    })
  }

  // Registrarse
  sigIn( forma:FormGroup ){
    const correo   = forma.value.correo
    const password = forma.value.password
    this.forma.markAllAsTouched();

    if( forma.value.recordar == true ){

      localStorage.setItem('correo', JSON.stringify( forma.value.correo ) );

    } else {
      localStorage.removeItem('correo');
    };

    if( forma.valid ){
      this.auth.sigIn( correo,password )
        .then( resp => {

          swal.fire({
            icon:'success',
            title: 'Usuario registrado'
          });

        })
        .catch( err => {

          swal.fire({
            icon:'error',
            title: err.code,
            text: err.message
          });

        })
    } else {

      swal.fire({
        icon:'error',
        title: 'Los campos no son correctos'
      })

    }
  }

}
