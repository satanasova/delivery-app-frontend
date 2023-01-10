import { Component, EventEmitter, HostBinding, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-custom-accordion',
  templateUrl: './custom-accordion.component.html',
  styleUrls: ['./custom-accordion.component.scss']
})
export class CustomAccordionComponent implements OnInit {
  @Input() header: string = '';
  @Input() items: any[] = [];
  @Input() class: string = '';
  @HostBinding('class') hostClass: any;
  @Output() itemClicked: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    this.hostClass = this.class;
  }

  onItemClicked(event: any, item: any) {
    this.itemClicked.emit(item);
  }

}
