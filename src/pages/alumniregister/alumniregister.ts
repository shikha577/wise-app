import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import {LoginPage} from "../login/login";
import {LearnFeedPage} from "../learn-feed/learn-feed";


@Component({
  selector: 'alumni-register',
  templateUrl: 'alumniregister.html'
})
export class AlumniRegisterPage {

  constructor(public nav: NavController) {
  }

  // register and go to home page
  register() {
    this.nav.setRoot(LearnFeedPage);
  }

  // go to login page
  login() {
    this.nav.setRoot(LoginPage);
  }
}
