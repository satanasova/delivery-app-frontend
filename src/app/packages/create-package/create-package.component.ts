import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { PositionOptions } from 'mapbox-gl';
import { ClientsService } from 'src/app/clients/clients.service';
import { Client } from 'src/app/clients/models';
import { Office } from 'src/app/offices/models';
import { OfficesService } from 'src/app/offices/offices.service';
import { Package, PackageSize } from '../models';
import { PackagesService } from '../packages.service';

@Component({
  selector: 'app-create-package',
  templateUrl: './create-package.component.html',
  styleUrls: ['./create-package.component.scss']
})
export class CreatePackageComponent implements OnInit {
  sizes: PackageSize[] = Object.values(PackageSize);
  offices: Office[] = [];
  clients: Client[] = [];
  createPkgForm: FormGroup;
  size: AbstractControl;
  originOffice: AbstractControl;
  destinationOffice: AbstractControl;
  description: AbstractControl;
  isFragile: AbstractControl;
  recipient: AbstractControl;
  

  constructor(private officesService: OfficesService, private fb: FormBuilder, private packagesService: PackagesService, private clientsService: ClientsService, private toastrService: NbToastrService, private router: Router) { 
    this.createPkgForm = fb.group({
      'size': ['', Validators.required],
      'description': [''],
      'isFragile': [false],
      'originOffice': ['', Validators.required],
      'destinationOffice': ['', Validators.required],
      'recipient': ['', Validators.required],
    }, {validator: [differFields('originOffice', 'destinationOffice')]})

    this.size = this.createPkgForm.controls['size'];
    this.originOffice = this.createPkgForm.controls['originOffice'];
    this.destinationOffice = this.createPkgForm.controls['destinationOffice'];
    this.description = this.createPkgForm.controls['description'];
    this.isFragile = this.createPkgForm.controls['isFragile'];
    this.recipient = this.createPkgForm.controls['recipient'];
  }

  async ngOnInit(): Promise<void> {
    this.offices = await this.officesService.getAllOffices();
    this.clients = await this.clientsService.getAllClients();
  }

  get isFormValid() {
    return this.createPkgForm.valid
  }

  
  async onSubmit(pkg: Package) {
    const createdPkg: Package = await this.packagesService.createPackage(pkg);
    this.packagesService.closeCreatePackageModal();

    const toast = this.toastrService.success(
      `From office ${createdPkg.originOffice.name} to office ${createdPkg.destinationOffice.name}`, 
      'Package created!', 
      {position: NbGlobalPhysicalPosition.TOP_RIGHT, duration: 10000, icon: 'cube-outline'});
    
    toast.onClick().subscribe(() => {
      this.router.navigate(['packages', createdPkg._id])
    })
  
  }

  
}

function differFields(propNameA: string, propNameB: string): ValidatorFn {
  return (control: any): (ValidationErrors | null) => {
    const controlA: AbstractControl = control.get(propNameA);
    const controlB: AbstractControl = control.get(propNameB);
    const valueA: string = controlA.value;
    const valueB: string = controlB.value;
    const errorsA = controlA.errors || {};
    const errorsB = controlB.errors || {};

    if(valueA === valueB && valueA !== '') {
      errorsA['valueDiffer'] = true;
      errorsB['valueDiffer'] = true;
    } else {
      delete errorsA['valueDiffer'];
      delete errorsB['valueDiffer'];
    }

    if (Object.keys(errorsA).length !== 0){
      controlA.setErrors(errorsA);
    } else {
      controlA.setErrors(null)
    }

    if (Object.keys(errorsB).length !== 0){
      controlB.setErrors(errorsB);
    } else {
      controlB.setErrors(null)
    }
    
    return null
 
  }

}