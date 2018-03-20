import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { package_model } from '../model/package.model';

@Component({
  selector: 'app-item-package-small-module',
  templateUrl: './item-package-small-module.component.html',
  styleUrls: ['./item-package-small-module.component.scss']
})
export class ItemPackageSmallModuleComponent implements OnInit {
  @Input() showHead : boolean;
  @Input() packages: package_model; 
  @Input() selectClick: boolean;
  @Input() showAddSub: boolean;
  @Output() indexPackageItem: EventEmitter<number> = new EventEmitter();
  @Output() packageItem: EventEmitter<any> = new EventEmitter();
  day: string ;
  speed: string;
  countSelect = 0;
  count =0;
  constructor() { }

  ngOnInit() {
   
      this.day = this.packages.day.replace("Days","")
      this.speed = this.packages.speed.replace("GB","")
      if(!this.selectClick) this.count = 1;
  }
  onAdd() {
    // if(this.selectClick) {
         this.packages.count ++;    
         this.packageItem.emit({package: this.packages,opt: '+'});              
   //  }
   
  }
  onSub() {
   // if(this.selectClick) {
     if(this.packages.count >0) {
       this.packages.count --;    
       this.packageItem.emit({package: this.packages,opt: '-'});    
    // }
   // this.indexPackageItem.emit(index); 
    }
  }

}
