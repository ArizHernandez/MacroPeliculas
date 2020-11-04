import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import Swiper from 'swiper';
import { Cast } from '../../Models/Cast.model';

@Component({
  selector: 'app-cast-slide',
  templateUrl: './cast-slide.component.html',
  styleUrls: ['./cast-slide.component.css']
})
export class CastSlideComponent implements OnInit, AfterViewInit {

  @Input() actores:Cast
  swiper:Swiper

  constructor() { }

  ngOnInit(): void {
  }

  // Avanzar el slide
  next(){
    this.swiper.slideNext();
  }

  // Retroceder el slide
  prev(){
    this.swiper.slidePrev();
  }

  //Cargar el swiper e ingresar sus configuraciónes
  ngAfterViewInit(){
    this.swiper = new Swiper('.swiper-container',{
      freeMode:true,
      spaceBetween:10,
      breakpoints:{
        // Breakpoint si el tamaño es >= 320px (Smartphone pequeño)
        320: {
          slidesPerView: 1
        },
        // Breakpoint si el tamaño es >= 768px (Smartphone grande)
        768:{
          slidesPerView: 2.3
        },
        // Breakpoint si el tamaño es >= 1025px (Tablet pequeño)
        1024: {
          slidesPerView: 3.3
        },
        // Breakpoint si el tamaño es >= 1200px (Tablet grande - Desktop)
        1200:{
          slidesPerView: 4.3
        },
        2560:{
          slidesPerView: 5.3
        }
      }
    })
  }

}
