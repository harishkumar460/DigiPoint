import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SharedService {

	cartCounter: Subject<any>;
  constructor() {
    this.cartCounter=new Subject<any>();

   }
}
