import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot,Router ,UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from '../services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

	constructor(private storageService : StorageService,
		        private router :  Router){

	}
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot):  Promise<boolean> | Observable<boolean> | boolean  {
    if (this.storageService.getLoggedInStatus()){
      return false;
    } else {
      return true;
    }
  }
}
