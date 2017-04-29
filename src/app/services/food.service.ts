import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observer } from 'rxjs/Rx';
import { Subject } from 'rxjs/Rx';
import { Food } from '../entities/food';

@Injectable()
export class FoodService {

    constructor(private http: Http) {

    }
    //url:string = 'http://192.168.10.54:8080/api/Foods';
    url:string = 'http://192.168.0.92:8080/api/Foods';
    //url: string = 'http://192.168.0.92:5164/api/Foods';
    getFoods(): Observable<Food[]> {
        var response = this.http.get(this.url)
            .map(responce => responce.json());
        return response;
    }
}