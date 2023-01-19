import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Office } from 'src/app/offices/models';
import { OfficesService } from 'src/app/offices/offices.service';

@Component({
  selector: 'app-office-preview',
  templateUrl: './office-preview.component.html',
  styleUrls: ['./office-preview.component.scss']
})
export class OfficePreviewComponent implements OnInit, OnChanges  {
  @Input() officeId?: string;
  office?: Office;

  constructor(private officesService: OfficesService) {
    // console.log(this.officeId);
  }

  async ngOnInit() {

  }

  async ngOnChanges(changes: SimpleChanges) {
    if(this.officeId) {
      this.office = await this.officesService.getOffice(this.officeId)
    }
  }

}
