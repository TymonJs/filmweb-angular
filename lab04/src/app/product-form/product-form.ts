import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-form',
  imports: [FormsModule, CommonModule],
  templateUrl: './product-form.html',
  styleUrl: './product-form.scss',
})
export class ProductForm {
  protected product: string = '';
  protected products: string[] = [];

  onSubmit(): void {
    this.products.push(this.product);
    this.product = '';
  }
}
