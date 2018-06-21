import { Component } from '@angular/core';
import { ServiceHttp } from '../Service.Http';
import { Router } from '@angular/router';
import { ServiceLogin } from '../Service.Login';

@Component({
  selector: 'app-device',
  templateUrl: './Device.component.html',
  styleUrls: ['./Device.component.css']
})
export class DeviceComponent {
  title = 'app';
  bolswitch1: boolean;
  strimg: string;
  bolconnect: boolean;
  imgArrays: string[];
  strimgDevice: string;
  constructor(private httpservice: ServiceHttp,
    private _router: Router,
    private _serviceLogin: ServiceLogin) {
    if (!(this._serviceLogin.getUsername() != null && this._serviceLogin.getUsername() != ''))
      this._router.navigate(["/LogIn"]);
    this.bolswitch1 = false;
    this.bolconnect = false;
    this.strimg = 'assets/waiting.gif';

    this.imgArrays = ['assets/aire.png', 'assets/heladera.png',
    'assets/lavadora.png','assets/ventilador.jpg', 'assets/lampara.png'];
    if (localStorage.getItem('imagen') == null)
      localStorage.setItem('imagen', 'assets/aire.png');
    this.strimgDevice = localStorage.getItem('imagen');
    this.Init();
  }
  Init() {
    try {
      this.httpservice.getState().subscribe(
        b => {
          console.log(b.pin1);
          this.bolswitch1 = !b.pin1;
          this.ChangeState();
          this.bolconnect = true;

        },
        error => {
          console.log('error service ' + JSON.stringify(error));
          this.strimg = "assets/NoConnection.png";
        }
      );
    } catch (error) {
      console.log('try catch ' + error);
    }

  }
  LogOut() {

  }
  Select(image:string){
    localStorage.setItem('imagen', image);
    this.strimgDevice = localStorage.getItem('imagen');
  }
  SwitchOn() {
    this.httpservice.getConnect().subscribe(
      b => {
        console.log(b);
        this.bolswitch1 = false;
        this.ChangeState();
      }
    );
  }
  SwitchOff() {
    this.httpservice.getDisconnect().subscribe(
      b => {
        console.log(b);
        this.bolswitch1 = true;
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
