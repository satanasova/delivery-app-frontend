import { Location, TitleCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ItemConfig } from 'src/app/utils/display-item-card/models';
import { Truck } from '../models';
import { TrucksService } from '../trucks.service';

@Component({
  selector: 'app-single-truck',
  templateUrl: './single-truck.component.html',
  styleUrls: ['./single-truck.component.scss']
})
export class SingleTruckComponent implements OnInit {
  truck?: Truck;
  itemConfig: ItemConfig[] = [];

  constructor(private route: ActivatedRoute, private trucksService: TrucksService, private titleCasePipe: TitleCasePipe) {
    // this.truckId = (this.route.params as any)['value'].truckId;
    this.route.params.subscribe(async ({truckId}) => {
      if(truckId) {
        this.truck = await this.trucksService.getSingleTruck(truckId)
      }
    })

  }

  ngOnInit(): void {
    this.itemConfig = [
      {
        key: '_id',
        header: 'ID'
      },
      {
        key: 'registrationNumber',
        header: 'Reg Number'
      },
      {
        key: 'size',
        header: 'Size',
        displayFn: (size: string) => this.titleCasePipe.transform(size)
      },
      {
        key: 'health',
        header: 'Health',
        displayFn: (health: number) => `${health}%`
      },
      {
        key: 'status',
        header: 'Status',
        displayFn: (status: string) => this.titleCasePipe.transform(status)
      },
    ]
  }

}
