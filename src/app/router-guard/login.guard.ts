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
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot):  Observable<boolean | UrlTree> | 
  Promise<boolean | UrlTree> | boolean | UrlTree  {
    this.storageService.clearSession();
    let url=this.router.parseUrl('home-page/landing');
    console.log('url is '+url);
    return true;
  }
}
