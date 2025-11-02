import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-alert',
  imports: [],
  templateUrl: './alert.html',
  styleUrl: './alert.scss',
})
export class Alert {
  @Input() warning: string = "";

  @Output() warningEmitter = new EventEmitter<void>();


  clearWarning() {
    this.warningEmitter.emit()
  }

}
