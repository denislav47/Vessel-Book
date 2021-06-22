import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let ships: any;
  let types: any;
  let mockService: any;
  let ship: any;
  let key:number;



  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
    ship = {
      _id: "60c1fb7e70d7510628a042d9",
      IMO: "8451612",
      name: "Angualr",
      type: "Tanker",
      images: ["../assets/images/lng-shi.jpg", "../assets/images/msc.jpg"],
      owner: "Tester",
      contact: "unit@hotmail.com"
    }
    ships = [
      {
        _id: "60b75ef9c953b041b440ffb2",
        IMO: "8451612",
        name: "Test",
        type: "Tanker",
        images: ["../assets/images/lng-shi.jpg", "../assets/images/msc.jpg"],
        owner: "Test",
        contact: "test@hotmail.com"
      },
      {
        _id: "60ba1d03a2bb714fac6b4c9a",
        IMO: "8451612",
        name: "Unit",
        type: "Tanker",
        images: ["../assets/images/lng-shi.jpg", "../assets/images/msc.jpg"],
        owner: "Angular",
        contact: "angular@hotmail.com"
      }
    ]

    types = [
      { _id: "60c757a3c05a9193e58c2214", name: "Tanker" },
      { _id: "60c75786c05a9193e58c2213", name: "Cruise" }
    ]
    key = 0;
    mockService = jasmine.createSpyObj(['getShips', 'getTypes', 'deleteShip', 'updateShip', 'createShip']);
    component = new AppComponent(mockService);
    component.isPopup = false;
    component.deleteKey = 1;
    component.imageAddKey = 0;
    component.getFile = "C\\fakepath\\OIP.jpg"
    component.shipListDisplay = ships;
    component.imagesList = ["../assets/images/lng-shi.jpg", "../assets/images/msc.jpg"]

    
    component.newName = "hkjjblpioner";
    component.newIMO = "3334586";
    component.newType = "Tanker";
    component.newOwner = "MylyulyulLS";
    component.newContact = "yulyulyuly@hotmail.com";
    component.newImageIn = "../assets/images/lng-shi.jpg";
  });

  describe('get types', () => {
    it('should get all types', () => {
      mockService.getTypes.and.returnValue(of(types));
      mockService.getShips.and.returnValue(of(ships));
      component.getTypes();
      expect(component.types.length).toBe(2);
    });
  });

  describe('get ships', () => {
    it('should get all ships', () => {
      component.shipListDisplay = []
      mockService.getShips.and.returnValue(of(ships));
      component.getAll();
      expect(component.shipListDisplay.length).toBe(2);
    });
  });

  describe('open popup', () => {
    it('should isPopup be true', () => {
      component.add();
      expect(component.isPopup).toBeTrue();
    });
  });

  describe('save new ship', () => {
    it('should add new ship to shiplist', () => {
      mockService.createShip.and.returnValue(of(ship))
      component.saveNew();
      expect(component.shipListDisplay.length).toBe(3);
    });
  });

  describe('assign edit mode to object', () => {
    it('should edit be true', () => {
      component.edit(0);
      expect(component.shipListDisplay[0].edit).toBeTrue();
    });
  });

  describe('remove edit mode to object', () => {
    it('should edit be undefined', () => {
      component.cancelEdit(0);
      expect(component.shipListDisplay[0].edit).toBeUndefined();
    });
  });

  describe('upload image', () => {
    it('should upload image and image index be -1', () => {
      mockService.updateShip.and.returnValue(of(ships));
      component.uploadImage(key);
      expect(component.imageAddKey).toBeLessThanOrEqual(0);
    });
  });

  describe('add image', () => {
    it('should add image and image index be -1', () => {
      mockService.updateShip.and.returnValue(of(ships));
      component.addImage();
      expect(component.imageAddKey).toBe(-1);
    });
  }); 

  describe('remove image', () => {
    it('should remove image and image index be -1', () => {
      mockService.updateShip.and.returnValue(of(ships));
      component.removeImage(0);
      expect(component.imageAddKey).toBe(-1);
    });
  });

  describe('delete', () => {
    it('should delete ship', () => {
      mockService.deleteShip.and.returnValue(of(true));
      component.shipListDisplay = ships;

      component.deleteKey = 1;
      component.delete();
      expect(component.shipListDisplay.length).toBe(1);
    });
  });

  describe('delete confirmation', () => {
    it('should deleted key be equal to input', () => {
      component.deleteConf(key);
      expect(component.deleteKey).toBe(key);
    });
  });

  describe('close conf', () => {
    it('should deleted key be -1', () => {

      component.closeConf();
      expect(component.deleteKey).toBe(-1);
    });
  });

  describe('close add', () => {
    it('should isPopup be false', () => {
      component.close();
      expect(component.isPopup).toBeFalse();
    });
  });

});