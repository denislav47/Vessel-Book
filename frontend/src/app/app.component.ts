import { Component } from '@angular/core';
import { ApiService } from '../services/api.service'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontendосбб';

  shipList:any = [];

  constructor (public apiService : ApiService) {}
  
  ngOnInit(){
    
    this.apiService.getUsers().subscribe((res: any) => {
      this.shipList = res;
      
      console.log(this.shipList[0].name);
      
    })
  }
}
