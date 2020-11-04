import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  forma:FormGroup
  constructor( private fb:FormBuilder ) { 
    this.crearFormulario()
  }

  ngOnInit(): void {
  }

  crearFormulario(){
    this.forma = this.fb.group({
      nombre  : ['',[ Validators.required, Validators.minLength(5)]],
      apellido: [''],
      correo  : ['',[ Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$') ]],
      password: ['',[ Validators.required, Validators.minLength(5) ]]
    })
  }

}
