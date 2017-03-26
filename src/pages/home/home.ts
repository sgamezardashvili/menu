import { Component } from '@angular/core';

import { NavController, AlertController } from 'ionic-angular';

import { DragulaService } from 'ng2-dragula/ng2-dragula';

//import { FoodsPage } from '../foods/foods';

import { ContactPage } from '../contact/contact'
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  q1 = [];
  q2 = [];
  private rootPage;

  constructor(public navCtrl: NavController, private dragulaService: DragulaService, private alertCtrl: AlertController) {
    for (var i = 0; i < 20; i++) {
      this.q1.push("1. <" + i + ">");
      this.q2.push("2. <" + i + ">");

      this.rootPage = ContactPage;
    }

    // dragulaService.drop.subscribe((value) => {
    //   console.log(value);
    //   let alert = alertCtrl.create({
    //     title: 'Item moved',
    //     subTitle: 'So much fun!',
    //     buttons: ['OK']
    //   });
    //   alert.present();
    // });

  }
}
