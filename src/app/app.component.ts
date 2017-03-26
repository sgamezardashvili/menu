import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { HomePage } from '../pages/home/home';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';

import { FoodsPage } from '../pages/foods/foods';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  //rootPage = HomePage;
  rootPage = FoodsPage;
  pages: Array<{ title: string, component: any }> = new Array<{ title: string, component: any }>();

  constructor(platform: Platform) {
    this.pages.push({ title: 'About', component: AboutPage }, { title: 'Contact', component: ContactPage });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }
}
