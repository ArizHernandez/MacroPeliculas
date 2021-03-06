import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from '../app-routing.module';

import { PeliculasCardComponent } from './peliculas-card/peliculas-card.component';
import { SlideShowComponent } from './slide-show/slide-show.component';
import { NavbarComponent } from './navbar/navbar.component';

import { MaterialModule } from '../material.module';
import { PipesModule } from '../pipes/pipes.module';
import { RatingModule } from 'ng-starrating';
import { CastSlideComponent } from './cast-slide/cast-slide.component';
import { HistorialCardComponent } from './historial-card/historial-card.component';
import { RentarFormComponent } from './rentar-form/rentar-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  // La declaración de nuestros componentes
  declarations: [
    NavbarComponent,
    PeliculasCardComponent,
    SlideShowComponent,
    CastSlideComponent,
    HistorialCardComponent,
    RentarFormComponent,
    FooterComponent,
  ],
  // Importaciones de los modulos que vamos a utilizar 
  imports: [
    CommonModule,
    MaterialModule,
    AppRoutingModule,
    RatingModule,
    PipesModule,
    ReactiveFormsModule
  ],
  // Exportar los components de nuestro modulo
  exports: [
    NavbarComponent,
    PeliculasCardComponent,
    SlideShowComponent,
    CastSlideComponent,
    HistorialCardComponent,
    FooterComponent,
  ]
})
export class ComponentsModule { }
