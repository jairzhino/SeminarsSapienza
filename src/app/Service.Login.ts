import { Injectable } from "@angular/core";

@Injectable()
export class ServiceLogin {
  private username: string;
  private password: string;
  constructor() {
    this.username = "gerson";
    this.password = "gersonjair";
  }
  getUsername(): string {
    try {
      return localStorage.getItem("username");
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  saveUser(username: string, password: string) {
    try {
      localStorage.setItem("username", username);
      localStorage.setItem("password", password);
    } catch (error) {
      console.log(error);
    }
  }
  LogIn(username: string, password: string): boolean {
    try {
      let bolok = false;
      if (username == this.username && password == this.password)
        bolok = true;
      return bolok;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  LogOut(){
    try {
      localStorage.removeItem("username");
      localStorage.removeItem("password");
    } catch (error) {
      console.log(error);
    }
  }
}
