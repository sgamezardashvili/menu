import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observer } from 'rxjs/Rx';
import { Subject } from 'rxjs/Rx';
import { Menu } from '../entities/menu';

@Injectable()
export class AppService {
    url:string = "http://localhost:5164/api/MenuItems";
    //url:string = "http://192.168.0.92:8080/api/MenuItems";
    constructor(private http: Http) {

    }

    getMenuItems(): Observable<Menu[]> {
        var response = this.http.get(this.url)
            .map(responce => responce.json());
        // .subscribe(
        //     {
        //     next: x => console.log('got value ' + x),
        //     error: err => console.error('something wrong occurred: ' + err),
        //     complete: () => console.log('done'),
        //     }
        // );

        //console.log(response);
        return  response;
    }
}