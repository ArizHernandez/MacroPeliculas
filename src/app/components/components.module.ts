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

@NgModule({
  // La declaración de nuestros componentes
  declarations: [
    NavbarComponent,
    PeliculasCardComponent,
    SlideShowComponent,
    CastSlideComponent,
  ],
  // Importaciones de los modulos que vamos a utilizar 
  imports: [
    CommonModule,
    MaterialModule,
    AppRoutingModule,
    RatingModule,
    PipesModule
  ],
  // Exportar los components de nuestro modulo
  exports: [
    NavbarComponent,
    PeliculasCardComponent,
    SlideShowComponent,
    CastSlideComponent
  ]
})
export class ComponentsModule { }
