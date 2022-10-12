import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';

const routes: Routes = [
  { path: '', component: ProductComponent }
];

@NgModule({
  declarations: [
    ProductComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    RouterModule.forChild(routes)
  ]
})
export class ProductModule { }
