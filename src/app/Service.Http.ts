import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";


@Injectable()
export class ServiceHttp {
  public url: string;
  constructor(private http: HttpClient) {
    //this.url = 'http://192.168.1.252';
    this.url = 'http://192.168.43.252';
  }
  getConnect(): Observable<any> {
    return this.http.get(this.url + '/gpio/1');
  }
  getDisconnect(): Observable<any> {
    return this.http.get(this.url + '/gpio/0');
  }
  getState():Observable<any>{
    return this.http.get(this.url + '/gpior/1');
  }
}
