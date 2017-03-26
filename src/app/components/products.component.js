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
var order_1 = require('../entities/order');
var food_service_1 = require('../services/food.service');
var order_service_1 = require('../services/order.service');
var channel_service_1 = require('../services/channel.service');
var ProductsComponent = (function () {
    //private _connection: SignalRConnectionBase = null;
    //, private _signalR: SignalR
    //private channelService:ChannelService
    function ProductsComponent(foodService, orderService, channelService) {
        this.foodService = foodService;
        this.orderService = orderService;
        this.channelService = channelService;
        this.channel = 'T1';
        this.foods = [];
        this.selectedFoods = [];
        this.showSelectedFoods = false;
        // Let's wire up to the signalr observables
        //
        this.connectionState$ = this.channelService.connectionState$
            .map(function (state) { return channel_service_1.ConnectionState[state]; });
        // Wire up a handler for the starting$ observable to log the
        //  success/fail result
        //
        this.channelService.starting$.subscribe(function () { console.log("signalr service has been started"); }, function () { console.warn("signalr service failed to start!"); });
    }
    Object.defineProperty(ProductsComponent.prototype, "selectedFoodsSumPrice", {
        get: function () {
            var sumPrice = 0;
            this.selectedFoods.forEach(function (food) {
                sumPrice += food.Price;
            });
            return sumPrice.toFixed(2);
        },
        enumerable: true,
        configurable: true
    });
    ;
    ProductsComponent.prototype.priceFormat = function (price, format) {
        return price.toFixed(format);
    };
    ProductsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.foodService.getFoods()
            .subscribe({
            next: function (foods) { return _this.foods = foods; },
            error: function (err) { return console.error('something wrong occurred: ' + err); },
            complete: function () { return console.log('done'); }
        });
        this.channelService.start();
        this.channelService.syncSubject$.subscribe(function (foods) {
            _this.selectedFoods = foods;
            foods.forEach(function (selectedFood) {
                var food = _this.foods.find(function (food) {
                    return food.Id == selectedFood.Id;
                });
                food.Point = selectedFood.Point;
                // console.log(food);
            });
            console.log(_this.foods);
        });
        this.channelService.error$.subscribe(function (error) { console.warn(error); }, function (error) { console.error("errors$ error", error); });
        this.channelService.sub(this.channel).subscribe(function (ev) {
            var food = ev.Data;
            var _food = _this.selectedFoods.find(function (value) {
                return value.Id == food.Id;
            });
            var __food = _this.foods.find(function (value) {
                return value.Id == food.Id;
            });
            if (ev.add) {
                if (_food) {
                    _food.Point += 1;
                    __food.Point += 1;
                    _food.Price += food.Price;
                }
                else {
                    food.Point = 1;
                    __food.Point = 1;
                    _this.selectedFoods.push(food);
                }
            }
            else {
                _food.Point -= 1;
                __food.Point -= 1;
                _food.Price -= food.Price;
                if (_food.Point == 0) {
                    _this.selectedFoods.splice(_this.selectedFoods.indexOf(_food), 1);
                }
            }
        }, function (error) {
            console.warn("Attempt to join channel failed!", error);
        });
    };
    ProductsComponent.prototype.selectProduct = function (food) {
        //this.selectedFoods.push(food);
        this.channelService.selectFood(food, 'T1');
    };
    ProductsComponent.prototype.unSelectProduct = function (food) {
        // let unSelectedFood = this.selectedFoods.find((value) => {
        //     return value.Id == food.Id;
        // });
        // unSelectedFood.Point -= 1;
        // unSelectedFood.Price -= food.Price;
        // if (unSelectedFood.Point == 0) {
        //     this.selectedFoods.splice(this.selectedFoods.indexOf(food), 1);
        // }
        this.channelService.unSelectFood(food, this.channel);
    };
    ProductsComponent.prototype.displaySelectedFoods = function () {
        this.showSelectedFoods = !this.showSelectedFoods;
    };
    ProductsComponent.prototype.order = function () {
        var order = new order_1.Order();
        order.Foods = this.selectedFoods;
        order.TableId = 1;
        this.orderService.addOrder(order);
        this.channelService.clear(this.channel);
        //this.channelService.disconnect();
    };
    ProductsComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'products',
            templateUrl: '../templates/products.component.html'
        }), 
        __metadata('design:paramtypes', [food_service_1.FoodService, order_service_1.OrderService, channel_service_1.ChannelService])
    ], ProductsComponent);
    return ProductsComponent;
}());
exports.ProductsComponent = ProductsComponent;
//# sourceMappingURL=products.component.js.map