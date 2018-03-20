import { Directive, ElementRef, Input, HostListener, Renderer } from '@angular/core';
//import {Color} from 'color';

@Directive({
  selector: '[appSetAttribute]'
})
export class SetAttributeDirective {
  @Input() dirColor: string;
  @Input() dirBackgroundColor: string;
  @Input() dirBackgroundColorAlpha: string;
  @Input() dirHover: boolean; 
  constructor(private el: ElementRef) {
    // el.nativeElement.style.backgroundColor = this.icolor;
    //this.render.setElementStyle(this.el.nativeElement, 'color', "yellow");
  }
  ngOnInit() {
    this.el.nativeElement.style.backgroundColor = this.dirBackgroundColor;
    this.el.nativeElement.style.color = this.dirColor;   

    // this.BackgroundColor = '800080';

    // var decimalPlus15 = this.toDecimal(this.BackgroundColor) + 50;
    //  this.BackgroundColor = this.toHex(decimalPlus15)
    if (this.dirBackgroundColorAlpha != null) {
      var h = this.hexToRgbA(this.dirBackgroundColorAlpha);
      this.el.nativeElement.style.backgroundColor = h;
    }
    //  this.el.nativeElement.style.backgroundColor  =  h;// 'rgba(255,255,0,0.5)';
  }
  @HostListener('mouseenter') onMouseEnter() {
    if (this.dirBackgroundColor != null && this.dirHover) {
      var h = this.hexToRgbA(this.dirBackgroundColor);
      this.el.nativeElement.style.backgroundColor = h;
    }
  }
  @HostListener('mouseleave') onMouseLeave() {
    this.el.nativeElement.style.backgroundColor = this.dirBackgroundColor;
  }

  // toHex(decimalNum){return decimalNum.toString(16); }
  // toDecimal(hexString){return parseInt(hexString, 16);; }

  hexToRgbA(hex) {
    var c;
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
      c = hex.substring(1).split('');
      if (c.length == 3) {
        c = [c[0], c[0], c[1], c[1], c[2], c[2]];
      }
      c = '0x' + c.join('');
      return 'rgba(' + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') + ',0.5)';
    }
    throw new Error('Bad Hex');
  }


}
