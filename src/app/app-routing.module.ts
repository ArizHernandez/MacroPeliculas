import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { SignupComponent } from './pages/signup/signup.component';
import { PeliculaComponent } from './pages/pelicula/pelicula.component';
import { AuthGuard } from './guards/auth-guard.guard';
import { SearchComponent } from './pages/search/search.component';

const routes:Routes = [
  { path:'login', component:LoginComponent},
  { path:'signup', component:SignupComponent},
  { path:'home', component:HomeComponent, canActivate: [AuthGuard] },
  { path:'pelicula/:id', component: PeliculaComponent},
  { path:'search/:pelicula', component: SearchComponent},
  { path:'**', pathMatch:'full', redirectTo:'/home'}
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot( routes, { useHash: true } )
  ],
  exports:[
    RouterModule
  ]
})
export class AppRoutingModule { }
