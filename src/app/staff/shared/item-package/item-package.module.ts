import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemPackageComponent } from './item-package.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ItemPackageComponent],
  exports: [ItemPackageComponent]
})
export class ItemPackageModule { }
