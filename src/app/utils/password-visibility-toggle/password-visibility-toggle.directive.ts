import { AfterViewInit, ApplicationRef, ComponentFactoryResolver, Directive, ElementRef, Injectable, InjectFlags, Injector, OnInit, ProviderToken, Renderer2, ViewContainerRef } from '@angular/core';
import { NbIconComponent } from '@nebular/theme';

@Directive({
  selector: '[passwordVisibilityToggle]'
})
export class PasswordVisibilityToggleDirective implements OnInit{

  constructor(private elRef: ElementRef, 
              private renderer: Renderer2,
              private viewContainerRef: ViewContainerRef
              // private componentFactoryResolver: ComponentFactoryResolver
              ) {
    // create icon element
    // insert the icon element in the template after host element
    // on icon click, toggle the host`s type (text - password)
    // let iconTemp = `<nb-icon  nbSuffix nbButton ghost></nb-icon>` //document.createElement 

    

    
  }
  ngOnInit(): void {
    const newIconComp = this.viewContainerRef.createComponent(NbIconComponent);
    console.log(newIconComp);
    // newIconComp.instance.
    newIconComp.instance.icon = 'eye-outline';
    let iconEl = newIconComp.location.nativeElement;
    iconEl.setAttributeNS(null, 'nbButton', '');
    iconEl.setAttributeNS(null, 'nbSuffix', '');
    iconEl.setAttributeNS(null, 'ghost', '');

    // console.log(newIconComp);
    (window as any)['el'] = this.elRef.nativeElement;
    (window as any)['vc'] = this.viewContainerRef;

    // this.elRef.nativeElement.parentNode.appendChild(newIconComp)
  
  }
  ngAfterViewInit(): void {
 



    // newEyeIcon.setAttributeNS(null, 'nbButton', '');
    // newEyeIcon.setAttributeNS(null, 'nbSuffix', '');
    // newEyeIcon.setAttributeNS(null, 'ghost', '');
    // newEyeIcon.setAttributeNS(null, 'icon', 'eye-outline');
    
    // this.renderer.appendChild(this.elRef.nativeElement.parentNode.parentNode, newEyeIcon);
  }

}