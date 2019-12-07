import { Component, OnInit, ViewChild,ElementRef} from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { StorageService } from '../services/storage.service';
import {FormGroup,FormControl,Validators} from '@angular/forms';
import {Subscription,Observable,Subject,BehaviorSubject,ReplaySubject,AsyncSubject} from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  showLoginForm =true;
  contentData :any;
  public loginForm: FormGroup;
  public userRegisterationForm : FormGroup;
  isAuthenticationFailed: boolean= false;
  showSpinner: boolean=false;
  valueChangeSubscription: Subscription;
  testSubject: BehaviorSubject<any>;

  @ViewChild('myCanvas', { static: false }) canvasRef : ElementRef;
  constructor(private router:Router,private apiService: ApiService,
              private storageService: StorageService) {
    this.loginForm=new FormGroup({
        userName: new FormControl(null,[Validators.required]),
        userPassword: new FormControl(null,[Validators.required])
    });
    this.userRegisterationForm= new FormGroup({
      userName: new FormControl(null,[Validators.required]),
      newPassword: new FormControl(null,[Validators.required]),
      confirmPassword: new FormControl(null,[Validators.required]),
      shopAuthcode: new FormControl(null,[Validators.required])
    });
    this.valueChangeSubscription=this.loginForm.valueChanges.subscribe(val=>{
      this.isAuthenticationFailed=false;
    });
    this.testSubject = new BehaviorSubject(0);
    
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
      this.storageService.setLoggedInStatus(true);
      this.router.navigate(['home-page']).then(nav=>console.log('navigation '+nav));
     }else{
       this.isAuthenticationFailed=true;
       this.storageService.setLoggedInStatus(false);
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
    console.log(this.userRegisterationForm);
  }

  ngOnInit() {
   this.getContentData();
  }
  ngAfterViewInit(){
    console.log('view init called');
    //let context=this.canvasRef.nativeElement.getContext('2d');
    //context.fillStyle="#FF0000";
    //context.fillRect(0,0,400,400);
  }

}
