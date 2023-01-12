import { TitleCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ColumnConfig } from 'src/app/utils/smart-table/models';
import { Truck } from '../models';
import { TrucksService } from '../trucks.service';

@Component({
  selector: 'app-all-trucks',
  templateUrl: './all-trucks.component.html',
  styleUrls: ['./all-trucks.component.scss']
})
export class AllTrucksComponent implements OnInit {
  trucks: Truck[] = [];
  cols: ColumnConfig<Truck>[] = [];

  constructor(private trucksService: TrucksService, private titleCasePipe: TitleCasePipe, private router: Router) {  }

  async ngOnInit() {
    this.cols = [
      {
        field: '_id',
        header: '#'
      },
      {
        field: 'registrationNumber',
        header: 'Reg Number'
      },
      {
        field: 'size',
        header: 'Size',
        displayFn: (size: string) => this.titleCasePipe.transform(size),
        filterConfig: {
          filterType: 'select',
          displayFn: (size: string) => size.slice(0,1).toUpperCase()
        }
      },
      {
        field: 'health',
        header: 'Health',
        displayFn: (health: number) => `${health}%`,
        filterConfig: {
          filterType: 'range'
        }
      },
      {
        field: 'status',
        header: 'Status',
        displayFn: (status: string) => this.titleCasePipe.transform(status),
        filterConfig: {
          filterType: 'select',
          displayFn: (status: string) => this.titleCasePipe.transform(status)
        }
      }

    ]

    this.trucks = await this.trucksService.getAllTrucks()
  }

  truckClicked(truck: Truck) {
    this.router.navigate(['trucks', truck._id]);
  }


}
