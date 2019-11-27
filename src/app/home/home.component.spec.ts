import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RouterModule,Routes }  from '@angular/router';
import { NgxUiLoaderModule} from  'ngx-ui-loader';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from '../services/api.service';
import { SharedService } from '../services/shared.service';
import { StorageService } from '../services/storage.service';
import {of} from 'rxjs';
import { HomeComponent } from './home.component';
import { LandingComponent } from '../landing/landing.component';
import { ProductDetailsComponent } from '../product-details/product-details.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>; 
  let apiService: ApiService;
  let sharedService: SharedService;
  let storageService: StorageService;
  const appRouteList: Routes=[
  {path:'landing',component:LandingComponent}]
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeComponent,LandingComponent, ProductDetailsComponent],
      imports:[RouterTestingModule,NgxUiLoaderModule,HttpClientModule,
               RouterModule.forRoot(appRouteList),FormsModule],
      providers: [ApiService,SharedService,StorageService]
    })
    .compileComponents();
    setup();
    let debugElement = fixture.debugElement;
    apiService = debugElement.injector.get(ApiService);
    sharedService = debugElement.injector.get(SharedService);
    storageService = debugElement.injector.get(StorageService);
  }));

 function setup(){
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
  }

  it('should create', () => {
    component.contentData={navBarOptions:[]};
    expect(component).toBeTruthy();
  });

   it('should test setActiveLink',()=>{
    component.contentData={navBarOptions:[{isActive:true}]};
    component.activeLink=0;
    component.setActiveLink(0);
  });

  it('should test ngOnInit',()=>{
    spyOn(storageService,'getHomeContent').and.returnValue({navBarOptions:[{isActive:false}]});
    component.ngOnInit();
  });

  it('should test getContentData',()=>{
    spyOn(apiService, 'getApi').and.returnValue(of({navBarOptions:[{isActive:true}]}));
    component.getContentData();
  });
  
  it('should test cart counter subject',()=>{
    sharedService.cartCounter.next(4);
  });

});
