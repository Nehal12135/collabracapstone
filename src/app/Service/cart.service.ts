import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ICart } from '../cart/ICart';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public cartItemList: any = []
  public productList = new BehaviorSubject<any>([]);
  public search = new BehaviorSubject<string>("");

  constructor(private http: HttpClient) { }
  getProducts() {
    return this.productList.asObservable();
  }

  setProduct(product: any) {
    this.cartItemList.push(...product);
    this.productList.next(product);
  }
  //addtoCart(product: any) {
  //  this.cartItemList.push(product);
  //  this.productList.next(this.cartItemList);
  //  this.getTotalPrice();
  //  console.log(this.cartItemList)
  //}
  getTotalPrice(): number {
    let grandTotal = 0;
    this.cartItemList.map((a: any) => {
      grandTotal += a.total;
    })
    return grandTotal;
  }
  removeCartItem(product: any) {
    this.cartItemList.map((a: any, index: any) => {
      if (product.id === a.id) {
        this.cartItemList.splice(index, 1);
      }
    })
    this.productList.next(this.cartItemList);
  }
  removeAllCart() {
    this.cartItemList = []
    this.productList.next(this.cartItemList);
  }
  adddtoCart(cart: ICart) {
    console.log(cart);


    //const headers = new Headers();
    //headers.append('Access-Control-Allow-Origin', '*');
    //headers.append('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    //headers.append('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token');
    //headers.append('Content-Type', 'application/json');
    //let options = new RequestOptions({ headers: headers });
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
      .set('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS')

    return this.http.post<string>("https://producdts.com/api/Cart/addtocart", cart, { 'headers': headers })
  };
  deleteproduct(productID: number) {
    return this.http.delete<any>("https://producdts.com/api/Cart")
  }
  getcart(UserName:string): Observable<ICart[]> {
    return this.http.get<ICart[]>("https://producdts.com/api/Cart?UserName="+UserName)
  };

}
