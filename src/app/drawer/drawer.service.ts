import { ComponentType } from '@angular/cdk/portal';
import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { NbSidebarComponent, NbSidebarService } from '@nebular/theme';
import { Office } from '../offices/models';
import { Truck } from '../trucks/models';
import { PreviewTypes } from './models';

@Injectable({
  providedIn: 'root'
})
export class DrawerService {
  drawerOpened: EventEmitter<any> = new EventEmitter()

  constructor(private sidebarService: NbSidebarService) { }

  openDrawer(component: any , inputs: { [inputName: string]: any; }) {
    this.sidebarService.expand('right-drawer');
    this.drawerOpened.emit([component, inputs]);
  }

  closeDrawer() {
    this.sidebarService.collapse('right-drawer')
  }

}
