import { Component, OnInit, signal, ViewChild } from '@angular/core';
import { ClockComponent } from "./clock-component/clock-component";
import { Time } from './time.interface';

@Component({
  selector: 'app-root',
  imports: [ClockComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
    protected format: '12' | '24' = '24';
    protected clockVisible = false;

    @ViewChild(ClockComponent) clockComponent!: ClockComponent;
    protected lastTime!: Time;

    removeClock(){
        if (this.clockComponent){
            this.lastTime = this.clockComponent.time
            this.format = this.clockComponent.format
            
            if (this.format == "12") this.lastTime.hour = this.lastTime.hour % 12 || 12;

            this.clockVisible = false;
            
        }
    }

    createClock(){
        this.clockVisible = true;
    }
}
