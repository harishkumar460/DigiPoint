export interface CartObject {

  cartId:string,
  items:any,
  totalAmount:number,
  netPayAmount:number,
  totalTax:number
}
export interface CartMethods {

  display() : string
}