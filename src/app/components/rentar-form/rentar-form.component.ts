import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import swal from 'sweetalert2';

@Component({
  selector: 'app-rentar-form',
  templateUrl: './rentar-form.component.html',
  styleUrls: ['./rentar-form.component.css']
})
export class RentarFormComponent {

  forma:FormGroup;

  constructor(public dialogRef: MatDialogRef<RentarFormComponent>,
              @Inject(MAT_DIALOG_DATA) public data,
              private fb:FormBuilder) {
      this.crearForm();
    }

    get nombreInvalido(){
      return this.forma.controls.nombre.invalid && this.forma.controls.nombre.touched
    }
    get direccionInvalido(){
      return this.forma.controls.direccion.invalid && this.forma.controls.direccion.touched
    }
    get fechaInicioInvalido(){
      return this.forma.controls.start.invalid && this.forma.controls.start.touched
    }
    get fechaFinInvalido(){
      return this.forma.controls.end.invalid && this.forma.controls.end.touched
    }

    crearForm(){
      this.forma = this.fb.group({
        nombre:    ['', [Validators.required, Validators.minLength(10)]],
        direccion: ['', [Validators.required, Validators.minLength(15)]],
        precio:    [ 320 ],
        start:     ['', Validators.required],
        end:       ['', Validators.required],
      });
    }

  completarRenta( form:FormGroup ){

    this.forma.markAllAsTouched();

    if( form.valid ){
      this.dialogRef.close( form.value );

    } else {

      swal.fire({
        icon:'error',
        title:'Complete el formulario, por favor'
      })

    }
  }

  cancelar(){
    this.dialogRef.close();
  }

}
