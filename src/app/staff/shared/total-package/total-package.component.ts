import { Component, OnInit,Input } from '@angular/core';

@Component({
 selector: 'app-total-package',
  templateUrl: './total-package.component.html',
  styleUrls: ['./total-package.component.css']
})
export class TotalPackageComponent implements OnInit {
  
  @Input() totalPackage:number;
  constructor() { }

  ngOnInit() {
  }

}
