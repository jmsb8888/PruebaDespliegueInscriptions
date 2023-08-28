import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent {
  constructor(private sanitizer: DomSanitizer) {}
  imagenUrl: string = 'src/assets/3847762.jpg';
}
