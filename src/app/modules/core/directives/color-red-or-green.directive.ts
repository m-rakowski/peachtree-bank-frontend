import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appColorRedOrGreen]',
})
export class ColorRedOrGreenDirective implements OnChanges {
  @Input() appColorRedOrGreen: any;
  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngOnChanges(): void {
    console.log('on cha');
    if ((this.appColorRedOrGreen + '').includes('-')) {
      this.renderer.setStyle(this.el.nativeElement, 'color', '#de0000');
    } else {
      this.renderer.setStyle(this.el.nativeElement, 'color', '#00b400');
    }
  }
}
