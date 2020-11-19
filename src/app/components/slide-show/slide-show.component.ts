import { AfterViewInit, Component, Input } from '@angular/core';
import Swiper from 'swiper';
import { Movie } from '../../Models/Peliculas.model';


@Component({
  selector: 'app-slide-show',
  templateUrl: './slide-show.component.html',
  styleUrls: ['./slide-show.component.css']
})
export class SlideShowComponent implements AfterViewInit {

  //Recibe un parametro el cual le asignara un valor a nuestra variable peliculas que es un arreglo de Movie
  @Input() peliculas:Movie[] = [];
  private mySwiper:Swiper; //Se define el metodo mySwiper de tipo Swiper

  constructor() {}

  //Ciclo de vida de angular afterViewInit, este codigo se ejecuta despues de cargar toda la pagina
  ngAfterViewInit(): void {
    
    //Creo un nuevo slider con la propiedad de loop
    this.mySwiper = new Swiper('.swiper-container', {
      loop: true,
    });

  }
  
  //Mostrar el siguiente slider
  onSlideNext(){

    console.log('siguiente');
    this.mySwiper.slideNext(100);

  }
  
  //Mostrar el anterior slider
  onSlidePrev(){

    this.mySwiper.slidePrev();
    
  }

}
