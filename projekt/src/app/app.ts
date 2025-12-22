import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { HeaderComponent } from "./core/header/header.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ButtonModule, ToggleSwitchModule, HeaderComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('projekt');
}
