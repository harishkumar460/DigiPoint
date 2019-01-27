import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{

  showLoginForm =true;
  constructor(private router:Router,private apiService: ApiService) {

   }

  processLogin(userLoginInfo){
   console.log('user name '+userLoginInfo.userName+' password '+userLoginInfo.userPassword);
  this.apiService.getApi('https://shiv-app.herokuapp.com/authorized-users').
   subscribe(response=>{
    response=JSON.parse(response['_body']);
    console.log(JSON.stringify(response));
     this.checkLoggedInUser(response,userLoginInfo);
   });
  }

  checkLoggedInUser(usersList,userLoginInfo): void{
   
   let matchUser=usersList.users.filter(function(user){
     return userLoginInfo.userName===user.user_name && userLoginInfo.userPassword===user.password;
   });
    console.log(matchUser);
    if(matchUser.length){
      this.router.navigate(['home-page']).then(nav=>console.log('navigation '+nav));
     }
  }

  registerNewUser(newUserInfo){
   console.log('user name '+newUserInfo.userName+' new password '+newUserInfo.newPassword+' confirm ps '+newUserInfo.confirmPassword+' shop code '+newUserInfo.shopAuthcode);
  }

}
