import { Component, OnInit } from '@angular/core';
import { CartService } from '../Service/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {


  public products: any = [];
  public grandTotal !: number;
  public UserName: any = localStorage.getItem('UserName');



  constructor(private CartService: CartService) { }



  ngOnInit(): void {
    this.getCartdetails(this.UserName);
  }
  getCartdetails(UserName: string) {
    this.CartService.getcart(UserName)
      .subscribe((res: any) => {
        this.products = res;
        this.grandTotal = this.CartService.getTotalPrice();

      })
  }

  /* removeItem(item: any) {
     this.CartService.removeCartItem(item);
   }*/
  deleteEmployee(productID: number) {
    this.CartService.deleteproduct(productID).subscribe({
      next: () => {
        alert("Deleted Successfully..!");
        this.getCartdetails(this.UserName);
      }
    })
  }
  emptycart() {
    this.CartService.removeAllCart();
  }




  /*ngOnInit(): void {
    this.CartService.getCart(UserName)
      .subscribe(res => {
        this.products = res;
        this.grandTotal = this.CartService.getTotalPrice();

      })
  }
  removeItem(item: any) {
    this.CartService.removeCartItem(item);
  }
  emptycart() {
    this.CartService.removeAllCart();
  }*/

}
