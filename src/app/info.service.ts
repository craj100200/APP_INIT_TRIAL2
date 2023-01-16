import { Injectable } from '@angular/core';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { AppInfo } from './app-info';

@Injectable()
export class InfoService {

  info: any;

  constructor(private httpBackend: HttpBackend) {}

  loadInfo(): Promise<boolean> {
    // bypass HTTP interceptors by using HttpBackend
    const http = new HttpClient(this.httpBackend);

    return (
      http
        .get<AppInfo>('/assets/info')
        // convert to Promise per Angular's `useFactory` requirement (not officially documented)
        .toPromise()
        .then(response => {
          // using a class factory to keep AppInfo class getters in place
		alert("1");
          this.info = response;
        })
        // returning `true` to satisfy `useFactory` contract (not officially documented)
        .then(_ => {  return Promise.resolve(true); } )
        .catch(error => {
          console.error('Error loading info', error);
          return Promise.resolve(false);
        })
    );
  }

setConfig(inInfo : any)
{
alert("hi"); console.log("fri service");console.log(inInfo);
this.info =  inInfo;
console.log(this.info);
}

}