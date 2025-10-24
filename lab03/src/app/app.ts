import { Component } from '@angular/core';
import { Header } from './header/header';
import { Footer } from './footer/footer';
import { MainContent } from './main-content/main-content';
import { Sidebar } from './sidebar/sidebar';

const test = "lubie";

@Component({
  selector: 'tj-root',
  imports: [Header, Footer, MainContent, Sidebar],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})


export class App {
  protected test2 = "placki";

  protected func(): string{
    const str = " "
    return test + str + this.test2
  }
}
