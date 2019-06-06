import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { isPresent } from 'ionic-angular/util/util';
import { ResultPage } from '../result/result';
import { LearnService } from '../../services/learn.service';

@Component({
  selector: 'questions-page',
  templateUrl: 'questions.html',
})
export class QuestionsPage {
  questions: Array<any> = new Array<any>();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public learnService: LearnService
  ) {

  }

  ionViewWillEnter() {
    this.learnService.getAllQuestions()
      .subscribe(data => {
        data.questions.forEach(entry => {
          let ques = entry.Question;
          const answers = ques.Answer.split("|");
          ques["answers"] = answers;
          console.log(ques);
          this.questions.push(ques);
          console.log(this.questions);
        });
      });
  }

  submit() {
    this.navCtrl.push(ResultPage);
  }
}
