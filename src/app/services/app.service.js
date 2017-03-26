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
require('rxjs/add/operator/map');
require('rxjs/add/operator/catch');
var AppService = (function () {
    //url:string = "http://192.168.0.92:8080/api/MenuItems";
    function AppService(http) {
        this.http = http;
        this.url = "http://localhost:5164/api/MenuItems";
    }
    AppService.prototype.getMenuItems = function () {
        var response = this.http.get(this.url)
            .map(function (responce) { return responce.json(); });
        // .subscribe(
        //     {
        //     next: x => console.log('got value ' + x),
        //     error: err => console.error('something wrong occurred: ' + err),
        //     complete: () => console.log('done'),
        //     }
        // );
        //console.log(response);
        return response;
    };
    AppService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], AppService);
    return AppService;
}());
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map