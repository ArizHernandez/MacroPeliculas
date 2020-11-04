import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from '../app-routing.module';

import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

import { ComponentsModule } from '../components/components.module';
import { MaterialModule } from '../material.module';
import { PeliculaComponent } from './pelicula/pelicula.component';
import { PipesModule } from '../pipes/pipes.module';
import { SearchComponent } from './search/search.component';




@NgModule({
  declarations: [
    LoginComponent, 
    HomeComponent, 
    SignupComponent, 
    PeliculaComponent, 
    SearchComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    MaterialModule,
    AppRoutingModule,
    ReactiveFormsModule,
    PipesModule,
  ],
  exports:[
    LoginComponent, 
    HomeComponent,
    PeliculaComponent
  ]
})
export class PagesModule { }
