import { Directive, HostListener } from '@angular/core';
import { Location } from '@angular/common';

@Directive({
  selector: '[goBackBtn]'
})
export class GoBackDirective {
  constructor(private location: Location) { }

  @HostListener('click')
  onClick() {
    this.location.back();
    return false
  }
}
