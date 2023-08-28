import { Component } from '@angular/core';
import {LogingComponent} from "../loging/loging.component";
import { DataService } from '../shared/data.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  inputValue: string = '';
  public closeLogin: LogingComponent;

  constructor(private dataService: DataService) {
  }

  closeLoginM(){
    this.closeLogin.deleteToken();
  }

  ngOnInit() {
    this.inputValue = this.dataService.getInputValue();
  }
}
