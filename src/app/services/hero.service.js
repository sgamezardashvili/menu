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
var HeroService = (function () {
    function HeroService(http) {
        this.http = http;
        this.HEROES = [
            { _id: "11", name: 'Mr. Nice' },
            { _id: "12", name: 'Narco' },
            { _id: "13", name: 'Bombasto' },
            { _id: "14", name: 'Celeritas' },
            { _id: "15", name: 'Magneta' },
            { _id: "16", name: 'RubberMan' },
            { _id: "17", name: 'Dynama' },
            { _id: "18", name: 'Dr IQ' },
            { _id: "19", name: 'Magma' },
            { _id: "20", name: 'Tornado' }
        ];
    }
    HeroService.prototype.getHero = function () {
        return { _id: "1", name: 'hero1' };
    };
    HeroService.prototype.getHeros = function () {
        var heroes = this.HEROES;
        return Rx_1.Observable.create(function (observer) {
            var source = this;
            observer.next(heroes[0]);
            observer.next(heroes[2]);
            observer.next(heroes[3]);
            setTimeout(function () {
                observer.next(heroes[4]);
                observer.complete();
            }, 1000);
        });
    };
    HeroService.prototype.getAll = function () {
        var response = this.http.get('app/data/hero.json')
            .map(function (responce) { return responce.json(); });
        // .subscribe({
        //     next: hero => console.log('Component =' + hero),
        //     error: err => console.error('something wrong occurred: ' + err),
        //     complete: () => console.log('done')
        // })
        //...errors if any
        return response;
    };
    HeroService.prototype.getObservable = function () {
    };
    HeroService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], HeroService);
    return HeroService;
}());
exports.HeroService = HeroService;
//# sourceMappingURL=hero.service.js.map