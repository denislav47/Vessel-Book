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
  shipListDisplay:any = [];
  imagen: string='';
  editMode: Boolean = false;

  constructor (public apiService : ApiService) {}
  
  ngOnInit(){
    
    this.apiService.getShips().subscribe((res: any) => {
      this.shipList = res;
      this.imagen= this.shipList[0].images[0];
      this.shipListDisplay=this.shipList
      
      
    })

  }

  add(){
    let elem = document.getElementById('popup')
    if(elem){
      elem.style.display = "revert";
    } 

  }

  

  save(key:number){
    let name = document.getElementById('inName') as HTMLInputElement
    let IMO = document.getElementById('inIMO') as HTMLInputElement
    let type = document.getElementById('inType') as HTMLInputElement
    let owner = document.getElementById('inOwner') as HTMLInputElement
    let contact = document.getElementById('inContact') as HTMLInputElement
    let image = document.getElementById("newImageUp") as HTMLInputElement
    
    let data = {name: name.value, IMO: IMO.value, type: type.value, owner: owner.value, contact: contact.value, images: this.shipListDisplay[key].images.push(image.value)}
    
    console.log(data);

    delete this.shipListDisplay[key].edit
  }

  delete(){

  }

  close(){
    let elem = document.getElementById('popup')
    if(elem){
      elem.style.display = "none";
    } 
    
  }

  edit(key:number){
    console.log(key)
    
    Object.assign(this.shipListDisplay[key],{edit: true})
    console.log(this.shipListDisplay)
  }
  
  cancelEdit(key:number){
    delete this.shipListDisplay[key].edit
  }

  search(){
    let searchElement = document.getElementById("inSearch") as HTMLInputElement
    let search = searchElement.value
    console.log(this.shipList, search)
    this.shipListDisplay=[]
    this.shipList.map((element: any) =>{
      if(element.name.toLowerCase().includes(search.toLowerCase())){
        this.shipListDisplay.indexOf(element) === -1 ? this.shipListDisplay.push(element):
        console.log(element.name)
      }
    })
  }
}
