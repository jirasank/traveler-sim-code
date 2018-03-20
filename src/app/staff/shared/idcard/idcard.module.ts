import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IdcardComponent } from './idcard.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [IdcardComponent],
  exports: [IdcardComponent]
})
export class IdcardModule { }
