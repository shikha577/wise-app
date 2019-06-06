import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Http } from '@angular/http';

@Injectable()
export class LearnService {
  constructor(public http: Http) { }

  getFeedCategories() {
    return this.http.get("./assets/categories/categories.json")
      .map((res) => res.json());
  }

  getAllQuestions() {
    return this.http.get("./assets/categories/questions.json")
      .map((res) => res.json());
  }
}
