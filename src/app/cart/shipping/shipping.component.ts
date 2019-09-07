import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { StorageService } from '../../services/storage.service';
import { Router, ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.css']
})
export class ShippingComponent implements OnInit {

   public shippingForm: FormGroup;
   public cityState:any;
   public invalidZipCodeError: boolean;
  constructor(private apiService: ApiService,
              private storageService: StorageService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { 
   this.shippingForm= new FormGroup({
   	    fullName: new FormControl(),
   	    addressLine1: new FormControl(),
   	    addressLine2: new FormControl(),
   	    city: new FormControl(),
   	    state: new FormControl(),
   	    zipCode: new FormControl(),
   	    country: new FormControl()             
   });
  }
  public getCityState(){
    this.invalidZipCodeError=false;
    this.apiService.getApi('https://api.postalpincode.in/pincode/'+this.shippingForm.controls.zipCode.value).
     subscribe(response=>{
       console.log(JSON.stringify(response)); 
       response=response[0];
       if(response['Status']!=='Success'){
         this.invalidZipCodeError=true;
         this.shippingForm.controls.city.setValue('');
         this.shippingForm.controls.state.setValue('');
         this.shippingForm.controls.country.setValue('');
       }else{
        this.cityState=response['PostOffice'][0]; 
        this.shippingForm.controls.city.setValue(this.cityState['District']);
        this.shippingForm.controls.state.setValue(this.cityState['State']);
        this.shippingForm.controls.country.setValue(this.cityState['Country']);
      }
     });
  }
  public saveShippingAddress(){
    this.storageService.setShippingAddress(this.shippingForm.value);
    this.router.navigate(['payment'],{ relativeTo: this.activatedRoute.parent}).then(nav=>console.log('navigation '+nav));
  }
  ngOnInit() {
    
  }

}
