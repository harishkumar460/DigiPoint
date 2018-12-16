import { Component} from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { NgZone } from '@angular/core';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{

  showLoginForm =true;
  constructor(private http : Http,private router:Router,private _ngZone: NgZone) {

   }

  processLogin(userLoginInfo){
   console.log('user name '+userLoginInfo.userName+' password '+userLoginInfo.userPassword);
  this.http.get('https://shiv-app.herokuapp.com/authorized-users').
   subscribe(response=>{
    response=JSON.parse(response['_body']);
    console.log(JSON.stringify(response));
     this.checkLoggedInUser(response,userLoginInfo);
   })
  }

  checkLoggedInUser(usersList,userLoginInfo): void{
   
   let matchUser=usersList.users.filter(function(user){
     return userLoginInfo.userName===user.user_name && userLoginInfo.userPassword===user.password;
   });
    console.log(matchUser);
    if(matchUser.length){
      this._ngZone.run(() => {
      this.router.navigate(['home-page']).then(nav=>console.log('navigation '+nav));
    });
     //this.router.navigateByUrl('/home-page').then(nav=>console.log('navigation '+nav));
    }
  }

  registerNewUser(newUserInfo){
   console.log('user name '+newUserInfo.userName+' new password '+newUserInfo.newPassword+' confirm ps '+newUserInfo.confirmPassword+' shop code '+newUserInfo.shopAuthcode);
  }

}
