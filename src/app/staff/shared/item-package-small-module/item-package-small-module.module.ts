import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemPackageSmallModuleComponent } from './item-package-small-module.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ItemPackageSmallModuleComponent],
  exports: [ItemPackageSmallModuleComponent]
})
export class ItemPackageSmallModuleModule { }
