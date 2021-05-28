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
  imagen: string='';

  constructor (public apiService : ApiService) {}
  
  ngOnInit(){
    
    this.apiService.getUsers().subscribe((res: any) => {
      this.shipList = res;
      this.imagen= this.shipList[0].images[0];
      
      
    })

  }

  click(){
    console.log('aaaaaaaaaaa');
    let elem = document.getElementById('popup')
    if(elem){
      elem.style.display = "revert";
    } 
  }

  save(){
    let name = document.getElementById('inName') as HTMLInputElement
    let IMO = document.getElementById('inIMO') as HTMLInputElement
    let type = document.getElementById('inType') as HTMLInputElement
    let owner = document.getElementById('inOwner') as HTMLInputElement
    let contact = document.getElementById('inContact') as HTMLInputElement
    let data = {name: name.value, IMO: IMO.value, type: type.value, owner: owner.value, contact: contact.value}
     
    console.log(data);
  }

  search(){
    console.log(this.shipList)
  }
}
