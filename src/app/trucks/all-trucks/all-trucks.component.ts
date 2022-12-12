import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-all-trucks',
  templateUrl: './all-trucks.component.html',
  styleUrls: ['./all-trucks.component.scss']
})
export class AllTrucksComponent implements OnInit {
  truckIds: string[] = []

  constructor() {  }

  async ngOnInit() {
    let trucksIdsPromise = new Promise<string[]>((res, rej) => {
      let truckIdsResult = ['7', '5', '4', '95'];
      res(truckIdsResult);
    })

    this.truckIds = await trucksIdsPromise;
  }

}
