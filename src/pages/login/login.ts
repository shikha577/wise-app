import {Component} from "@angular/core";
import {NavController, AlertController, NavParams, ToastController, MenuController} from "ionic-angular";
import {RegisterPage} from "../register/register";
import {LandingPage} from "../landing/landing";
import {LearnFeedPage} from "../learn-feed/learn-feed";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  personType: string;
  constructor(public nav: NavController,
    public navParams: NavParams,
    public forgotCtrl: AlertController, public menu: MenuController, public toastCtrl: ToastController) {
    this.menu.swipeEnable(false);
    this.personType = navParams.get('personType');
  }

  // go to register page
  register() {
    this.nav.setRoot(RegisterPage);
  }

  selectUserType() {
    this.nav.setRoot(LandingPage);
  }

  // login and go to home page
  login() {
    this.nav.setRoot(LearnFeedPage, {
      personType: this.personType
    });
  }

  forgotPass() {
    let forgot = this.forgotCtrl.create({
      title: 'Forgot Password?',
      message: "Enter you email address to send a reset link password.",
      inputs: [
        {
          name: 'email',
          placeholder: 'Email',
          type: 'email'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Send',
          handler: data => {
            console.log('Send clicked');
            let toast = this.toastCtrl.create({
              message: 'Email was sended successfully',
              duration: 3000,
              position: 'top',
              cssClass: 'dark-trans',
              closeButtonText: 'OK',
              showCloseButton: true
            });
            toast.present();
          }
        }
      ]
    });
    forgot.present();
  }

}
