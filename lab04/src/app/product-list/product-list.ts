import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
    selector: 'app-product-list',
    imports: [FormsModule, CommonModule],
    templateUrl: './product-list.html',
    styleUrl: './product-list.scss',
})
export class ProductList {
    @Input() products: string[] = [];

    protected checkedProducts: string[] = [];

    @Output() removeEmitter = new EventEmitter<string>();
    @Output() removeCheckedEmitter = new EventEmitter<string[]>();

    onRemoveProduct(product: string): void {
        this.removeEmitter.emit(product);
        this.checkedProducts = this.checkedProducts.filter(c => c != product)

    }

    onCheckedProduct(product: string): void {
        let seen = false;
        this.checkedProducts = this.checkedProducts.reduce((acc: string[], c: string) => {
            if (c == product) {
                seen = true;
                return [...acc];
            }
            return [...acc, c];
        }, [])

        if (!seen) this.checkedProducts.push(product);

        console.log("Checked: " + this.checkedProducts);

    }

    onRemoveChecked(): void {
        this.removeCheckedEmitter.emit(this.checkedProducts);

        this.checkedProducts = [];
    }

}
