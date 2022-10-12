import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IUsers } from '../../../IUser';

import { ValidationService } from '../../validation.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup | any;
  user: IUsers | any;
  accessToken: string | any;
  retVal: string | any;
  public Status: boolean | any;
    access: any;


  constructor(private fb: FormBuilder, private _validate: ValidationService, private route: Router, private http: HttpClient,
    @Inject('BASE_URL') private baseurl: string, private activatedroute: ActivatedRoute) { }


  ngOnInit(): void {

    this.loginForm = this.fb.group({
      UserName: [''],
      Email: 'asd@gmail.com',
      Phone: '7878',
      Password: [''],
      appcode: 'sdsad'
    });


  
    this.accessToken = '';
  }



  loginclick() {
    console.log("Testing for logging")
    this.http.post<string>(this.baseurl + 'home/LoginUser', this.loginForm.value).subscribe((r) => {
      this.Status = r; console.log(r);
      this.retVal = r;

      if (r != null) {
        this.accessToken = JSON.stringify(r[0]);
        console.log("retVal[0] :" + this.accessToken);
        console.log("this.retVal[1] :" + JSON.stringify(r[1]));
        this._validate.login(this.accessToken, JSON.stringify(r[1]), this.loginForm.get("UserName").value);
      }

      
    });
    this._validate.UserName.next(this.loginForm.get('UserName').value);
    //this.route.navigate([''])

  }
}



