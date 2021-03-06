import { Component, OnInit } from '@angular/core';
import { Food } from '../../app/entities/food';
import { Order } from '../../app/entities/order';
import { FoodService } from '../../app/services/food.service';
import { OrderService } from '../../app/services/order.service';

import { Observable } from 'rxjs/Observable';
import { DragulaService } from 'ng2-dragula/ng2-dragula';

import { SocketService, EventArgs } from '../../app/services/socket.io.service';

//import { ChannelService, ConnectionState, ChannelEvent } from '../../app/services/channel.service';

//import { SignalR, SignalRConnectionBase } from 'ng2-signalr';

import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'products',
    templateUrl: 'foods.html',
    //styleUrls:['foods.scss']
})
export class FoodsPage implements OnInit {

    //connectionState$: Observable<string>;

    counter: number = 0;
    channel: string = 'T1';

    foods: Food[] = [];
    selectedFoods: Food[] = [];
    showSelectedFoods: boolean = false;
    _showMenu: boolean = false;

    showMenu() {
        console.log('show menu')
        this._showMenu = !this._showMenu;
    }

    get selectedFoodsSumPrice(): string {
        var sumPrice: number = 0;
        this.selectedFoods.forEach(food => {
            sumPrice += food.Price;
        });
        return sumPrice.toFixed(2);
    };

    priceFormat(price: number, format: number): string {
        return price.toFixed(format);
    }

    //private _connection: SignalRConnectionBase = null;
    //, private _signalR: SignalR
    //private channelService:ChannelService
    constructor(private foodService: FoodService, private orderService: OrderService, private dragulaService: DragulaService, private socketService: SocketService) {

        dragulaService.setOptions('my-bag',
            {
                copy: true
            });

        dragulaService.drop.subscribe((value) => {
            let name = value[0];
            let el = value[1] as Element;
            let inputEl = value[2] as Element;
            let outputEl = value[3] as Element;

            console.log('el');
            console.log(el);
            console.log('inputEl');

            console.log(inputEl);
            console.log('outputEl');

            console.log(outputEl);
            console.log('food-id');
            console.log(outputEl.getAttribute('food-id'));

            console.log(value);

            var food = this.foods.find(function (food) {
                return food.Id == +outputEl.getAttribute('food-id');
            })

            this.selectedFoods.push(food);
            console.log(this.selectedFoods);

            // if (inputEl)
            //     inputEl.removeChild(el);
        });



        // Let's wire up to the signalr observables
        //
        // this.connectionState$ = this.channelService.connectionState$
        //     .map((state: ConnectionState) => { return ConnectionState[state]; });

        // // Wire up a handler for the starting$ observable to log the
        // //  success/fail result
        // //
        // this.channelService.starting$.subscribe(
        //     () => { console.log("signalr service has been started"); },
        //     () => { console.warn("signalr service failed to start!"); }
        // );
    }

    ngOnInit() {
        console.log('foods ngInit');

        this.foodService.getFoods()
            .subscribe({
                next: foods => this.foods = foods,
                error: err => console.error('something wrong occurred: ' + err),
                complete: () => console.log('done')
            });


        this.socketService.eventSubject$.subscribe(((eventArgs: EventArgs) => {

            var selectFood = this.selectedFoods.find(function (food) {
                return food.Id == eventArgs.food.Id;
            });

            let food = this.foods.find((food: Food) => {
                return food.Id == eventArgs.food.Id;
            });


            if (eventArgs.eventCode == "Select") {

                if (selectFood) {
                    selectFood.Point += 1;
                }
                else {
                    this.selectedFoods.push(eventArgs.food);
                }

                food.Point = eventArgs.food.Point;

                this.counter++;
            }
            else if (eventArgs.eventCode = "UnSelect") {
                selectFood.Point--;
                selectFood.Price -= food.Price;

                food.Point = eventArgs.food.Point;

                if (selectFood.Point == 0) {
                    this.selectedFoods.splice(this.selectedFoods.indexOf(selectFood), 1);
                }
                this.counter--;
            }
        }))

        //this.channelService.start();

        // this.channelService.syncSubject$.subscribe(
        //     (foods) => {
        //         this.selectedFoods = foods;

        //         foods.forEach((selectedFood: Food) => {
        //             let food = this.foods.find((food: Food) => {
        //                 return food.Id == selectedFood.Id;
        //             });

        //             food.Point = selectedFood.Point;
        //         });

        //         console.log(this.foods);
        //     }
        // );

        // this.channelService.error$.subscribe(
        //     (error: any) => { console.warn(error); },
        //     (error: any) => { console.error("errors$ error", error); }
        // );

        // this.channelService.sub(this.channel).subscribe(
        //     (ev: ChannelEvent) => {
        //         let food = ev.Data as Food;

        //         let _food = this.selectedFoods.find((value) => {
        //             return value.Id == food.Id;
        //         });

        //         let __food = this.foods.find((value) => {
        //             return value.Id == food.Id;
        //         });

        //         if (ev.add) {
        //             if (_food) {
        //                 _food.Point += 1;
        //                 __food.Point += 1;
        //                 _food.Price += food.Price;
        //             }
        //             else {
        //                 food.Point = 1;
        //                 __food.Point = 1;
        //                 this.selectedFoods.push(food);
        //             }
        //         }
        //         else {
        //             _food.Point -= 1;
        //             __food.Point -= 1;
        //             _food.Price -= food.Price;

        //             if (_food.Point == 0) {
        //                 this.selectedFoods.splice(this.selectedFoods.indexOf(_food), 1);
        //             }
        //         }
        //     },
        //     (error: any) => {
        //         console.warn("Attempt to join channel failed!", error);
        //     });
    }

    selectProduct(food: Food) {
        this.counter++;
        this.selectedFoods.push(food);
        this.socketService.selectFood(food);

        //this.channelService.selectFood(food, 'T1');
    }

    unSelectProduct(food: Food) {

        let unSelectedFood = this.selectedFoods.find((value) => {
            return value.Id == food.Id;
        });

        //unSelectedFood.Point--;
        // unSelectedFood.Price -= food.Price;

        // if (unSelectedFood.Point == 0) {
        //     console.log('clear selected foos');
        //     this.selectedFoods.splice(this.selectedFoods.indexOf(unSelectedFood), 1);
        // }
        console.log(food);
        this.socketService.unSelect(food);
        this.counter--;
        //this.channelService.unSelectFood(food, this.channel);
    }

    displaySelectedFoods() {
        this.showSelectedFoods = !this.showSelectedFoods;
    }

    order() {
        var order = new Order();
        order.Foods = this.selectedFoods;
        order.TableId = 1;

        this.orderService.addOrder(order);

        // this.channelService.clear(this.channel);

        //this.channelService.disconnect();
    }

    drop(ev) {
        console.log("FoodId is " + ev.dataTransfer.getData("foodId"));

        let element = document.createElement("p");

        element.innerText = "Added Food with Id " + ev.dataTransfer.getData("foodId");

        let orders = document.getElementById('orders');

        orders.appendChild(element);
    }

    allowDrop(ev) {
        console.log('allow drop');
        ev.preventDefault();
    }
}