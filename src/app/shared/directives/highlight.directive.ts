import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {
  @HostListener('mouseenter') onMouseEnter(){

    //this.elementRef.nativeElement.style.fontSize = '200%';
  }

  @HostListener('mouseleave') onMouseLeave(){
    //this.elementRef.nativeElement.style.fontSize = '100%';
  }

  constructor(
    private elementRef: ElementRef
  ) {
    //this.elementRef.nativeElement.style.backgroundColor = 'red';
  }

}
