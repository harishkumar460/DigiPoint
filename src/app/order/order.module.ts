import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { OrderPaymentComponent } from './order-payment/order-payment.component';

const routes: Routes = [{path:'', component: OrderPaymentComponent},
						{path:'review', component: OrderPaymentComponent}];
@NgModule({
  declarations: [OrderPaymentComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class OrderModule { }
