import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service'


@Component({
  selector: 'messages',
  templateUrl: './messages.component.html'
})
export class MessagesComponent {
  title = 'frontendосбб';
  

  constructor (public apiService : ApiService) {}


  ngOnInit(){
    this.apiService.getMessages();
  }
}
