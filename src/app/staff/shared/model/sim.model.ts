export interface ITranST {
	ID : string; // transaction id
	status: string; // status on start confPPSPTSIM sucess
	trndate: string; // transaction date
	remark: string; // remark on start confPPSPTSIM sucess
	sStatusPP?: string;  //preparation
	sStatusFA?: string;  //first act     
	sStatusRC?: string;  //recharge
	sStatusAF?: string;  //add feature
	sStatusALL?: string; // result all
 	sTopupOrAddPack: string; //sharp edit
    // sLocation?: string;
    // sAddress?: string[];
    // sMoneyText?: string;
    // stotal?: string;
    // sVAT?: string;
    
    
}
export interface ITranSTs extends Array<ITranST>{}   
export class Sim_item {
  simNo: string;
  simNumber: string;
  mobileNumber: string;
  imsiNumber: string;
  simType: string;
  balance: string;
  step: number;
  error: boolean
  errorDetail: string;
  statusError: string;
  stepRetry: string;
  sTransID : ITranSTs // from Transaction ID arraya
}
export interface ISIMs extends Array<Sim_item>{}

export interface IRCP {
   sStatus : string, 
   sMessage : string, 
   sReceiptId : string, // after create tdm
   sReceiptNo : string // after create tdm 
  }