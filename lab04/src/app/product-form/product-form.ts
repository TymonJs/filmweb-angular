import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-form',
  imports: [FormsModule, CommonModule],
  templateUrl: './product-form.html',
  styleUrl: './product-form.scss',
})
export class ProductForm {

  protected product: string = "";
  @Output() addProduct = new EventEmitter<string>();

  onSubmit() {
    this.addProduct.emit(this.product)
    this.product = "";
  }
}
