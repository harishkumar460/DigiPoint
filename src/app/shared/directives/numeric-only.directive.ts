import { Directive, OnInit, Input, ElementRef} from '@angular/core';

@Directive({
  selector:'[numeric-only]'
})

export class NumericOnlyDirective implements OnInit{

	constructor(elem : ElementRef){
	console.log('element '+elem);
	 elem.nativeElement.onkeypress=(evnt)=>{
	 	const regx = new RegExp('[^0-9]','g');
	 	return !regx.test(evnt.key);
	 }	
	}
   ngOnInit(){
   	console.log('numeric-only directive loaded');
   }

}