import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Food } from '../entities/food';

@Component({
    selector: 'product',
    templateUrl: '../../app/templates/food.component.html',
    //styleUrls: ['../contents/styles/food.component.css']
})
export class FoodComponent implements OnInit {

    @Input() food: Food;
    @Output() onAddProduct = new EventEmitter<Food>();
    @Output() onRemoveProduct = new EventEmitter<Food>();

    selectedFoodCount: number = 0;

    ngOnInit() {
    }

    addProduct() {
        this.onAddProduct.emit(this.food);
        this.selectedFoodCount += 1;
        //this.food.Point += 1;
        console.log("add product");
    }
    removeProduct() {
        this.onRemoveProduct.emit(this.food);
        this.selectedFoodCount -= 1;
        //this.food.Point -= 1;
        console.log("remove product");
    }
}