import { Component } from '@angular/core';
import { ValidationService } from '../validation.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  isExpanded = false;
  isLoggedInCheck: Boolean = false;

/*  public totalItem: number = 0;*/

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
  constructor(private behaviour: ValidationService) {

  }
  ngOnInit() {
    this.behaviour.isLogin.subscribe((d) => { this.isLoggedInCheck = d; });
  }
}
