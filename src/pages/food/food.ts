import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Food } from '../../app/entities/food';

@Component({
    selector: 'product',
    templateUrl: 'food.html',
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
        this.food.Point += 1;        
        this.onAddProduct.emit(this.food);
        this.selectedFoodCount += 1;
        console.log("add product");
    }
    removeProduct() {
        console.log(this.food.Point);
        this.selectedFoodCount -= 1;
        this.food.Point -= 1;
        console.log(this.food);        
        this.onRemoveProduct.emit(this.food);        
        console.log("remove product");
    }
    drag(ev){
        ev.dataTransfer.setData("foodId", this.food.Id);
        console.log('Drag start FoodId is '+this.food.Id);
    }
}