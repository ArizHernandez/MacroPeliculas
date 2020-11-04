import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Pipe({
  name: 'traileFill'
})
export class TraileFillPipe implements PipeTransform {
  
  constructor(private _domSanitazer:DomSanitizer){

  }

  transform(link: string):SafeResourceUrl {
    
    return this._domSanitazer.bypassSecurityTrustResourceUrl(link);
    
  }

}
