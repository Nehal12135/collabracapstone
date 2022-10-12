import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICart } from '../../cart/ICart';
import { CartService } from '../../Service/cart.service';
import { ProductService } from '../../Service/product.service';
import { ValidationService } from '../../validation.service';
import { IProduct } from './product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products: IProduct[] = [];
  cart: ICart | any;
  totalItem: number = 0;
  items: any
  retVal: string = '';

  constructor(private validate: ValidationService, private atr: ActivatedRoute, private _cartService: CartService, private _productService: ProductService) {
  
  }
  ngOnInit(): void {

    this._productService.getProducts().subscribe(data => this.products = data);
    this.products = this.atr.snapshot.data['product']
    this.cart = {
      productID: 1000, productName: 'x', productPrice: 10, imageUrl: 'x',
      quantity: 10, totalPrice: 10, UserName: ''
    }

  }  
     /*addtocart(data: any) {
      this._cartService.addtoCart(data);
  }*/

  adddtoCart(productID: number, productName: string,productPrice: number,  imageUrl: string) {
    this.cart = {
      productID: productID, productName: productName, productPrice: productPrice, imageUrl: imageUrl, quantity: 1,
      totalPrice: 10, UserName: localStorage.getItem('UserName')?.toString()
    }
    console.log("fsfs");
    console.log(this.cart);
    this._cartService.adddtoCart(this.cart).subscribe((d) => {
      this.retVal = d; console.log("XXXXXX------->");

      console.log(this.cart);
      this.validate.cartcount.subscribe((r) => { this.totalItem = r; });
      this.validate.cartcount.next(this.totalItem + 1);
      console.log(d); alert('Product Added Successfully!');
    });
  }

  }

