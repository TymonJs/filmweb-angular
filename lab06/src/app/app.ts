import { Component, OnInit, signal } from '@angular/core';
import { ClockComponent } from "./clock-component/clock-component";

@Component({
  selector: 'app-root',
  imports: [ClockComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
    protected format: '12' | '24' = '24';
    protected clockVisible = false;

    removeClock(){
        this.clockVisible = false;
    }

    createClock(){
        this.clockVisible = true;
    }
}
