import { Component , VERSION } from '@angular/core';
import { InfoService } from './info.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  name = 'Angular ' + VERSION.major + ' with APP_INITIALIZER';

  constructor(infoService: InfoService) {
	alert("test1");
	alert(infoService.info.clientId);
	alert("test2");
    console.log('infoService', infoService.info);
  }
}
