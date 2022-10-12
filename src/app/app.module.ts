import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { UsercredRoutingModule } from './usercred/usercred-routing.module';
import { UsercredModule } from './usercred/usercred.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//import { HeaderComponent } from './header/header.component';
import { CartComponent } from './cart/cart.component';
import { LogoutComponent } from './logout/logout.component';
import { ProductComponent } from './Products/product/product.component';
import { ProductresolveService } from './Service/productresolve.service';


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    //HeaderComponent,
    CartComponent,
    LogoutComponent,
    ProductComponent
  
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule, UsercredRoutingModule, UsercredModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: 'cart', component: CartComponent },
      { path: 'logout', component: LogoutComponent },
      {
        path: 'product', component: ProductComponent, resolve: { product: ProductresolveService }},
      
    ]),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
