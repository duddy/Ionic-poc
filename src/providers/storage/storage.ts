import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import * as CryptoJS from 'crypto-js';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

/*
  Generated class for the StorageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StorageProvider {

  constructor(public http: HttpClient, private nativeStorage: NativeStorage) {
    console.log('Hello StorageProvider Provider');
  }

  decryptValue(value: string) {
    let key = value.substring(0, 16);
    let encrypt  = value.substring(16, value.length);
    console.log("value" + value + " key:" +key+" encrypt" + encrypt);
    let decrypted = CryptoJS.AES.decrypt(encrypt, key);
  }

  encryptValue(value: string) {
    let buffer = "";
    for (let i = 0; i < 16; i++) {
      buffer += Math.floor((Math.random() * 10));
      console.log("buffer: "+ buffer);

      let encrypted = CryptoJS.AES.encrypt(value, buffer);
      console.log("value:" + buffer + encrypted);

      return (buffer + encrypted);
    }
  }

  saveLoginInfo(username,password){
    return new Promise((resolve,reject)=>{
        let usernameenc=this.encryptValue(username);
        let passwordenc=this.encryptValue(password);
        let usernameP= new Promise((resolveu,rejectu)=>{
              this.nativeStorage.setItem("username",usernameenc)
                .then(
                  data =>{
                    resolveu()
                  },
                  error => rejectu(error)
                );
              });
        let passwordP= new Promise((resolvep,rejectp)=>{ 
                 this.nativeStorage.setItem("password",passwordenc)
                .then(
                  data => {
                    resolvep()
                  },
                  error => rejectp(error)
                );
              });

        Promise.all([usernameP,passwordP]).then(()=>{
            resolve();
        },(err)=>{
            reject(err);
        });
    });
  }

  getLoginInfo(){
    return new Promise((resolve,reject)=>{
        let username,password;
        let usernameP= new Promise((resolveu,rejectu)=>{
              this.nativeStorage.getItem("username")
                .then(
                  data =>{
                    username=data; 
                    resolveu(data)
                  },
                  error => rejectu(error)
                );
              });
        let passwordP= new Promise((resolvep,rejectp)=>{ 
                 this.nativeStorage.getItem("password")
                .then(
                  data => {
                    password=data;
                    resolvep(data)
                  },
                  error => rejectp(error)
                );
              });

        Promise.all([usernameP,passwordP]).then(()=>{
            username=this.decryptValue(username);
            password=this.decryptValue(password);
            console.log("username:"+username+" password:"+password);
            resolve({username:username,password:password});
        },(err)=>{

            reject(err);
        });
    });
  }

}