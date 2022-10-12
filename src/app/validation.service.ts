import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { IProduct } from './Products/product/product';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  public isLogin: BehaviorSubject<Boolean>
    = new BehaviorSubject<Boolean>(false);

  public UserName: BehaviorSubject<string>
    = new BehaviorSubject<string>('');


  constructor(private http: HttpClient, private router: Router) { }

/*  postregister(register: any) {
    return this.http.post<any>("http://alpha.payg.com/JWT-MS/api/auth/register", register)
  }
*/

  postregister(register: any) {
    return this.http.post<any>("https://localhost:7185/api/Register", register)
  }

  postlogin(login: any) {
    return this.http.post<any>("http://alpha.payg.com/JWT-MS/api/auth/login",login)
  }

/*  getProduct() {
    return this.http.get<any>("https://fakestoreapi.com/products")
  }*/
/*
  postData(): Observable<any> {
    
    return this.http.get("http://payg.com/api/Register");
  }

*/
  static validateEmail(controls: AbstractControl): { [key: string]: any } | null {
    const email: string = controls.value;
    const domain = email != null ? email.substring(email.lastIndexOf('@') + 1) : "";
    if (domain.toLowerCase() === 'payg.com') {
      return null;
    }
    else {
      return { 'validateEmail': true };
    }
  }


  login(accessToken: string, AccessTokenExpirationDate: string, UserName: string) {
    console.log("true----------------->", this.isLogin.value);
    this.isLogin.next(true);
    localStorage.setItem('AccessToken', accessToken);
    localStorage.setItem('AccessTokenExpirationDate', AccessTokenExpirationDate);
    localStorage.setItem('UserName', UserName);
    this.UserName.next(UserName);
    console.log("LoggedIn Value : " + this.isLogin.value);
    this.router.navigate(['/']);
  }
  getproducts(): Observable<IProduct[]>{
    return this.http.get<IProduct[]>("https://producdts.com/api/Product/")
  }

}
