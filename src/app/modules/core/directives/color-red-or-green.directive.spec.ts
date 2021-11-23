import { Component, DebugElement } from '@angular/core';
import { LogoComponent } from '../../bb-ui/components/logo/logo.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ColorRedOrGreenDirective } from './color-red-or-green.directive';
import { By } from '@angular/platform-browser';

@Component({
  template: `
    <div [appColorRedOrGreen]="0.01">green text</div>
    <div [appColorRedOrGreen]="-0.01">red text</div>
    <div [appColorRedOrGreen]="0">black text</div>
  `,
})
class TestComponent {}

describe('ColorRedOrGreenDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<LogoComponent>;
  let coloredElements: DebugElement[];

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [ColorRedOrGreenDirective, TestComponent],
    }).createComponent(TestComponent);

    fixture.detectChanges(); // initial binding

    // all elements with an attached ColorRedOrGreenDirective
    coloredElements = fixture.debugElement.queryAll(
      By.directive(ColorRedOrGreenDirective)
    );
  });

  it('should color a positive number green', () => {
    const colorRedOrGreenDirective = coloredElements[0].injector.get(
      ColorRedOrGreenDirective
    ) as ColorRedOrGreenDirective;
    expect(coloredElements[0].nativeElement.style.color).toBe(
      colorRedOrGreenDirective.greenColor
    );
  });

  it('should color a negative number red', () => {
    const colorRedOrGreenDirective = coloredElements[1].injector.get(
      ColorRedOrGreenDirective
    ) as ColorRedOrGreenDirective;
    expect(coloredElements[1].nativeElement.style.color).toBe(
      colorRedOrGreenDirective.redColor
    );
  });

  it('should not color number 0', () => {
    const colorRedOrGreenDirective = coloredElements[2].injector.get(
      ColorRedOrGreenDirective
    ) as ColorRedOrGreenDirective;
    expect(coloredElements[2].nativeElement.style.color).toBe('');
  });
});
