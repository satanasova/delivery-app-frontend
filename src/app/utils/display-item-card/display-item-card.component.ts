import { AfterViewInit, Component, ComponentFactoryResolver, Input, OnInit, QueryList, ViewChild, ViewChildren, ViewContainerRef } from '@angular/core';
import { ItemConfig } from 'src/app/utils/display-item-card/models'


@Component({
  selector: 'app-display-item-card',
  templateUrl: './display-item-card.component.html',
  styleUrls: ['./display-item-card.component.scss']
})
export class DisplayItemCardComponent implements OnInit, AfterViewInit {
  @Input() data: any;
  @Input() itemConfig: ItemConfig[] = [];
  @ViewChildren('valueList', {read: ViewContainerRef}) valueLists!: QueryList<any>;
  handledCustomComponentElements: any[] = [];
  afterViewInitReady;
  afterViewInitResolve: any;

  constructor() { 
    this.afterViewInitReady = new Promise((res, rej) => {
      this.afterViewInitResolve = res;
    })
  }

  ngAfterViewInit(): void {
    this.afterViewInitResolve();
  }

  ngOnInit(): void {
  }

  displayValue(itemConfig: ItemConfig, valueList: any): any {
    const customDisplayFn = itemConfig.displayFn;
    const customDisplayCmp = itemConfig.customDisplayCmp;
    
  
    if (customDisplayFn) {
      const resultToPrint = customDisplayFn((this.data as any)[itemConfig.key]);
      if (typeof resultToPrint === 'string') {
        return resultToPrint;
      } else {
        return resultToPrint.map(r => r.outerHTML).join('');
      }
    } else if (customDisplayCmp) {
      // create component, 
      // inject into the element that called this function!
      const cmpProps = itemConfig.cmpProperties && itemConfig.cmpProperties((this.data as any)[itemConfig.key], this.data);
      const cmpHandlers = itemConfig.cmpHandlers && itemConfig.cmpHandlers((this.data as any)[itemConfig.key], this.data)

      this.injectComponent(valueList, customDisplayCmp, cmpProps, cmpHandlers)
    } else {
      return (this.data as any)[itemConfig.key];
    }
  }

  async injectComponent(el: any, customDisplayCmp: any, props: object, handlers: object) {
    if (this.handledCustomComponentElements.indexOf(el) >= 0) {
      return;
    }

    const foundViewContainerRef: ViewContainerRef = this.valueLists && this.valueLists.find((vcRef, index, all) => {
      return vcRef.element.nativeElement === el;
    })

    if (foundViewContainerRef) {
      console.log('correct el found. should display ');
      console.log(el, foundViewContainerRef, customDisplayCmp);
      console.log('with props:');
      console.log(props);
      console.log('with handlers');
      console.log(handlers);

      await this.afterViewInitReady; 
      const newComp = foundViewContainerRef.createComponent(customDisplayCmp);
      console.log(newComp);
      Object.entries(props).forEach(([propName, propVal]) => newComp.setInput(propName, propVal))
      Object.entries(handlers).forEach(([handlerName, handlerFn]) => {
        const eventEmitter = (newComp.instance as any)[handlerName];
        eventEmitter.subscribe((emittedData: any) => handlerFn(emittedData))
        
      })


      this.handledCustomComponentElements.push(el)
    }
  }

  onValueClick(event: any, itemConfig: ItemConfig): void {
    const customClickFn = itemConfig.onClick;
    if (customClickFn) {
      customClickFn((this.data as any)[itemConfig.key]);
    }
  }

}
