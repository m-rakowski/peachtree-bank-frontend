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
  @Input() appColorRedOrGreen?: number;

  redColor: string = 'rgb(222, 0, 0)';
  greenColor: string = 'rgb(0, 180, 0)';

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngOnChanges(): void {
    if (this.appColorRedOrGreen) {
      if (this.appColorRedOrGreen < 0) {
        this.renderer.setStyle(this.el.nativeElement, 'color', this.redColor);
      } else {
        this.renderer.setStyle(this.el.nativeElement, 'color', this.greenColor);
      }
    }
  }
}
