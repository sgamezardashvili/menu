import { Injectable } from '@angular/core';
import { Headers, RequestOptions, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observer } from 'rxjs/Rx';
import { Subject } from 'rxjs/Rx';
import { Food } from '../entities/food';
import { Order } from '../entities/order';

@Injectable()
export class OrderService {

    constructor(private http: Http) {

    }

    url:string = 'http://192.168.10.107:8080/api/Orders';

    get RequestOptions(): RequestOptions {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        return new RequestOptions({ headers: headers });
    }

    getOrders(): Observable<Order[]> {
        var response = this.http.get(this.url)
            .map(responce => responce.json());

        return response;
    }

    addOrder(order: Order) {
        console.log(order);
        return this.http.post(this.url, order, this.RequestOptions)
            .catch(this.handleError)
            .map(responce => responce.json())
            .subscribe({
                next: res => console.log(res),
                error: err => console.error('something wrong occurred: ' + err),
                complete: () => console.log('done')
            });

    }

    private handleError(error: Response | any) {
        // In a real world app, we might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}