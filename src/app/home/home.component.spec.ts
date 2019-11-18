import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterModule,Routes }  from '@angular/router';
import { NgxUiLoaderModule} from  'ngx-ui-loader';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from '../services/api.service';
import {of} from 'rxjs';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>; 
  let apiService: ApiService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      imports:[RouterTestingModule,NgxUiLoaderModule,HttpClientModule],
      providers: [ApiService]
    })
    .compileComponents();
    setup();
    let debugElement = fixture.debugElement;
    apiService = debugElement.injector.get(ApiService);
  }));

 function setup(){
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
  }

  it('should create', () => {
    component.contentData={navBarOptions:[]};
    expect(component).toBeTruthy();
  });

  it('should test ngOnInit',()=>{
    component.ngOnInit();
  });

  it('should test navigateToLanding',()=>{
    component.contentData={navBarOptions:[]};
    component.navigateToLanding();
  });

  it('should test setActiveLink',()=>{
    component.contentData={navBarOptions:[{isActive:true}]};
    component.activeLink=0;
    component.setActiveLink(0);
  });
});
