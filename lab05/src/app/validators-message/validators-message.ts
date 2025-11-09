import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-validators-message',
  imports: [],
  templateUrl: './validators-message.html',
  styleUrl: './validators-message.scss',
})
export class ValidatorsMessage {
  @Input({required: true}) control!: AbstractControl;
  @Input({required: true}) name!: string;
}
