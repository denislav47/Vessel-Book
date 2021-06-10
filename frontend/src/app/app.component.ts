import { Component, Input } from '@angular/core';
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
  imageAddKey:number;
  isPopup:boolean = false;

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
        
        if (element.images[0]==undefined){
          this.imagesList.push( this.imagesPath+'nop.jpg')
        } else {
          this.imagesList.push(element.images[0])
        }
        
        // console.log(this.imagesList)
        this.slideIndex.push(0)
      });
      
    })
  }

  add(){
    let elem = document.getElementById('popup')
    if(elem){
      elem.style.display = "revert";
    } 
    this.isPopup=true;

  }

  newImage() {
    let imageIn = document.getElementById('newImageUp')
    if (imageIn){
      imageIn.click()
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
    
    let emailRegex = new RegExp("^[\\w\\.]+@(gmail.com|hotmail.com|icb.bg)$") 
    let imoRegex = new RegExp("^(IMO|imo|Imo|)?[\\s]?[0-9]+$")

    if(name.value, IMO.value, type.value, owner.value, contact.value != undefined){
        if(contact.value.match(emailRegex)&&(IMO.value.match(imoRegex))){
          console.log(image.value)
          if (image.value!=''){
            images.push(this.imagesPath+image.value.split('C:\\fakepath\\',2)[1]);
          } else {
            images.push(this.imagesPath+'nop.jpg');
          }
          data = {name: name.value, IMO: IMO.value, type: type.value, owner: owner.value, contact: contact.value, images: images}
          console.log(data);
          this.apiService.createShip(data).subscribe(data => {
            let ship = data
            console.log(ship);
            this.shipListDisplay.push(ship)
            
            this.imagesList.push(images)
            
          
          });
      
          let elem = document.getElementById('popup')
          if(elem){
            elem.style.display = "none";
            this.isPopup=false
          } 
      
          name.value='';
          IMO.value='';
          type.value='';
          owner.value='';
          contact.value='';
          image.value='';


      } else {
        console.log('no data')
        //DAR ERROR AL USUARIO
      }
    }

    

    
   
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
    console.log('me llaman',key, this.shipListDisplay)

    this.imageAddKey=key
    let imageIn = document.getElementById('getFile')
    if (imageIn){
      imageIn.click()
    }

  }

  addImage(){
    let image = document.getElementById("getFile") as HTMLInputElement
    console.log(image.value)
    let imagesArray = this.shipListDisplay[this.imageAddKey].images
    let cont=0
    imagesArray.forEach((element: any) => {
      console.log(element)
      if(element == '../assets/images/nop.jpg'){
        console.log('true')
        imagesArray.splice(cont,1)
      }
      cont++
    });

    imagesArray.push(this.imagesPath+image.value.split('C:\\fakepath\\',2)[1]);

    this.apiService.updateShip({images :imagesArray},this.shipListDisplay[this.imageAddKey]._id).subscribe(data =>{
      this.shipListDisplay[this.imageAddKey] = data
      console.log(data)
    })
    
    this.imagesList[this.imageAddKey] = this.shipListDisplay[this.imageAddKey].images[0] 

    if(this.slideIndex[this.imageAddKey]==0){
      this.plusDivs(1,this.imageAddKey);
    } else {
      this.plusDivs(-1,this.imageAddKey);
    }

    this.imageAddKey=-1;
    console.log('he llegado')
    let btnOK = document.getElementById("saveEdidBtn")
    if (btnOK!= null){
      btnOK.click()
    }
    
  }

  removeImage(key:number){
    // console.log(key)
    // console.log(this.slideIndex[key])
    // console.log(this.imagesList[key]);

    let isLastImage = false
    console.log(this.shipListDisplay[key].images.length)
    if(this.shipListDisplay[key].images.length <=1){
      isLastImage = true
    }
    
    console.log(this.shipListDisplay[key].images[this.slideIndex[key]])

    this.shipListDisplay[key].images.splice(this.slideIndex[key],1)

    let imagesArray = this.shipListDisplay[key].images
    this.apiService.updateShip({images :imagesArray},this.shipListDisplay[key]._id).subscribe(data =>{
      // this.shipListDisplay[key] = data
      console.log(data)
    })
    if(this.slideIndex[key]==0){
      this.plusDivs(1,key);
    } else {
      this.plusDivs(-1,key);
    }
    
    if(isLastImage){
      this.shipListDisplay[key].images = this.imagesPath+'nop.jpg'
      this.imagesList[key] = this.shipListDisplay[key].images
    }
    let btnOK = document.getElementById("saveEdidBtn")
    if (btnOK!= null){
      btnOK.click()
    }
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
    
    let name = document.getElementById('newName') as HTMLInputElement
    let IMO = document.getElementById('newIMO') as HTMLInputElement
    let type = document.getElementById('newType') as HTMLInputElement
    let owner = document.getElementById('newOwner') as HTMLInputElement
    let contact = document.getElementById('newContact') as HTMLInputElement
    let image = document.getElementById("newImageUp") as HTMLInputElement

    name.value='';
    IMO.value='';
    type.value='';
    owner.value='';
    contact.value='';
    image.value='';
    
    
    let elem = document.getElementById('popup')
    if(elem){
      elem.style.display = "none";
      this.isPopup=false;
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
    //console.log(this.shipList, search)
    this.shipListDisplay=[]
    this.shipList.map((element: any) =>{
      if(element.name.toLowerCase().includes(search.toLowerCase())|| element.IMO.toLowerCase().includes(search.toLowerCase())){
        this.shipListDisplay.indexOf(element) === -1 ? this.shipListDisplay.push(element):
        console.log(element.name)
      }
      
    })
  }
}
