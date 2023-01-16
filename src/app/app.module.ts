import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppInfo } from './app-info';


import { AppComponent } from './app.component';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { InfoService } from './info.service';


//EXPECT ALL THE .then WHICH return promise TO BE EXECUTED BEFORE OTHER STATEMENTS

function appInitializerFn(infoService: InfoService,  httpClient : HttpClient)
{
 var configString : string   = "";
return () => {
    
	return Promise.resolve(true)   //DUMMY PROMISE-YOU WILL NOT GET TO KNOW ITS SEQUENCE
	.then( (promise) => {alert("tete"); return promise; } )   //<-----RETURN SEQUENCE 1---------
	.then( _ => {configString = "bbbb";

//RETURN BELOW IS MOST IMPORTANT, IF YOU REMOVE RETURN, IT WILL RETURN ASYNCHRONOUSLY, I.E. IMMEDIATE RETURN AND WILL BE EXECUTED AFTER ALL STATEMENTS.
      return httpClient   //<----RETURN SEQUENCE 2------
        .get<AppInfo>('/assets/info').toPromise().then((resp) => {configString = resp.clientId; alert(resp.clientId);});}
	)   //COMPLETION OF CHAINED THEN
	.then(_ => infoService.setConfig(new AppInfo(configString)))
	.then(_ => alert("tetete"));
  };

}



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, FormsModule, HttpClientModule 
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFn,
      multi: true,
      deps: [InfoService, HttpClient]
    },
    InfoService
],
  bootstrap: [AppComponent]
})
export class AppModule { }
