import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { OrderPaymentComponent } from './order-payment/order-payment.component';
import { OrderReviewComponent } from './order-review/order-review.component';
import { OrderConfirmationComponent } from './order-confirmation/order-confirmation.component';

const routes: Routes = [{path:'', component: OrderPaymentComponent},
						{path:'review', component: OrderReviewComponent},
						{path:'confirmation',component : OrderConfirmationComponent}];
@NgModule({
  declarations: [OrderPaymentComponent, OrderReviewComponent, OrderConfirmationComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class OrderModule { }
