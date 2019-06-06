import { Component } from '@angular/core';
import { NavController, NavParams, PopoverController } from 'ionic-angular';
import { ResultPage } from '../result/result';
import { LearnService } from '../../services/learn.service';
import { AlertController } from 'ionic-angular';
import {NotificationsPage} from "../notifications/notifications";
import {SettingsPage} from "../settings/settings";

@Component({
  selector: 'trivia-page',
  templateUrl: 'trivia.html',
})
export class TriviaPage {
  questions: Array<any> = new Array<any>();
  quesIdToCorrectAnsIdMap = new Map();
  quesIdToSelectedAnsIdMap = new Map();
  currentQuestion: any;
  currentQuestionIndex: number = 0;
  showSubmitButton: boolean = false; 

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public popoverCtrl: PopoverController,
    public learnService: LearnService,
    private alertCtrl: AlertController
  ) {
    this.learnService.getAllQuestions()
    .subscribe(data => {
      data.questions.forEach(entry => {
        let ques = entry.Question;
        this.quesIdToCorrectAnsIdMap.set(ques.QuestionID, ques.CorrectAnswer);
        // console.log(this.quesIdToCorrectAnsIdMap)
        const answers = ques.Answer.split("|");
        let value = answers.map(ans => this.parseAnswer(ans))
        ques["answers"] = value;
        // console.log(ques);
        this.questions.push(ques);
        // console.log(this.questions);
      });
      this.currentQuestion = this.questions[this.currentQuestionIndex];
      this.currentQuestionIndex++;
    });
  }

  ionViewWillEnter() {
    
  }

  parseAnswer(answer) {
    const ans = answer.split(".");
    return {
      "id": ans[0],
      "value": answer
    }
  }

  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: 'You must answer all questions before submitting',
      buttons: ['Dismiss']
    });
    alert.present();
  }

  selectedAnswer(questionId, selectedAnsId) {
    this.quesIdToSelectedAnsIdMap.set(questionId, selectedAnsId); 
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

  next() {
    if (!this.quesIdToSelectedAnsIdMap.get(this.currentQuestion.QuestionID)) {
      this.presentAlert();
      return;
    }

    if (this.quesIdToSelectedAnsIdMap.size == this.questions.length) {
      this.showSubmitButton = true;
      return;
    }

    this.currentQuestion = this.questions[this.currentQuestionIndex];
    this.currentQuestionIndex++;
    if (this.currentQuestionIndex == this.questions.length) {
      this.showSubmitButton = true;
    }
  }

  submit() {
    if (this.quesIdToCorrectAnsIdMap.size != this.quesIdToSelectedAnsIdMap.size) {
      this.presentAlert();
      return;
    }

    const params = {
      quesIdToSelectedAnsIdMap: this.quesIdToSelectedAnsIdMap,
      quesIdToCorrectAnsIdMap: this.quesIdToCorrectAnsIdMap,
      questions: this.questions
    }

    this.navCtrl.push(ResultPage, params);
  }
}
