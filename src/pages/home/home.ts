import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ServerProvider } from '../../providers/server/server';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  serverInfo: String;

  constructor(public navCtrl: NavController, public serverProvider: ServerProvider) {

  }

  ionViewDidLoad(){
    this.serverProvider.get('/getInfo?Info=server').then((response:any)=>{
        this.serverInfo='version:' +response.version+'name:'+response.name;
    },(err)=>{
        this.serverInfo=`can't find server info`;
    });
  }

}
