import { Component, OnInit } from '@angular/core';
import { CurrentUserService } from '../service/current-user-service';
import { skip } from 'rxjs';

@Component({
  selector: 'app-alert-component',
  imports: [],
  templateUrl: './alert-component.html',
  styleUrl: './alert-component.scss',
})
export class AlertComponent implements OnInit {

  protected isAlertActive = false

  constructor(private CurrentUserService: CurrentUserService){}

  ngOnInit(): void {
    this.CurrentUserService.user$.pipe(skip(1)).subscribe((res) => {
      this.isAlertActive = true;
      setTimeout(() => {
        this.isAlertActive = false;
      }, 5000);
    })
  }
}
