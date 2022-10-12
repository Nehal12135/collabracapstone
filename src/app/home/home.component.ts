import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {

  constructor(private _http: HttpClient, @Inject('BASE_URL') private x: string) {

  }

  onclick() {

    this._http.get<string>(this.x + "home/fetchdata").subscribe((r) => { console.log(r); });

  }
}
