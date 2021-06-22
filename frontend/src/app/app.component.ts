import { Component, Input } from '@angular/core';
import { ApiService } from '../services/api.service'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title : 'frontend'
  imagesPath: String = '../assets/images/';

  // ARRAY WITH ALL THE SHIP DATA TO DISPLAY
  shipListDisplay: any = [];
  shipList: any = [];

  types: any = []

  // ARRAY WITH THE IMAGES TO DISPLAY
  imagesList: any = []
  slideIndex: any = [];

  editMode: Boolean = false;
  isPopup: boolean = false;
  saveValid: boolean = false;
  saveNewValid: boolean = false;

  deleteKey: number = -1;
  imageAddKey: number;

  confPopup:any = 'none' ;
  popup: any = 'none' ;

  searchIn:String = '';

  newName:any = '';
  newIMO:any = '';
  newType:any = '';
  newOwner:any = '';
  newContact:any = '';
  newImageIn:any = '';

  inName:any = '';
  inIMO:any = '';
  inType:any = '';
  inOwner:any = '';
  inContact:any = '';
  inImageIn:any = '';
  getFile:any;


  constructor(public apiService: ApiService) { }

  ngOnInit() {


    this.getTypes();

  }

  getTypes() {
    this.apiService.getTypes().subscribe((res: any) => {
      if (res != []) {
        this.types = res;
      }
      this.getAll();
    })
  }

  // GETS ALL SHIPS DATA
  getAll() {
    // SAVE ALL THE DATA INTO SHIPLISTDISPLAY ARRAY
    this.apiService.getShips().subscribe((res: any) => {
      if (res != []) {
        this.shipListDisplay = res;
        this.shipList = this.shipListDisplay
      }
      this.shipListDisplay.forEach((element: any) => {

        // SPLIT IMO STRING INTO NUMBERS ONLY

        if (element.IMO.toLowerCase().includes('imo')) {
          if ((element.IMO.toLowerCase().includes('imo '))) {
            element.IMO = element.IMO.split(" ", 2)[1]
          } else {
            element.IMO = element.IMO.split("imo", 2)[1]
          }


        }

        // IF A SHIP HAS NOT IMAGES, SHOWS A DEFAULT ONE 
        if (element != undefined){
          if (element.images[0] == undefined) {
            this.imagesList.push(this.imagesPath + 'nop.jpg')
          } else {
            this.imagesList.push(element.images[0])
          }
        }
        

        this.slideIndex.push(0)

      });

    })
  }

  plusDivs(n: number, key: number) {
    if ((n > 0 && this.slideIndex[key] < this.shipListDisplay[key].images.length - 1)
      || (n < 0 && this.slideIndex[key] > 0)) {
      this.slideIndex[key] += n;
      this.imagesList[key] = this.shipListDisplay[key].images[this.slideIndex[key]]
    }

  }

  // SHOWS POPUP TO ADD NEW SHIP 
  add() {
    this.popup = 'revert';
    this.isPopup = true;

  }

  // CALLS INPUT ELEMENT CLICK FUNCTION
  newImage() {
    let imageIn = document.getElementById('newImageUp')
    if (imageIn) {
      imageIn.click()
    }
  }

  // SAVE NEW SHIP
  saveNew() {
    let data
    // INPUT ELEMENTS

    let images: any = [];

    let imoExists = false

    // REGEX VALIDATION
    let emailRegex = new RegExp("^[\\w\\.]+@(gmail.com|hotmail.com|icb.bg)$")
    let imoRegex = new RegExp("^(IMO|imo|Imo|)?[\\s]?[0-9]{7}$")


    // CHECK IF ALL INPUTS HAVE DATA AND MATCH THE REGEX
    if (this.newName, this.newIMO, this.newType, this.newOwner, this.newContact != undefined) {
      if (this.newContact.toLowerCase().match(emailRegex) && (this.newIMO.match(imoRegex))) {
        this.saveNewValid = false;

        // CHECK IF IMO ALREADY EXISTS
        this.shipListDisplay.forEach((element: any) => {
          if ((this.newIMO.indexOf(element.IMO) > -1)) {
            imoExists = true
            this.newIMO = '';
            this.saveNewValid = true;
          }
        });

        if (!imoExists) {
          // IF THERE IS NO IMAGE, SAVES A DEFAULT ONE
          if (this.newImageIn != '') {
            images.push(this.imagesPath + this.newImageIn.split('C:\\fakepath\\', 2)[1]);
          } else {
            images.push(this.imagesPath + 'nop.jpg');
          }
          // OBJECT THAT IS SAVED TO THE DB
          data = { name: this.newName, IMO: this.newIMO, type: this.newType, owner: this.newOwner, contact: this.newContact, images: images }
          this.apiService.createShip(data).subscribe(data => {
            let ship = data

            if (ship.IMO.toLowerCase().includes('imo')) {
              ship.IMO = ship.IMO.split("imo", 2)[1]
            }

            this.shipListDisplay.push(ship)
            this.shipList = this.shipListDisplay

            this.imagesList.push(images)


          });

          // HIDE POPUP
          this.popup = 'none';
          this.isPopup = false

          this.newName = '';
          this.newIMO= '';
          // type.value='';
          this.newOwner = '';
          this.newContact = '';
          this.newImageIn = '';
        }



        // ELSE SHOW VALIDATIO ERRORS TO THE USER
      } else {
        this.saveNewValid = false
        if (!this.newContact.match(emailRegex)) {
          if (this.newContact != null) {
            this.saveNewValid = true
          }
        }


        if (!this.newIMO.match(imoRegex)) {
          if (this.newIMO != null) {
            this.saveNewValid = true
          }
        }


      }
    }

  }



  // SAVE EDITED SHIP DATA
  save(key: number) {
    

    let imoExists = false

    let emailRegex = new RegExp("^[\\w\\.]+@(gmail.com|hotmail.com|icb.bg)$")
    let imoRegex = new RegExp("^(IMO|imo|Imo|)?[\\s]?[0-9]{7}$")

    if (this.inName, this.inIMO, this.inType, this.inOwner, this.inContact != undefined) {
      if (this.inContact.toLowerCase().match(emailRegex) && (this.inIMO.match(imoRegex)))  {
        this.saveValid = false;

        let _newIMO = this.inIMO;
        if (_newIMO.toLowerCase().includes('imo')) {
          _newIMO = _newIMO.split("imo", 2)[1]
        }

        if (_newIMO != this.shipListDisplay[key].IMO) {
          this.shipListDisplay.forEach((element: any) => {
            if ((_newIMO.indexOf(element.IMO) > -1)) {
              imoExists = true
              this.inIMO = '';
              this.saveValid = true;
            }
          });


          if (!imoExists) {
            let data = { name: this.inName, IMO: this.inIMO, type: this.inType, owner: this.inOwner, contact: this.inContact }

            this.apiService.updateShip(data, this.shipListDisplay[key]._id).subscribe(data => {
              let ship = data
              if (ship.IMO.toLowerCase().includes('imo')) {
                ship.IMO = ship.IMO.split("imo", 2)[1]
              }
              this.shipListDisplay[key] = ship
              this.shipList = this.shipListDisplay
            })
          }
        } else {
          let data = { name: this.inName, type: this.inType, owner: this.inOwner, contact: this.inContact }
          this.apiService.updateShip(data, this.shipListDisplay[key]._id).subscribe(data => {
            let ship = data
            if (ship.IMO.toLowerCase().includes('imo')) {
              ship.IMO = ship.IMO.split("imo", 2)[1]
            }
            this.shipListDisplay[key] = ship
          })
        }

        // REMOVE EDIT MODE FROM THE SHIP CARD
        delete this.shipListDisplay[key].edit
      } else {
        this.saveValid = false;
        if (!this.inContact.match(emailRegex)) {
          if (this.inContact != null) {
            this.saveValid = true
          }
        }


        if (!this.inIMO.match(imoRegex)) {
          if (this.inIMO != null) {
            this.saveValid = true
          }
        }


      }
    }


  }

  // ASSIGN EDIT MODE TO THE SHIP CARD
  edit(key: number) {
    this.inName = this.shipListDisplay[key].name
    this.inIMO = this.shipListDisplay[key].IMO
    this.inContact = this.shipListDisplay[key].contact
    this.inOwner = this.shipListDisplay[key].owner
    this.inType = this.shipListDisplay[key].types
    
    
    Object.assign(this.shipListDisplay[key], { edit: true })
  }

  // REMOVE EDIT MODE FROM THE SHIP CARD
  cancelEdit(key: number) {

    delete this.shipListDisplay[key].edit
  }

  // GET THE CARD ID TO UPLOAD THE IMAGE
  uploadImage(key: number) {
    this.imageAddKey = key
    let imageIn = document.getElementById('getFile')
    if (imageIn) {
      imageIn.click()
    }

  }

  // ADDS AN IMAGE IN THE IMAGES ARRAY OF THE SELECTED SHIP
  addImage() {
    let imagesArray = this.shipListDisplay[this.imageAddKey].images
    let cont = 0
    let url = this.getFile
    imagesArray.forEach((element: any) => {
      if (element == '../assets/images/nop.jpg') {
        imagesArray.splice(cont, 1)
      }
      cont++
    });
    
    imagesArray.push(this.imagesPath + url.split('C:\\fakepath\\', 2)[1]);
    
    // UPLOADS THE UPDATED ARRAY INTO THE DB
    this.apiService.updateShip({ images: imagesArray }, this.shipListDisplay[this.imageAddKey]._id).subscribe(data => {
      this.shipListDisplay[this.imageAddKey] = data
      this.shipList = this.shipListDisplay
      console.log('PETO AQUI')
    })

    // DISPLAY THE UPDATED IMAGES ARRAY
    //this.imagesList[this.imageAddKey] = this.shipListDisplay[this.imageAddKey].images[0]

    if (this.slideIndex[this.imageAddKey] == 0) {
      this.plusDivs(1, this.imageAddKey);
    } else {
      this.plusDivs(-1, this.imageAddKey);
    }

    this.imageAddKey = -1;
    let btnOK = document.getElementById("saveEdidBtn")
    if (btnOK != null) {
      btnOK.click()
    }

  }

  // REMOVE IMAGE FROM THE SHIP OBJECT
  removeImage(key: number) {

    let isLastImage = false

    if (this.shipListDisplay[key].images.length <= 1) {
      isLastImage = true
    }

    // UPDATES THE SHIP OBJECT WITH THE NEW IMAGES ARRAY
    this.shipListDisplay[key].images.splice(this.slideIndex[key], 1)

    let imagesArray = this.shipListDisplay[key].images
    this.apiService.updateShip({ images: imagesArray }, this.shipListDisplay[key]._id).subscribe(data => {
      this.shipListDisplay[this.imageAddKey] = data
      this.shipList = this.shipListDisplay
    })

    if (this.slideIndex[key] == 0) {
      this.plusDivs(1, key);
    } else {
      this.plusDivs(-1, key);
    }

    // IF THE SHIP HAS NO MORE IMAGES, SHOWS A DEFAULT ONE
    if (isLastImage) {
      this.shipListDisplay[key].images = this.imagesPath + 'nop.jpg'

    }
    this.imagesList[key] = this.shipListDisplay[key].images
    let btnOK = document.getElementById("saveEdidBtn")
    if (btnOK != null) {
      btnOK.click()
    }
    this.imageAddKey = -1;
  }

  // REMOVES A SHIP AFTER CONFIRMATION
  delete() {
    this.apiService.deleteShip(this.shipListDisplay[this.deleteKey]._id);

    this.shipListDisplay.splice(this.deleteKey, 1);
    this.deleteKey = -1;
    this.shipList = this.shipListDisplay
    this.closeConf();
  }

  // SHOWS DELETE CONFIRMATION POPUP AND SAVES THE KEY OF THE SHIP
  deleteConf(key: any) {
    this.deleteKey = key
    this.confPopup = 'revert';
  }

  // CLOSES THE DELETE CONFIRMATION POPUP
  closeConf() {
    this.confPopup = 'none';
    this.deleteKey = -1;
  }

  // CLOSES THE 'ADD NEW' POPUP
  close() {

    this.newName = '';
    this.newIMO = '';
    this.newOwner = '';
    this.newContact = '';
    this.newImageIn = '';


    this.popup = 'none';
    this.isPopup = false;

  }

  // SEARCH SHIPS BY NAME OR IMO
  search() {
    this.shipListDisplay = []
    this.imagesList = []
    this.shipList.map((element: any) => {
      if (element.name.toLowerCase().includes(this.searchIn.toLowerCase()) || element.IMO.toLowerCase().includes(this.searchIn.toLowerCase())) {
        if (element.images[0] == undefined) {
          this.imagesList.push('../assets/images/nop.jpg')
        } else {
          this.imagesList.push(element.images[0])
        }

        this.shipListDisplay.indexOf(element) === -1 ? this.shipListDisplay.push(element) :
          console.log();
      }

    })
  }

}
