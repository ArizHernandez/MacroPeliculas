import { NgModule } from '@angular/core';
import { ImgFillPipe } from './img-fill.pipe';
import { TraileFillPipe } from './traile-fill.pipe';



@NgModule({
  declarations: [
    ImgFillPipe,
    TraileFillPipe
  ],
  exports:[
    ImgFillPipe,
    TraileFillPipe
  ],
  imports: []
})
export class PipesModule { }
