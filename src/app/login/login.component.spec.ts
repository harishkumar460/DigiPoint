import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterModule,Routes }  from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgxUiLoaderModule} from  'ngx-ui-loader';
import { LoginComponent } from './login.component';
import { HomeComponent } from '../home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from '../services/api.service';
import {of} from 'rxjs';
describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let apiService: ApiService;
  const appRouteList: Routes=[
  {path:'home-page',component:HomeComponent}]
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent,HomeComponent],
      imports: [FormsModule,ReactiveFormsModule,RouterTestingModule,RouterModule.forRoot(appRouteList),
      HttpClientModule,NgxUiLoaderModule],
      providers:[ApiService]
    })
    .compileComponents();
    setup();
    let debugElement = fixture.debugElement;
    apiService = debugElement.injector.get(ApiService);
  }));

  function setup(){
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
  }

  it('invoke ngOnint', () => {
    let users={"loginTitle":"Digi Point>>>> Login"};
    spyOn(apiService, 'getApi').and.returnValue(of(users));
    component.ngOnInit();
    expect(component.contentData).toEqual(users);
  });
  it('invoke process login function with invalid login', () => {
    let users={"users":[{"user_name":"shiv001","password":"shiv@123","shop_authcode":"digi001"}]};
    component.loginForm.controls.userName.setValue('test');
    component.loginForm.controls.userPassword.setValue('test');
    spyOn(apiService, 'getApi').and.returnValue(of(users));
    component.processLogin();
    expect(component.isAuthenticationFailed).toEqual(true);
  });

  it('invoke process login function with valid login', () => {
    let users={"users":[{"user_name":"shiv001","password":"shiv@123","shop_authcode":"digi001"}]};
    component.loginForm.controls.userName.setValue('shiv001');
    component.loginForm.controls.userPassword.setValue('shiv@123');
    spyOn(apiService, 'getApi').and.returnValue(of(users));
    component.processLogin();
    expect(component.isAuthenticationFailed).toEqual(false);
  });
  it("run pending test",()=>{
    expect(true).toEqual(true);
    pending();
  });
});
