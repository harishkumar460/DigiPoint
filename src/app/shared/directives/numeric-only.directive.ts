import { Directive, OnInit, Input, ElementRef} from '@angular/core';

@Directive({
  selector:'[numeric-only]'
})

export class NumericOnlyDirective implements OnInit{

	constructor(elem : ElementRef){
	console.log('element '+elem);
	 elem.nativeElement.onkeydown=(evnt)=>{
	 	console.log('tester'+evnt);
	 }	
	}
   ngOnInit(){
   	console.log('numeric-only directive loaded');
   }

}