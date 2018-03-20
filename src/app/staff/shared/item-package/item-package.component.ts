import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import {package_model } from '../model/package.model';

@Component({
  selector: 'app-item-package',
  templateUrl: './item-package.component.html',
  styleUrls: ['./item-package.component.scss']
})
export class ItemPackageComponent implements OnInit {
  @Input() packages:package_model; 
  @Input() selectClick; 
  @Output() packageItem: EventEmitter<package_model> = new EventEmitter();
//  countSelect = 0;
  constructor() {    
  }

  ngOnInit() {
    
  }
  onSelect(){
    this.packageItem.emit(this.packages);
  }
  onCountSelect(){
    if(this.selectClick){
      this.packages.count++;
      //this.countSelect++;
      this.packageItem.emit(this.packages);
    }
  }
}

