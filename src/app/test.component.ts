import { Component, OnInit} from "@angular/core";

@Component({
  selector: 'app-test-package',
  template: `
    <p>Package bla in truck <a [routerLink]="'/trucks/7'">#7</a></p>
  `
})
export class TestPackageComponent implements OnInit {
  ngOnInit(): void {
    throw new Error("Method not implemented.");
  }
  
}