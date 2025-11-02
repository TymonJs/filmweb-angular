import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ProductList } from './product-list/product-list';
import { ProductForm } from './product-form/product-form';
import { Alert } from './alert/alert';

@Component({
  selector: 'app-root',
  imports: [ProductList, ProductForm, Alert],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {

  protected warning: string = "";
  protected products: string[] = [];

  onAddProduct(product: string): void {

    if (product == "") {
      this.warning = "Podaj nazwę produktu"
    }
    else if (this.products.includes(product)) {
      this.warning = `Nie można dodać kolejnego produktu: ${product}`;
    }
    else {
      this.products.push(product);
    }

  }

  onRemoveProduct(product: string) {
    this.products = this.products.filter(c => c != product);
  }

  onRemoveChecked(checkedProducts: string[]) {
    this.products = this.products.filter(c => !checkedProducts.includes(c));
  }

  clearWarning() {
    this.warning = ""
  }


}
