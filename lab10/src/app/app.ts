import { Component, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { FooterComponent } from "./footer-component/footer-component";
import { NavbarComponent } from "./navbar-component/navbar-component";
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [FooterComponent, NavbarComponent, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {

  constructor(protected location: Location){}

  goBack(){
    this.location.back()
  }
}
