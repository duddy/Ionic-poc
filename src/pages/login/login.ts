import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import { ServerProvider } from '../../providers/server/server';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  username: string;
  password: string;

  usernamePlaceHolder: string = "id";
  passwordPlaceHolder: string = "password";

  constructor(private serverProvider: ServerProvider,
    public navCtrl: NavController, public navParams: NavParams,
    private alertController: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login() {
    console.log("username:" + this.username);
    console.log("password:" + this.password);
    this.serverProvider.login(this.username, this.password).then((res: any) => {
      if (res.result = 'success') {
        this.navCtrl.setRoot(HomePage);
      } else {
        let alert = this.alertController.create({
          title: 'login failure',
          buttons: ['OK']
        });
      }
    }, (err) => {
      console.log('post-err:' + JSON.stringify(err));
      let alert = this.alertController.create({
        title: err,
        buttons: ['OK']
      });

    });
  }

}