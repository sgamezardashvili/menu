import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Subject } from "rxjs/Subject";
import * as io from "socket.io-client";
import { Food } from '../entities/food';

import { IMessage, ISocketItem } from "../../models";

@Injectable()
export class SocketService {
    private name: string;
    private host: string = window.location.protocol + "//" + window.location.hostname + ":" + window.location.port;
    socket: any;

    eventSubject$: Observable<any>;
    private eventSubject = new Subject<EventArgs>();

    constructor() {
        console.log('Init Socket Service');

        let socketUrl = "http://192.168.0.92:3000";

        this.socket = io.connect(socketUrl);
        this.socket.on("connect", () => this.connect());
        this.socket.on("disconnect", () => this.disconnect());
        this.socket.on("error", (error: string) => {
            console.log(`ERROR: "${error}" (${socketUrl})`);
        });

        this.socket.on("onSelectFood", (food, users) => {
            console.log(`onSelectFood "${food.Name}"`);
            console.log(users);
            if (users != null) {
                var userKey = this.socket.id;

                var hasKey = users.find(function (key) {
                    return key == userKey;
                });

                if (hasKey != undefined) {
                    this.eventSubject.next(new EventArgs('Select', food));
                }
            }
        });

        this.socket.on("onUnSelectFood", (food, users) => {
            console.log(`onUnSelectFood "${food.Name}"`);
            console.log(users);
            if (users != null) {
                var userKey = this.socket.id;

                var hasKey = users.find(function (key) {
                    return key == userKey;
                });

                if (hasKey != undefined) {
                    this.eventSubject.next(new EventArgs('UnSelect', food));
                }
            }
        });

        this.eventSubject$ = this.eventSubject.asObservable();

    }

    selectFood(food) {
        this.socket.emit("selectFood", food, "T1");
    }

    unSelect(food) {
        // console.log('unselect method');
        // console.log(food);
        this.socket.emit("unSelectFood", food, "T1");
    }

    // Handle connection opening
    private connect() {
        console.log(`Connected to "${this.name}"`);

        // Request initial list when connected
        this.socket.emit("list");
        this.socket.emit("addUser", "T1", this.socket.id);
    }

    // Handle connection closing
    private disconnect() {
        console.log(`Disconnected from "${this.name}"`);
    }
}

export class EventArgs {
    eventCode: string;
    food: Food;
    constructor(eventCode: string, food: Food) {
        this.eventCode = eventCode;
        this.food = food;
    }
}