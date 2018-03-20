import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { package_model } from '../shared/model/package.model';

@Component({
  selector: 'app-cashier-show-package',
  templateUrl: './cashier-show-package.component.html',
  styleUrls: ['./cashier-show-package.component.scss']
})
export class CashierShowPackageComponent implements OnInit {
     arraySim : string[];
     test = new Map<string,package_model>();
  // @Input() packages:package_model; 
  // @Output() indexPackageItem: EventEmitter<number> = new EventEmitter();
  // @Output() packageItem: EventEmitter<package_model> = new EventEmitter();
  // countSelect = 0;
  // count =0;
   result: number;
    value: any;
    decimal: boolean;
    answer: number;
    total: Array<number>;
    clear: boolean;
previous_operator: any;
  constructor() {
        this.result = 0;
        this.decimal = false;
        this.answer = 0;
        this.total = [];
        this.clear = false;
this.previous_operator = false;
   }

  ngOnInit() {  
     
    //  this.arraySim = ["0878303388","0856986325" ];

    
      
  }
  // onAdd() {
  //   this.count++;
  //   this.packageItem.emit(this.packages);
  // }
  // onSub(index) {
  //   if(this.count >0) this.count--;    
  //   this.indexPackageItem.emit(index); 
  // }

addToCalculation(value) {

        if(this.clear == true) {
            this.result = 0;
            this.clear = false;
        }

        if(value == '.') {

            if(this.decimal == true) {
                return false;
            }

            this.decimal = true;

        }

        this.result += value;

    }

    calculate(operator) {

        this.total.push(this.result);
        this.result = 0;

        if(this.total.length == 2) {
            var a = Number(this.total[0]);
            var b = Number(this.total[1]);

            if(this.previous_operator == '+') {
                var total = a + b;
            } else if(this.previous_operator == '-') {
                var total = a - b;
            } else if(this.previous_operator == '*') {
                var total = a * b;
            } else {
                var total = a / b;
            }
            var answer = total;

            this.total = [];
            this.total.push(answer);
            this.result = total;
            this.clear = true;
        }
        else {
            this.clear = false;
        }

        this.decimal = false;
        this.previous_operator = operator;

    }

    getTotal() {
        var a = Number(this.total[0]);
        var b = Number(this.result);

        if(this.previous_operator == '+') {
            var total = a + b;
        } else if(this.previous_operator == '-') {
            var total = a - b;
        } else if(this.previous_operator == '*') {
            var total = a * b;
        } else {
            var total = a / b;
        }

        if(isNaN(total)) {
            return false;
        }

        this.result = total;
        this.total = [];
        this.clear = true;
    }
}
