import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup, Validators,AsyncValidatorFn,AbstractControl,ValidationErrors } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { StorageService } from '../../services/storage.service';
import { Router, ActivatedRoute} from '@angular/router';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.css']
})
export class ShippingComponent implements OnInit {

   public shippingForm: FormGroup;
   public cityState:any;
  constructor(private apiService: ApiService,
              private storageService: StorageService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { 
   this.shippingForm= new FormGroup({
   	    fullName: new FormControl(null,[Validators.required,Validators.minLength(3),Validators.pattern(/[a-z][^!@#$%^&*_-]$/i)]),
   	    addressLine1: new FormControl(null,Validators.required),
   	    addressLine2: new FormControl(),
   	    city: new FormControl(null,[Validators.required,Validators.pattern(/[a-z][^!@#$%^&*_-]$/i)]),
   	    state: new FormControl(null,[Validators.required,Validators.pattern(/[a-z][^!@#$%^&*_-]$/i)]),
   	    zipCode: new FormControl(null,Validators.required,[this.existingMobileNumberValidator(this)]),
   	    country: new FormControl(null,[Validators.required,Validators.pattern(/[a-z][^!@#$%^&*_-]$/i)])             
   });
  }
  public existingMobileNumberValidator(componentContext ): AsyncValidatorFn {
  return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    return new Promise((resolve)=> { 
      componentContext.apiService.getApi('https://api.postalpincode.in/pincode/'+control.value).subscribe(
      response => {
         response=response[0];
         resolve(componentContext.getCityState(response));
      }
    )} );
  };
} 
  public getCityState(response){
        let validator= null;
       if(response['Status']!=='Success'){
         this.shippingForm.controls.city.setValue('');
         this.shippingForm.controls.state.setValue('');
         this.shippingForm.controls.country.setValue('');
         validator={"invalidZip": true};
       }else{
        this.cityState=response['PostOffice'][0]; 
        this.shippingForm.controls.city.setValue(this.cityState['District']);
        this.shippingForm.controls.state.setValue(this.cityState['State']);
        this.shippingForm.controls.country.setValue(this.cityState['Country']);
      }
      return validator;
  }
  public saveShippingAddress(){
    this.storageService.setShippingAddress(this.shippingForm.value);
    this.router.navigate(['payment'],{ relativeTo: this.activatedRoute.parent}).then(nav=>console.log('navigation '+nav));
  }
  ngOnInit() {
    let shippingAddress=this.storageService.getShippingAddress();
    if(shippingAddress){
      this.shippingForm.setValue(shippingAddress);
    }
  }

}
