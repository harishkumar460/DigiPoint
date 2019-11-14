import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import {FormGroup,FormControl,Validators} from '@angular/forms';
import {Subscription,Observable,Subject,BehaviorSubject,ReplaySubject,AsyncSubject} from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  showLoginForm =true;
  contentData={};
  public loginForm: FormGroup;
  isAuthenticationFailed: boolean= false;
  showSpinner: boolean=false;
  valueChangeSubscription: Subscription;
  testSubject: AsyncSubject<any>;
  constructor(private router:Router,private apiService: ApiService) {
    this.loginForm=new FormGroup({
        userName: new FormControl(null,[Validators.required]),
        userPassword: new FormControl(null,[Validators.required])
    });
    this.valueChangeSubscription=this.loginForm.valueChanges.subscribe(val=>{
      this.isAuthenticationFailed=false;
    });
    this.testSubject=new AsyncSubject();
    
   }

  processLogin(){
    this.showSpinner=true;
    this.isAuthenticationFailed=false;
   this.apiService.getApi('https://shiv-app.herokuapp.com/authorized-users').
   subscribe(response=>{
    console.log(JSON.stringify(response));
    this.showSpinner=false;
    this.checkLoggedInUser(response,this.loginForm.value);
   });
  }

  checkLoggedInUser(usersList,userLoginInfo): void{
   
   let matchUser=usersList.users.filter(function(user){
     return userLoginInfo.userName===user.user_name && userLoginInfo.userPassword===user.password;
   });
    console.log(matchUser);
    if(matchUser.length){
      this.router.navigate(['home-page']).then(nav=>console.log('navigation '+nav));
     }else{
       this.isAuthenticationFailed=true;
     }
  }

  getContentData(){
     this.apiService.getApi('https://shiv-app.herokuapp.com/login-page-content').
     subscribe(response=>{
      //response=JSON.parse(response['_body']);
      console.log(JSON.stringify(response));
      this.contentData=response; 
     });
   };


  registerNewUser(newUserInfo){
    this.valueChangeSubscription.unsubscribe();
    this.testSubject.next(4);
    this.testSubject.next(5);
    this.testSubject.next(6);
    this.testSubject.subscribe(val=>{
      console.log('first subscriber '+val);
    },error=>{
      console.log(error);
    });
    this.testSubject.error('error is there dude');
    this.testSubject.subscribe(val=>{
      console.log('second subscriber '+val);
    },error=>{
      console.log(error);
    });
   console.log('user name '+newUserInfo.userName+' new password '+newUserInfo.newPassword+' confirm ps '+newUserInfo.confirmPassword+' shop code '+newUserInfo.shopAuthcode);
  }

  ngOnInit() {
   this.getContentData();
  }

}
