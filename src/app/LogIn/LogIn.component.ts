import { Component } from "@angular/core";
import { ServiceLogin } from "../Service.Login";
import { Router } from "@angular/router";

@Component({
  selector: 'app-LogIn',
  templateUrl: './LogIn.component.html',
  styleUrls: ['./LogIn.component.css']
})
export class AppComponentLogin {
  hide: boolean;
  username: string;
  password: string;
  warnMessage: string;
  bolOk:boolean;
  constructor(private _serviceLogin: ServiceLogin,
    private _router: Router) {
    console.log("Log In component");
    if ((this._serviceLogin.getUsername() != null && this._serviceLogin.getUsername() != ''))
      this._router.navigate(["/Device"]);
    this.hide = true;
    this.bolOk=false;
    this.username = "";
    this.password = "";
  }
  onClick() {
    console.log(this.username + " " + this.password);
    let sw = this._serviceLogin.LogIn(this.username, this.password);
    if (sw){
      this._serviceLogin.saveUser(this.username,this.password);
      this._router.navigate(["/Device"]);
    }
    else
      this.ShowWarnMessage("The username or password are wrong!!!");
  }
  ShowWarnMessage(message: string) {
    this.warnMessage = message;
    this.bolOk=true;
    let aux=this;
    setTimeout(() => {
      aux.bolOk=false;
    }, 3000);
  }
}
