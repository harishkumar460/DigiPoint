import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import { NgModule }  from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule,Routes }  from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxUiLoaderModule,NgxUiLoaderConfig,POSITION,SPINNER,PB_DIRECTION} from  'ngx-ui-loader';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';

import { ApiService } from './services/api.service';
import { StorageService } from './services/storage.service';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { LandingComponent } from './landing/landing.component';
import { CartLandingComponent } from './cart-landing/cart-landing.component';

const appRouteList: Routes=[
{path:'login-page',component:LoginComponent},
{path:'home-page',component:HomeComponent,
 children: [
      { path:'landing', component:LandingComponent},
      { path:'cart-page', component:CartLandingComponent}
    ] 
},
{path:'product-details-page',component:ProductDetailsComponent}
];

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  fgsColor: 'pink',
  fgsPosition: POSITION.centerCenter,
  fgsSize: 40,
  fgsType: SPINNER.rectangleBounce,
  fbDirection: PB_DIRECTION.leftToRight, // progress bar direction
  fbThickness: 5, // progress bar thickness
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ProductDetailsComponent,
    LandingComponent,
    CartLandingComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgbModule,
    RouterModule.forRoot(appRouteList,{enableTracing:false}),
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig)
  ],
  providers: [ApiService,StorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
