import {HttpClientModule, HttpHeaders} from '@angular/common/http'
import {HttpClient} from '@angular/common/http'
import {Injectable} from '@angular/core'
import { Observable } from 'rxjs/internal/Observable';
import {throwError, VirtualTimeScheduler} from 'rxjs';

export class Ship {
    IMO: String;
    name: String;
    type: String;
    owner: String;
    contact: string;    
    images: any;
  }

@Injectable()

export class ApiService {

    httpHeader = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }

    messages : any
    url= 'http://localhost:3000';
    constructor ( private http: HttpClient) {}


    getShips(): any{
      return this.http.get(this.url + '/ship');
    }

    createShip(ship:any) {
      return this.http.post<Ship>(this.url + '/ship', ship);  
    } 
    
    updateShip(ship:any, id: string){
      return this.http.put<Ship>(this.url + '/ship/' +id,ship);
    }

    deleteShip(id: string){
      return this.http.delete<Ship>(this.url + '/ship/' + id);
    }

    getTypes(): any {
      return this.http.get(this.url + '/type')
    }
      
    
}

