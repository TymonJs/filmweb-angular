import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Time } from '../time.interface';

@Component({
    selector: 'app-clock-component',
    imports: [],
    templateUrl: './clock-component.html',
    styleUrl: './clock-component.scss',
})
export class ClockComponent implements OnInit, OnChanges{

    @Input({ required: true }) public format!: '12' | '24';
    @Input({ required: true }) clockVisible!: boolean;

    protected time: Time = {hour: 0, minute: 0, second: 0};
    protected date: Date = new Date();
    protected interval: number | undefined;

    constructor(){
        this.updateClock();
    }

    ngOnInit(): void {
      this.startTimer();
    }
    ngOnChanges(changes: SimpleChanges): void {
        for (let prop in changes){
            console.log(prop, changes[prop]);
            
        }
        
    }

    changeFormat(){
      if (this.format === '24'){
          this.format = '12';
      }
      else{
          this.format='24';
      }
      this.updateClock()
    }

    updateClock(){
        this.time.hour = this.date.getHours();
        if (this.format == "12") this.time.hour = this.time.hour % 12 || 12;
        
        this.time.minute = this.date.getMinutes();
        this.time.second = this.date.getSeconds();
    }

    stopTimer(){
        clearInterval(this.interval);
        this.interval = undefined;
    }

    startTimer(check = false){
        this.date = new Date();
        if (check && this.interval) return
        
        this.updateClock();
        const inter = setInterval(() => {
            this.date.setSeconds(this.date.getSeconds() + 1);
            
            this.updateClock()
      },1000)
      this.interval = inter;
    }

}
