import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { IProduct } from '../Products/product/product';
import { ValidationService } from '../validation.service';

@Injectable({
  providedIn: 'root'
})
export class ProductresolveService implements Resolve<IProduct[]> {

  constructor(private validate: ValidationService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): IProduct[] | Observable<IProduct[]> | Promise<IProduct[]> {
    return this.validate.getproducts();
  }

}
