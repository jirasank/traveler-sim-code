import { Sim_item } from './sim.model';

export class package_model {
  id: string;
  character: string;
  day: string;
  speed: string;
  credit: string;
  call_text_unit:string;
  des: string;
  price: number;
  price_unit:string;
 // color:string;
  hot: string;
  count:number; //จำนวน sim ในแต่ละ Package
  group:string;
  group_type:string;  //add
  topup:string;
  sim: Sim_item[]=[];
  }