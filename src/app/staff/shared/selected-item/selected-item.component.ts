import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';

@Component({
 selector: 'app-selected-item',
  templateUrl: './selected-item.component.html',
  styleUrls: ['./selected-item.component.css']
})
export class SelectedItemComponent implements OnInit {
  @Input() packageSelectItem:pagemog[]=[];
  @Output() indexPackageItem: EventEmitter<number> = new EventEmitter();
 
  constructor() { 
      }

  ngOnInit() {
  }

  removeSelect(index){
    this.indexPackageItem.emit(index);
  }
}
interface pagemog{
  id:string;
  day:string;
  speed:string;
  name:string;
  spec:string;
  des:string;
  price:number;
  color:string;
}