import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'myDemoApp';
  constructor(private router:Router){

  }
  ngOnInit(){
  this.router.navigate(['home-page/landing']).then(nav=>console.log('navigation '+nav));
  }
  
}
