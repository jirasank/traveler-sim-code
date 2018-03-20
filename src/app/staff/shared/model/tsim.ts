//********************************************************
// Tsim.ts
//********************************************************

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
    // sLocation?: string;
    // sAddress?: string[];
    // sMoneyText?: string;
    // stotal?: string;
    // sVAT?: string;
    
    
}
export interface ITranSTs extends Array<ITranST>{}   
export interface ISIM {
    sStatus :string, // user status: n=new SIM, e=error, s=send,c=completed, q=comp proof 
    sErrMsg :string,  // error message from process
	sSIMSerial : string,
	sIMSI : string, // from simserial
	sSIMType : string, // from post simserial
    
	sTotalAmt : string,
	sTotalVAT : string,
	sTAXAmt : string,
	sTOPUP : string, // from CPC 
	sMobileNo : string, // from getPPSimSt2
    IP: string,
    sCardNo: string,
    sCardType: string,
    sCardImage: string,
	sTransID : ITranSTs // from Transaction ID arraya
  }
export interface ISIMs extends Array<ISIM>{}

export interface IRCP {
   sStatus : string, 
   sMessage : string, 
   sReceiptId : string, // after create tdm
   sReceiptNo : string // after create tdm 
  }
  