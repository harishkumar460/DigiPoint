import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
//import { NgxUiLoaderModule} from  'ngx-ui-loader';
//import { ApiService } from '../services/api.service';
import { LoginComponent } from './login.component';
import { HttpClientModule } from '@angular/common/http';
describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent],
      providers: [],
      imports: [FormsModule,ReactiveFormsModule,RouterTestingModule,
      HttpClientModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('invoke process login function', () => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    component.processLogin();
    expect(component.showSpinner).toEqual(true);
  });
});
