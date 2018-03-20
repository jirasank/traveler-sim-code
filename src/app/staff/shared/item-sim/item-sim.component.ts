import { Component, OnInit,Input } from '@angular/core';
import { Sim_item } from '../model/sim.model';

@Component({
  selector: 'app-item-sim',
  templateUrl: './item-sim.component.html',
  styleUrls: ['./item-sim.component.scss']
})
export class ItemSimComponent implements OnInit {
  @Input() process: string;
  @Input() simProgress: Sim_item[];  
  // step: number;
  // interval: any;
  // index: number = 0;
  // countItem: number;
  // arraySim : string[];
  constructor() { }

  ngOnInit() {
    // this.arraySim = ["0878303388","0856986325" ];
    // this.countItem = this.simProgress.length;
    // this.interval = setInterval(() => {
    //   if(this.process == "process")   this.onProcess();
    //  }, 1000);
  }

  //  onProcess(){
  //      let step: number;
  //       let mobileNumber:string = "";
  //       let balance = "";
  //       step = this.simProgress[this.index].step;

  //      switch(step){
  //        case 0: step = 1;
  //           break;
  //        case 1: step = 2;
  //           break;
  //        case 2: step = 3;
  //          break;
  //        case 3: step = 4;
  //          mobileNumber = "0878303388"
  //          balance = "0.00 THB"
  //          break;
  //      } 
        
  //       let  sim : SimProgress;
  //         sim = {
  //         "simNumber": this.simProgress[this.index].simNumber,
  //         "mobileNumber": mobileNumber,
  //         "balance": balance,
  //         "step": step
  //         };
  //      this.simProgress[this.index] = sim; 
       
  //      if(step == 4 && this.index < this.countItem)    {
  //         step = 0;this.index++;
  //      }       
  //      if(step == 4 && this.index >= this.countItem)    clearInterval(this.interval);  
     
  // }

}

