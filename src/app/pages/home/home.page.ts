import { Component, OnInit, booleanAttribute } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { ToastController } from '@ionic/angular';

import Echo from '../../component/pluggins/echo';




@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  public data: any;
  constructor(
    private toastCtrl: ToastController,
    private storage: Storage,

  ) {    
  }
  

  
  async ngOnInit() {    
    
    const { value } = await Echo.echo({ value: 'Hello World!' });
    console.log('Response from native:', value);
    await this.storage.create()
    this.getFormStorage()

  }

  ionViewWillEnter() {

    
    this.getFormStorage();
  }
  handleChange(e:any) {
    console.log('ionChange fired with value: ' + e.detail.value);
  }
  async getFormStorage() {
    try {
      let items = await this.storage.get('list-items');
      this.data = items;
      return this.data
    } catch (error) {

      const toast = await this.toastCtrl.create({
        message: 'Nenhum dado encontrado',
        duration: 500,
        position: 'bottom',
      });

      await toast.present();
    }



  }





}
