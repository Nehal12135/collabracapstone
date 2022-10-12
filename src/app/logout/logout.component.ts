import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ValidationService } from '../validation.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private validate: ValidationService, private route: Router) { }

  ngOnInit(): void {
    this.validate.isLogin.next(false);
    this.route.navigate(['/'])
  }

}
