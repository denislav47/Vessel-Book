import { Component, Input } from '@angular/core';
import { ApiService } from '../services/api.service'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  imagesPath:String = '../assets/images/';

  // ARRAY WITH ALL THE SHIP DATA TO DISPLAY
  shipListDisplay:any = [];
  shipList: any = [];

  types : any = []

  // ARRAY WITH THE IMAGES TO DISPLAY
  imagesList:any = []
  slideIndex:any = [];

  editMode: Boolean = false;
  isPopup:boolean = false;
  
  deleteKey:number = -1;
  imageAddKey:number;
  
  

  constructor (public apiService : ApiService) {}
  
  ngOnInit(){
    

    this.getTypes();

  }  

  getTypes(){
    this.apiService.getTypes().subscribe((res:any) => {
      if(res!=[]){
        this.types = res;
      }
      this.getAll();
    })
  }

  // GETS ALL SHIPS DATA
  getAll(){ 
    // SAVE ALL THE DATA INTO SHIPLISTDISPLAY ARRAY
    this.apiService.getShips().subscribe((res: any) => {
      if(res!=[]){
        this.shipListDisplay = res;
        this.shipList = this.shipListDisplay
      }
      this.shipListDisplay.forEach((element: any) => {

        // SPLIT IMO STRING INTO NUMBERS ONLY
        if (element.IMO.toLowerCase().includes('imo')) {
          element.IMO = element.IMO.split("imo",2)[1]
        }        
        
        // IF A SHIP HAS NOT IMAGES, SHOWS A DEFAULT ONE 
        if (element.images[0]==undefined){
          this.imagesList.push( this.imagesPath+'nop.jpg')
        } else {
          this.imagesList.push(element.images[0])
        }
        
        this.slideIndex.push(0)

      });
      
    })
  }

  plusDivs(n:number,key:number) {
    if((n>0 && this.slideIndex[key]<this.shipListDisplay[key].images.length-1)
      || (n<0 && this.slideIndex[key]>0)){
      this.slideIndex[key] += n;
      this.imagesList[key] = this.shipListDisplay[key].images[this.slideIndex[key]]
    }
    
  }

  // SHOWS POPUP TO ADD NEW SHIP 
  add(){
    let elem = document.getElementById('popup')
    if(elem){
      elem.style.display = "revert";
    } 
    this.isPopup=true;

  }

  // CALLS INPUT ELEMENT CLICK FUNCTION
  newImage() {
    let imageIn = document.getElementById('newImageUp')
    if (imageIn){
      imageIn.click()
    }
  }

  // SAVE NEW SHIP
  saveNew(){
    let data 
    // INPUT ELEMENTS
    let name = document.getElementById('newName') as HTMLInputElement
    let IMO = document.getElementById('newIMO') as HTMLInputElement
    let type = document.getElementById('inNewType') as HTMLInputElement
    let owner = document.getElementById('newOwner') as HTMLInputElement
    let contact = document.getElementById('newContact') as HTMLInputElement
    let image = document.getElementById("newImageUp") as HTMLInputElement
    let images : any = [];

    let imoExists = false

    // REGEX VALIDATION
    let emailRegex = new RegExp("^[\\w\\.]+@(gmail.com|hotmail.com|icb.bg)$") 
    let imoRegex = new RegExp("^(IMO|imo|Imo|)?[\\s]?[0-9]{7}$")

    
    // CHECK IF ALL INPUTS HAVE DATA AND MATCH THE REGEX
    if(name.value, IMO.value, type.value, owner.value, contact.value != undefined){
        if(contact.value.toLowerCase().match(emailRegex)&&(IMO.value.match(imoRegex))){

          // CHECK IF IMO ALREADY EXISTS
          this.shipListDisplay.forEach((element: any) => {
            if((IMO.value.indexOf(element.IMO ) > -1) ){
              imoExists = true
              IMO.value='';
              IMO.placeholder = 'IMO already exists'
              IMO.classList.add('validationFail');
            }
          });

          if (!imoExists){
            // IF THERE IS NO IMAGE, SAVES A DEFAULT ONE
            if (image.value!=''){
              images.push(this.imagesPath+image.value.split('C:\\fakepath\\',2)[1]);
            } else {
              images.push(this.imagesPath+'nop.jpg');
            }
            // OBJECT THAT IS SAVED TO DE DB
            data = {name: name.value, IMO: IMO.value, type: type.value, owner: owner.value, contact: contact.value, images: images}
            this.apiService.createShip(data).subscribe(data => {
              let ship = data
              
              if (ship.IMO.toLowerCase().includes('imo')) {
                ship.IMO = ship.IMO.split("imo",2)[1]
              }   

              this.shipListDisplay.push(ship)
              this.shipList = this.shipListDisplay
              
              this.imagesList.push(images)
              
            
            });
        
            // HIDE POPUP
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
          }

          

          // ELSE SHOW VALIDATIO ERRORS TO THE USER
      }else {
        contact.classList.remove("validationFail");
        IMO.classList.remove("validationFail");
        if(!contact.value.match(emailRegex)){
          if (contact != null){
            contact.classList.add('validationFail');
          }
        }
          
        
        if (!IMO.value.match(imoRegex)){
          if (IMO != null){
            IMO.classList.add('validationFail');
          }
        }

        
      }
    }  
   
  }

  

  // SAVE EDITED SHIP DATA
  save(key:number){
    let name = document.getElementById('inName') as HTMLInputElement
    let IMO = document.getElementById('inIMO') as HTMLInputElement
    let type = document.getElementById('inType') as HTMLInputElement
    let owner = document.getElementById('inOwner') as HTMLInputElement
    let contact = document.getElementById('inContact') as HTMLInputElement

    let imoExists = false
    
    let emailRegex = new RegExp("^[\\w\\.]+@(gmail.com|hotmail.com|icb.bg)$") 
    let imoRegex = new RegExp("^(IMO|imo|Imo|)?[\\s]?[0-9]{7}$")

    if(name.value, IMO.value, type.value, owner.value, contact.value != undefined){
      if(contact.value.match(emailRegex)&&(IMO.value.match(imoRegex))){

        let newIMO = IMO.value
        if (newIMO.toLowerCase().includes('imo')) {
          newIMO = newIMO.split("imo",2)[1]
        }

        if (newIMO != this.shipListDisplay[key].IMO){
          this.shipListDisplay.forEach((element: any) => {
            if((newIMO.indexOf(element.IMO ) > -1) ){
              imoExists = true
              IMO.value='';
              IMO.placeholder = 'IMO already exists'
              IMO.classList.add('validationFail');
            }
          });


          if (!imoExists){
            let data = {name: name.value, IMO: IMO.value, type: type.value, owner: owner.value, contact: contact.value}
  
            this.apiService.updateShip(data,this.shipListDisplay[key]._id).subscribe(data =>{
              let ship = data
              if (ship.IMO.toLowerCase().includes('imo')) {
                ship.IMO = ship.IMO.split("imo",2)[1]
              } 
              this.shipListDisplay[key] = ship
              this.shipList = this.shipListDisplay
            })
          }
        } else {
          let data = {name: name.value, type: type.value, owner: owner.value, contact: contact.value}
          this.apiService.updateShip(data,this.shipListDisplay[key]._id).subscribe(data =>{
            let ship = data
            if (ship.IMO.toLowerCase().includes('imo')) {
              ship.IMO = ship.IMO.split("imo",2)[1]
            } 
            this.shipListDisplay[key] = ship
          })
        } 

        // REMOVE EDIT MODE FROM THE SHIP CARD
        delete this.shipListDisplay[key].edit
      } else {
        contact.classList.remove("validationFail");
        IMO.classList.remove("validationFail");
        if(!contact.value.match(emailRegex)){
          if (contact != null){
            contact.classList.add('validationFail');
          }
        }
          
        
        if (!IMO.value.match(imoRegex)){
          if (IMO != null){
            IMO.classList.add('validationFail');
          }
        }

        
      }
    }
    
    
  }

  // ASSIGN EDIT MODE TO THE SHIP CARD
  edit(key:number){
    Object.assign(this.shipListDisplay[key],{edit: true})
    // al editar se queda el primer valor del dropdown en vez de el del barco
  }
  
  // REMOVE EDIT MODE FROM THE SHIP CARD
  cancelEdit(key:number){
    let type = document.getElementById('optionType') as HTMLInputElement
    let sele = document.getElementById('inType') as HTMLInputElement
    delete this.shipListDisplay[key].edit
  }

  // GET THE CARD ID TO UPLOAD THE IMAGE
  uploadImage(key:number){
    this.imageAddKey=key
    let imageIn = document.getElementById('getFile')
    if (imageIn){
      imageIn.click()
    }

  }

  // ADDS AN IMAGE IN THE IMAGES ARRAY OF THE SELECTED SHIP
  addImage(){
    let image = document.getElementById("getFile") as HTMLInputElement
    let imagesArray = this.shipListDisplay[this.imageAddKey].images
    let cont=0
    imagesArray.forEach((element: any) => {
      if(element == '../assets/images/nop.jpg'){
        imagesArray.splice(cont,1)
      }
      cont++
    });

    imagesArray.push(this.imagesPath+image.value.split('C:\\fakepath\\',2)[1]);

    // UPLOADS THE UPDATED ARRAY INTO THE DB
    this.apiService.updateShip({images :imagesArray},this.shipListDisplay[this.imageAddKey]._id).subscribe(data =>{
      this.shipListDisplay[this.imageAddKey] = data
      this.shipList = this.shipListDisplay
    })
    
    // DISPLAY THE UPDATED IMAGES ARRAY
    this.imagesList[this.imageAddKey] = this.shipListDisplay[this.imageAddKey].images[0] 

    if(this.slideIndex[this.imageAddKey]==0){
      this.plusDivs(1,this.imageAddKey);
    } else {
      this.plusDivs(-1,this.imageAddKey);
    }

    this.imageAddKey=-1;
    let btnOK = document.getElementById("saveEdidBtn")
    if (btnOK!= null){
      btnOK.click()
    }
    
  }

  // REMOVE IMAGE FROM THE SHIP OBJECT
  removeImage(key:number){

    let isLastImage = false

    if(this.shipListDisplay[key].images.length <=1){
      isLastImage = true
    }
    
    // UPDATES THE SHIP OBJECT WITH THE NEW IMAGES ARRAY
    this.shipListDisplay[key].images.splice(this.slideIndex[key],1)

    let imagesArray = this.shipListDisplay[key].images
    this.apiService.updateShip({images :imagesArray},this.shipListDisplay[key]._id).subscribe(data =>{
      this.shipListDisplay[this.imageAddKey] = data
      this.shipList = this.shipListDisplay
    })

    if(this.slideIndex[key]==0){
      this.plusDivs(1,key);
    } else {
      this.plusDivs(-1,key);
    }

    // IF THE SHIP HAS NO MORE IMAGES, SHOWS A DEFAULT ONE
    if(isLastImage){
      this.shipListDisplay[key].images = this.imagesPath+'nop.jpg'
      
    }
    this.imagesList[key] = this.shipListDisplay[key].images
    let btnOK = document.getElementById("saveEdidBtn")
    if (btnOK!= null){
      btnOK.click()
    }
    this.imageAddKey=-1;
  }

  // REMOVES A SHIP AFTER CONFIRMATION
  delete(){
    this.apiService.deleteShip(this.shipListDisplay[this.deleteKey]._id);
    
    this.shipListDisplay.splice(this.deleteKey,1);
    this.deleteKey = -1;
    this.shipList = this.shipListDisplay
    this.closeConf();
  }

  // SHOWS DELETE CONFIRMATION POPUP AND SAVES THE KEY OF THE SHIP
  deleteConf(key:any){
    this.deleteKey = key
    let elem = document.getElementById('confPopup')
    if(elem){
      elem.style.display = "revert";
    } 
  }

  // CLOSES THE DELETE CONFIRMATION POPUP
  closeConf(){
    let elem = document.getElementById('confPopup')
    if(elem){
      elem.style.display = "none";
    } 
    this.deleteKey = -1;
  }

  // CLOSES THE 'ADD NEW' POPUP
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

  // SEARCH SHIPS BY NAME OR IMO
  search(){
    let aux = this.imagesList
    let searchElement = document.getElementById("inSearch") as HTMLInputElement
    let search = searchElement.value
    this.shipListDisplay=[]
    this.imagesList=[]
    this.shipList.map((element: any) =>{
      if(element.name.toLowerCase().includes(search.toLowerCase())|| element.IMO.toLowerCase().includes(search.toLowerCase())){
        if (element.images[0] == undefined){
          this.imagesList.push('../assets/images/nop.jpg')
        } else {
          this.imagesList.push(element.images[0])
        }
        
        this.shipListDisplay.indexOf(element) === -1 ? this.shipListDisplay.push(element):
        console.log('bbb')
      }
      
    })
  }

}
