import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appDynamicTabAnchor]',
})
export class DynamicTabAnchorDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
