import { Component } from '@angular/core';
import { ApiService } from '../services/api.service'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  imagesPath:String = '../assets/images/';
  shipList:any = [];
  shipListDisplay:any = [];
  imagen: string='';
  editMode: Boolean = false;

  constructor (public apiService : ApiService) {}
  
  ngOnInit(){
    
    this.getAll();

  }

  getAll(){
    console.log('GET ALL')
    this.apiService.getShips().subscribe((res: any) => {
      console.log(res)
      if(res!=[]){
        this.shipList = res;
        this.imagen= this.shipList[0].images[0];
        this.shipListDisplay=this.shipList
      }
      
    })
  }

  add(){
    let elem = document.getElementById('popup')
    if(elem){
      elem.style.display = "revert";
    } 

  }

  saveNew(){
    let data 
    let name = document.getElementById('newName') as HTMLInputElement
    let IMO = document.getElementById('newIMO') as HTMLInputElement
    let type = document.getElementById('newType') as HTMLInputElement
    let owner = document.getElementById('newOwner') as HTMLInputElement
    let contact = document.getElementById('newContact') as HTMLInputElement
    let image = document.getElementById("newImageUp") as HTMLInputElement
    let images : any = [];
    
    if (image.value!=undefined){
      images.push(this.imagesPath+image.value.split('C:\\fakepath\\',2)[1]);
    }
    data = {name: name.value, IMO: IMO.value, type: type.value, owner: owner.value, contact: contact.value, images: images}
    console.log(data);
    this.apiService.createShip(data);

    this.apiService.getShips().subscribe((res: any) => {
      console.log('GET ships')
      this.shipList = res;
      this.imagen= this.shipList[0].images[0];
      this.shipListDisplay=this.shipList 
      console.log(this.shipListDisplay)
    })
   
  }

  

  save(key:number){
    let name = document.getElementById('inName') as HTMLInputElement
    let IMO = document.getElementById('inIMO') as HTMLInputElement
    let type = document.getElementById('inType') as HTMLInputElement
    let owner = document.getElementById('inOwner') as HTMLInputElement
    let contact = document.getElementById('inContact') as HTMLInputElement
    let image = document.getElementById("imageUp") as HTMLInputElement
    
    let data = {name: name.value, IMO: IMO.value, type: type.value, owner: owner.value, contact: contact.value, images: this.shipListDisplay[key].images.push(image.value)}
    
    console.log(data);

    delete this.shipListDisplay[key].edit
  }

  

  delete(key:any){
    console.log(this.shipListDisplay)
    console.log(key)
    
    this.apiService.deleteShip(this.shipListDisplay[key]._id);
    //this.shipListDisplay.splice(key)
    
    this.apiService.getShips().subscribe((res: any) => {
      console.log('GET ships')
      this.shipListDisplay=[]
      this.shipList=[]
      this.shipList = res;
      this.imagen= this.shipList[0].images[0];
      this.shipListDisplay=this.shipList
    })
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
