import { Component } from '@angular/core';
import { ServiceHttp } from './Service.Http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  bolswitch1: boolean;
  strimg: string;
  constructor(private httpservice: ServiceHttp) {
    this.bolswitch1 = false;
    this.strimg = '';
  }
  SwitchOn() {
    this.httpservice.getConnect().subscribe(
      b => {
        console.log(b);
        this.bolswitch1 = true;
        this.ChangeState();
      }
    );
  }
  SwitchOff() {
    this.httpservice.getDisconnect().subscribe(
      b => {
        console.log(b);
        this.bolswitch1 = false;
        this.ChangeState();
      }
    );
  }
  ChangeState() {
    if (this.bolswitch1) {
      this.strimg = "assets/plugConnected.jpg";
    }
    else {
      this.strimg = "assets/plugDisconnect.jpg";
    }
  }
}
