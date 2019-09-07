import { Component, OnInit ,Input} from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
@Component({
  selector: 'delivery-modal',
  templateUrl: './delivery-modal.component.html',
  styleUrls: ['./delivery-modal.component.css']
})
export class DeliveryModalComponent implements OnInit {

  @Input() modal;
  constructor(private router:Router,private activatedRoute : ActivatedRoute) 
  { }

  public navigateToShipping(){
  	this.modal.dismiss();
  	this.router.navigate(['shipping'],{ relativeTo: this.activatedRoute}).then(nav=>console.log('navigation '+nav));
  }
  
  ngOnInit() {
  }

}
