import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import { NgModule }  from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule,Routes }  from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';

import { ApiService } from './services/api.service';
import { ProductDetailsComponent } from './product-details/product-details.component';

const appRouteList: Routes=[
{path:'login-page',component:LoginComponent},
{path:'home-page',component:HomeComponent},
{path:'product-details-page',component:ProductDetailsComponent, outlet: 'aux' }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ProductDetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRouteList,{enableTracing:false})
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
