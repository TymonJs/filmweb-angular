import { Component, signal } from '@angular/core';
import { Header } from './header/header';
import { Footer } from './footer/footer';
import { MainContent } from './main-content/main-content';
import { Sidebar } from './sidebar/sidebar';

@Component({
  selector: 'app-root',
  imports: [Header, Footer, MainContent, Sidebar],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
