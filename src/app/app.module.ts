import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgModule, ApplicationRef , DoBootstrap}  from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule,Routes }  from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxUiLoaderModule,NgxUiLoaderConfig,POSITION,SPINNER,PB_DIRECTION} from  'ngx-ui-loader';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';

import { ApiService } from './services/api.service';
import { LoginGuard } from './router-guard/login.guard';
import { StorageService } from './services/storage.service';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { LandingComponent } from './landing/landing.component';

const appRouteList: Routes=[
{path:'login-page',component:LoginComponent},
{path:'home-page',component:HomeComponent,
 children: [
      { path:'landing', component:LandingComponent},
      { path:'cart-page',loadChildren: () => import('src/app/cart/cart.module').then(m => m.CartModule)}
    ] 
},
{path:'product-details-page',component:ProductDetailsComponent}
];

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  fgsColor: 'pink',
  fgsPosition: POSITION.centerCenter,
  fgsSize: 40,
  fgsType: SPINNER.rectangleBounce,
  pbDirection: PB_DIRECTION.leftToRight, // progress bar direction
  pbThickness: 5, // progress bar thickness
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ProductDetailsComponent,
    LandingComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    RouterModule.forRoot(appRouteList,{onSameUrlNavigation:'reload', enableTracing:false}),
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig)
  ],
  entryComponents:[AppComponent],
  providers: []
})
export class AppModule implements DoBootstrap{

 ngDoBootstrap(appRef: ApplicationRef){
    const componentElement = document.createElement('app-root');
    document.body.appendChild(componentElement);
     appRef.bootstrap(AppComponent);
 }
}
