import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { CartLandingComponent } from './cart-landing/cart-landing.component';
import { DeliveryModalComponent } from './delivery-modal/delivery-modal.component';
import { ShippingComponent } from './shipping/shipping.component';
const routes: Routes = [{path:'', component: CartLandingComponent},
						{path:'shipping', component: ShippingComponent},
						{ path:'payment',loadChildren: 'src/app/order/order.module#OrderModule'}
						];

@NgModule({
  declarations: [CartLandingComponent, DeliveryModalComponent, ShippingComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class CartModule { }
