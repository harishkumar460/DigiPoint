import { Component} from '@angular/core';
import { Http } from '@angular/http';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{

  showLoginForm =true;
  http : Http;
  constructor() {

   }

  processLogin(userLoginInfo){
   console.log('user name '+userLoginInfo.userName+' password '+userLoginInfo.userPassword);
  this.http.get('https://shiv-app.herokuapp.com/authorized-users').
   subscribe((data) => console.log(data))
  }

  registerNewUser(newUserInfo){
   console.log('user name '+newUserInfo.userName+' new password '+newUserInfo.newPassword+' confirm ps '+newUserInfo.confirmPassword+' shop code '+newUserInfo.shopAuthcode);
  }

}
