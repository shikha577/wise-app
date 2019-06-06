import { Component } from '@angular/core';
import { NavController, NavParams, PopoverController } from 'ionic-angular';
import { isPresent } from 'ionic-angular/util/util';
import { QuestionsPage } from "../questions/questions";
import { LearnService } from '../../services/learn.service';
import { CategoryModel } from '../../services/learn.model';

import {NotificationsPage} from "../notifications/notifications";
import {SettingsPage} from "../settings/settings";


@Component({
  selector: 'learn-feed-page',
  templateUrl: 'learn-feed.html',
})
export class LearnFeedPage {
  _query: string = 'all';
  categories: Array<CategoryModel> = new Array<CategoryModel>();
  personType: string;
  educators: string = "educators";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public popoverCtrl: PopoverController,
    public learnService: LearnService
  ) {
    let query_param = navParams.get('query');
    this.personType = navParams.get('personType');
    this._query = isPresent(query_param) ? query_param : 'all';
  }

  ionViewWillEnter() {
    this.learnService.getFeedCategories()
      .subscribe(data => {
        this.categories = data.categories
      });
  }

  openQuestions(params) {
    this.navCtrl.push(QuestionsPage, params);
  }

  goToAccount() {
    this.navCtrl.push(SettingsPage);
  }

  presentNotifications(myEvent) {
    console.log(myEvent);
    let popover = this.popoverCtrl.create(NotificationsPage);
    popover.present({
      ev: myEvent
    });
  }

}
