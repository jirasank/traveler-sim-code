import { Component, OnInit,Input } from '@angular/core';
import { Sim_item } from '../model/sim.model';

@Component({
  selector: 'app-item-sim-progress',
  templateUrl: './item-sim-progress.component.html',
  styleUrls: ['./item-sim-progress.component.scss']
})
export class ItemSimProgressComponent implements OnInit {
 // @Input() process: string;
  @Input() statusError: string;
  @Input() simProgress: Sim_item; 
  //simProgress: SimProgress[];
  //simProgress :PackageSim[];
  step: number;
  interval: any;
  index: number = 0;
  countItem: number;

  simNumber : string;

  constructor() { }

  ngOnInit() {
   // this.simProgress =  this.simProgressTmp;
    // this.simProgress = [
    //   {
    //     "simNumber": "9031-5",
    //     "mobileNumber": "",
    //     "balance": "",
    //     "step": 0
    //   },
    //   {
    //     "simNumber": "9031-6",
    //     "mobileNumber": "",
    //     "balance": "",
    //     "step": 0
    //   }
    // ];
   // this.simNumber = this.simProgress.simNumber;
   // this.countItem = this.simProgress.length;

    // this.interval = setInterval(() => {
    //   if(this.process == "process")   this.onProcess();
    //  }, 1000);

    //  setTimeout(()=> {  

      //  let  sim : simBalance;
      //  sim = {
      //   "simNumber": "9031-5",
      //   "mobileNumber": "0988767566",
      //   "balance": "0.00 THB",
      //   "step": 1
      //  };
      //  this.simProgress.push(sim);
   // }, 1000);
  }
  // onProcess(){
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
  //          mobileNumber = "087830338" + this.simProgress[this.index].simNumber.substring(5);
  //          balance = "0.00 THB"
  //          break;
  //      } 
        
  //       let  sim : Sim_item;
  //         sim = {
  //         "simNumber": this.simProgress[this.index].simNumber,
  //         "mobileNumber": mobileNumber,
  //         "balance": balance,
  //         "step": step,
  //         "error": false
  //         };
  //      this.simProgress[this.index] = sim; 
       
  //     //  if(step == 4 && this.index < this.countItem)    {
  //     //     step = 0;this.index++;
  //     //  }       
  //      if(step == 4 )    clearInterval(this.interval);  
  //    //  if(step == 4 && this.index >= this.countItem)    clearInterval(this.interval);  
     
  // }

}

// interface PackageSim {
//   id: string;
//   day: string;
//   speed: string;
//   credit: string;
//   spec:string;
//   des: string;
//   price: number;
//   color:string;
//   count:number;
//   sim: [
//         {
//           simNumber: string;
//           mobileNumber: string;
//           balance: string;
//           step: number;
//         }
//        ]
// }

// interface SimProgress {
//   simNumber: string;
//   mobileNumber: string;
//   balance: string;
//   step: number;
// }

