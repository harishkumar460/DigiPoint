import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NumericOnlyDirective } from './directives/numeric-only.directive';
@NgModule({
  declarations: [NumericOnlyDirective],
  imports: [
    CommonModule
  ],
  exports:[NumericOnlyDirective]
})
export class SharedModule { }
