"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var food_1 = require('../entities/food');
var ProductComponent = (function () {
    function ProductComponent() {
        this.onAddProduct = new core_1.EventEmitter();
        this.onRemoveProduct = new core_1.EventEmitter();
        this.selectedFoodCount = 0;
    }
    ProductComponent.prototype.ngOnInit = function () {
    };
    ProductComponent.prototype.addProduct = function () {
        this.onAddProduct.emit(this.food);
        this.selectedFoodCount += 1;
        //this.food.Point += 1;
        console.log("add product");
    };
    ProductComponent.prototype.removeProduct = function () {
        this.onRemoveProduct.emit(this.food);
        this.selectedFoodCount -= 1;
        //this.food.Point -= 1;
        console.log("remove product");
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', food_1.Food)
    ], ProductComponent.prototype, "food", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ProductComponent.prototype, "onAddProduct", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ProductComponent.prototype, "onRemoveProduct", void 0);
    ProductComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'product',
            templateUrl: '../templates/product.component.html',
            styleUrls: ['../contents/styles/product.component.css']
        }), 
        __metadata('design:paramtypes', [])
    ], ProductComponent);
    return ProductComponent;
}());
exports.ProductComponent = ProductComponent;
//# sourceMappingURL=product.component.js.map