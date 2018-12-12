import { Component} from '@angular/core';
import { Http } from '@angular/http';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{

  showLoginForm =true;
  constructor(private http : Http) {

   }

  processLogin(userLoginInfo){
   console.log('user name '+userLoginInfo.userName+' password '+userLoginInfo.userPassword);
  this.http.get('https://shiv-app.herokuapp.com/authorized-users').
   subscribe(function(response){
    response=JSON.parse(response['_body']);
    console.log(JSON.stringify(response));
     checkLoggedInUser(response,userLoginInfo);
   })
  }

  function checkLoggedInUser(usersList : any,userLoginInfo: any){
   
   let matchUser=usersList.users.filter(function(user){
     return userLoginInfo.userName===user.user_name && userLoginInfo.userPassword===user.password;
   });
    console.log(matchUser);
  }

  registerNewUser(newUserInfo){
   console.log('user name '+newUserInfo.userName+' new password '+newUserInfo.newPassword+' confirm ps '+newUserInfo.confirmPassword+' shop code '+newUserInfo.shopAuthcode);
  }

}
