import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';

import { AppService } from './services/app.service';
import { FoodService } from './services/food.service';
import { OrderService } from './services/order.service';
import { ChannelService, ChannelConfig, SignalrWindow } from "./services/channel.service";
import { SocketService } from './services/socket.io.service';

import { DragulaModule } from 'ng2-dragula/ng2-dragula';

import { FoodComponent } from '../pages/food/food';
import { FoodsPage } from '../pages/foods/foods';
//import * as $ from 'jquery';

let channelConfig = new ChannelConfig();
// channelConfig.url = "http://192.168.10.107:8080/signalr";
channelConfig.url = "http://192.168.0.92:8080/signalr";
channelConfig.hubName = "MenuHub";

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    FoodComponent,
    FoodsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    DragulaModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    FoodComponent,
    FoodsPage
  ],
  providers: [{ provide: ErrorHandler, useClass: IonicErrorHandler }, AppService, FoodService, OrderService,
    ChannelService, SocketService,
  { provide: SignalrWindow, useValue: window },
  { provide: 'channel.config', useValue: channelConfig }
  ]
})
export class AppModule { }
