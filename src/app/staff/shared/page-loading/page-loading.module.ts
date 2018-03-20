import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageLoadingComponent } from './page-loading.component';
import { PageLoadingService } from './page-loading.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [PageLoadingComponent],
  providers: [PageLoadingService],
  exports: [PageLoadingComponent]
})
export class PageLoadingModule { }
