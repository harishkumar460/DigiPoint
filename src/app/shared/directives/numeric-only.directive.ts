import { Directive, OnInit } from '@angular/core';

@Directive({
  selector:'numeric-only'
})

export class NumericOnlyDirective implements OnInit{

	constructor(){}
 
   ngOnInit(){
   	console.log('numeric-only directive loaded');
   }

}