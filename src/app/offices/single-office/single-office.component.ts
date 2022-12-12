import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Office } from '../models';
import { OfficesService } from '../offices.service';

@Component({
  selector: 'app-single-office',
  templateUrl: './single-office.component.html',
  styleUrls: ['./single-office.component.scss']
})
export class SingleOfficeComponent implements OnInit {
  office?: Office;

  constructor(private route: ActivatedRoute, private location: Location, private officesService: OfficesService) {
    this.route.params.subscribe(async ({ officeId }) => {
      if (officeId) {
        this.office = await this.officesService.getOffice(officeId);
      }
    })
  }

  ngOnInit(): void {
  }

  back(): void {
    this.location.back();
  }
}
