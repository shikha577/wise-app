import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { isPresent } from 'ionic-angular/util/util';
import { Chart } from 'chart.js';

@Component({
  selector: 'result-page',
  templateUrl: 'result.html',
})
export class ResultPage {
  questions: Array<any> = new Array<any>();
  quesIdToCorrectAnsIdMap = new Map();
  quesIdToSelectedAnsIdMap = new Map();

    @ViewChild('barCanvas') barCanvas;

    barChart: any;
    numQuestionCorrect: number = 0;
    numQuestionWrong: number = 0;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
  ) {
    this.quesIdToCorrectAnsIdMap = navParams.get('quesIdToCorrectAnsIdMap');
    this.quesIdToSelectedAnsIdMap = navParams.get('quesIdToSelectedAnsIdMap');
    this.questions = navParams.get('questions');
    this.questions.forEach(ques => {
      if (this.quesIdToCorrectAnsIdMap.get(ques.QuestionID) === this.quesIdToSelectedAnsIdMap.get(ques.QuestionID)) {
        this.numQuestionCorrect++;
      } else {
        this.numQuestionWrong++;
      }
    })
  }

  ionViewWillEnter() {
    this.barChart = new Chart(this.barCanvas.nativeElement, {

      type: 'bar',
      data: {
          labels: ["Correct", "Incorrect"],
          datasets: [{
              label: '# of Questions',
              data: [this.numQuestionCorrect, this.numQuestionWrong],
              backgroundColor: [
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(255, 99, 132, 0.2)'
              ],
              borderColor: [
                  'rgba(75, 192, 192, 1)',
                  'rgba(255,99,132,1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero: true,
                      stepSize: 1,
                  }
              }]
          }
      }

  });
  }

  submit() {

  }
}
