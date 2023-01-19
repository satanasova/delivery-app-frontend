import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewContainerRef } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Office } from 'src/app/offices/models';
import { Truck } from 'src/app/trucks/models';
import { DrawerService } from '../drawer.service';

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss']
})
export class DrawerComponent implements OnInit {
  @ViewChild('container', {read: ViewContainerRef}) container?: ViewContainerRef 
  // objectId?: string;

  constructor(private drawerService: DrawerService) {
  }
  
  ngOnInit(): void {
    console.log('drawer init');
    this.drawerService.drawerOpened.subscribe(([component, inputs]) => {
      if(this.container){
        this.container.clear();
        const newComp = this.container.createComponent(component);
        if(inputs) {
          Object.entries(inputs).forEach(([inputName, inputValue]) => newComp.setInput(inputName, inputValue));
        }
      }
    });
  }

}
