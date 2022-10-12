import { HttpClient, HttpHeaders} from '@angular/common/http';
//import { error } from '@angular/compiler/src/util';
import { Component, Inject, OnInit } from '@angular/core';
import { EmailValidator, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUsers } from '../../../IUser';


import { ValidationService } from '../../validation.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup | any;
  Status: any;
  user: IUsers ;

  public status: boolean = false;

  constructor(private fb: FormBuilder, private _validate: ValidationService, private access: Router, private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {

    this.user = { Email: '', Password: '', Phone:'',UserName:'',appcode:'' };
  }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      UserName: ['', [Validators.required]],
      Email: ['', [Validators.required, ValidationService.validateEmail]],
      Phone: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      Password: ['', Validators.required]
    });

  }
  onRegister(): void {
    /* if (this.registerForm.valid) {
       this._validate.postregister(this.registerForm.value).subscribe({
         next: (result: any) => {
           this.registerForm.reset();
         },
         error: () => {
           alert("Error while adding")
         }
       })
     }*/

    
    console.log("Testing............");
    this.user = {
      Email: this.registerForm.get('Email').value,
      Password: this.registerForm.get('Password').value,
      Phone: this.registerForm.get('Phone').value,
      UserName: this.registerForm.get('UserName').value,
      appcode : "JAMES"
    };

    this.http.post<boolean>(this.baseUrl + 'home/createuser', this.user).subscribe((r) => { this.status = r; console.log(r); });

    this.http.post<string>(this.baseUrl + 'home/CreateUsers', this.user, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }).subscribe(
      result => {
        this.Status = JSON.parse(result);
        console.log('[Home-Controller-(CreateUsers-ActionMethod)]>>returned  Value-->' + this.Status);

      }, error => console.error(error));
  

    alert("Registration Successful.Re-directing to login page for login....!")
    this._validate.UserName.next(this.registerForm.get('UserName').value);
    this.access.navigate(['/login'])
    console.log(this.registerForm.value) 

  }




  /*onregisterclick(): void {
*//*    this._validate.postData().subscribe((d: any) => { this.registerForm = d; })
    this._validate.isLogin.next(true);
    this.route.navigate(['/login']);
*//*
    this.http.post<string>(this.baseUrl + 'Home/CreateUser', this.registerForm, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).subscribe(result => {
      this.status = JSON.stringify(result);
      console.log(result);
    })


  }*/


 
}


