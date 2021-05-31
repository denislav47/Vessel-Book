import {HttpClientModule} from '@angular/common/http'
import {HttpClient} from '@angular/common/http'
import {Injectable} from '@angular/core'
import { Observable } from 'rxjs/internal/Observable';

// export class User {
//     id!: string;
//     name!: string;
//     email!: string;
//     phone!: number;
//   }

@Injectable()

export class ApiService {

    messages : any
    url= 'http://localhost:3000';
    constructor ( private http: HttpClient) {}


    getShips(): any{
        return this.http.get(this.url + '/ship');
    }

    createShip(): any {
      
    }
}