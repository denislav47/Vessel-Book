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
  imagesList:any = []
  editMode: Boolean = false;
  slideIndex:any = [];
  deleteKey:number = -1;

  constructor (public apiService : ApiService) {}
  
  ngOnInit(){
    
    this.getAll();

  }

  plusDivs(n:number,key:number) {
    if((n>0 && this.slideIndex[key]<this.shipListDisplay[key].images.length-1)
      || (n<0 && this.slideIndex[key]>0)){
      this.slideIndex[key] += n;
      this.imagesList[key] = this.shipListDisplay[key].images[this.slideIndex[key]]
    }
    
  }

  

  getAll(){
    console.log('GET ALL')
    this.apiService.getShips().subscribe((res: any) => {
      console.log(res.length)
      if(res!=[]){
        this.shipList = res;
        this.shipListDisplay=this.shipList
      }
      this.shipListDisplay.forEach((element: any) => {
        this.imagesList.push(element.images[0])
        console.log(this.imagesList)
        this.slideIndex.push(0)
      });
      
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
    this.apiService.createShip(data).subscribe(data => {
      console.log(data);
      this.shipListDisplay.push(data)
    });

    let elem = document.getElementById('popup')
    if(elem){
      elem.style.display = "none";
    } 

    name.value='';
    IMO.value='';
    type.value='';
    owner.value='';
    contact.value='';
    image.value='';
   
  }

  

  save(key:number){
    let name = document.getElementById('inName') as HTMLInputElement
    let IMO = document.getElementById('inIMO') as HTMLInputElement
    let type = document.getElementById('inType') as HTMLInputElement
    let owner = document.getElementById('inOwner') as HTMLInputElement
    let contact = document.getElementById('inContact') as HTMLInputElement
    
    
    let data = {name: name.value, IMO: IMO.value, type: type.value, owner: owner.value, contact: contact.value}
    
    console.log(data);

    this.apiService.updateShip(data,this.shipListDisplay[key]._id).subscribe(data =>{
      this.shipListDisplay[key] = data
    })

    delete this.shipListDisplay[key].edit
  }

  uploadImage(key:number){
    console.log('me llaman')
    let imageIn = document.getElementById('getFile')
    if (imageIn){
      imageIn.click()
    }
    let image = document.getElementById("getFile") as HTMLInputElement
    console.log(image.value)
    let imagesArray = this.shipListDisplay[key].images
    if (image.value!=undefined){
      imagesArray.push(this.imagesPath+image.value.split('C:\\fakepath\\',2)[1]);
    }
    console.log(imagesArray)

    this.apiService.updateShip({images :imagesArray},this.shipListDisplay[key]._id).subscribe(data =>{
      // this.shipListDisplay[key] = data
      console.log(data)
    })

  }

  removeImage(key:number){
    console.log(this.slideIndex[key])
    console.log(this.imagesList[key]);
    for (let i = 0; i <  this.slideIndex.length; i++) {
      if (this.imagesList[key] === this.slideIndex[i]) console.log(i);
    }
    //BUSCAR LA IMAGEN A BORRAR EN EL ARRAY, ELIMINARLA Y HACER UPDATE CON EL ARRAY SIN LA IMAGEN
  }

  delete(){
    
    this.apiService.deleteShip(this.shipListDisplay[this.deleteKey]._id);
    
    this.shipListDisplay.splice(this.deleteKey,1);
    this.deleteKey = -1;
    this.closeConf();
  }

  deleteConf(key:any){
    this.deleteKey = key
    let elem = document.getElementById('confPopup')
    if(elem){
      elem.style.display = "revert";
    } 
  }

  closeConf(){
    let elem = document.getElementById('confPopup')
    if(elem){
      elem.style.display = "none";
    } 
    this.deleteKey = -1;
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
      if(element.name.toLowerCase().includes(search.toLowerCase())|| element.IMO.toLowerCase().includes(search.toLowerCase())){
        this.shipListDisplay.indexOf(element) === -1 ? this.shipListDisplay.push(element):
        console.log(element.name)
      }
      
    })
  }
}
