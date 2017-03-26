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
var http_1 = require('@angular/http');
var Rx_1 = require('rxjs/Rx');
require('rxjs/add/operator/map');
require('rxjs/add/operator/catch');
var OrderService = (function () {
    function OrderService(http) {
        this.http = http;
        this.url = 'http://192.168.10.107:8080/api/Orders';
    }
    Object.defineProperty(OrderService.prototype, "RequestOptions", {
        get: function () {
            var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
            return new http_1.RequestOptions({ headers: headers });
        },
        enumerable: true,
        configurable: true
    });
    OrderService.prototype.getOrders = function () {
        var response = this.http.get(this.url)
            .map(function (responce) { return responce.json(); });
        return response;
    };
    OrderService.prototype.addOrder = function (order) {
        console.log(order);
        return this.http.post(this.url, order, this.RequestOptions)
            .catch(this.handleError)
            .map(function (responce) { return responce.json(); })
            .subscribe({
            next: function (res) { return console.log(res); },
            error: function (err) { return console.error('something wrong occurred: ' + err); },
            complete: function () { return console.log('done'); }
        });
    };
    OrderService.prototype.handleError = function (error) {
        // In a real world app, we might use a remote logging infrastructure
        var errMsg;
        if (error instanceof http_1.Response) {
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            errMsg = error.status + " - " + (error.statusText || '') + " " + err;
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Rx_1.Observable.throw(errMsg);
    };
    OrderService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], OrderService);
    return OrderService;
}());
exports.OrderService = OrderService;
//# sourceMappingURL=order.service.js.map