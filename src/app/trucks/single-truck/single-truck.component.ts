import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-single-truck',
  templateUrl: './single-truck.component.html',
  styleUrls: ['./single-truck.component.scss']
})
export class SingleTruckComponent implements OnInit {
  truckId: string = '';

  constructor(private route: ActivatedRoute, private location: Location) {
    // this.truckId = (this.route.params as any)['value'].truckId;
    this.route.params.subscribe(params => {
      this.truckId = params['truckId'];
    })

  }

  ngOnInit(): void {
  }

  back(): void {
    this.location.back();
  }
}
