import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage-angular';
import { CreatePage } from './create/create.page';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';


@Component({
  selector: 'app-listas',
  templateUrl: './listas.page.html',
  styleUrls: ['./listas.page.scss'],
})
export class ListasPage implements OnInit {

  public data: any;
  constructor(
    public route: Router,
    private storage: Storage,
    private toastCtrl: ToastController,

    

    ) { 
  }

  ionViewWillEnter() {
    this.getFormStorage();
}

  async getFormStorage() {
    try {
      let items = await this.storage.get('list-items');
      this.data = items;
      return this.data
    } catch (error) {

      const toast = await this.toastCtrl.create({
        message: 'Sem dados para consulta ',
        duration: 1000,
        position: 'bottom',
      });

      await toast.present();
    }



  }

  async ngOnInit() {
   
    await this.storage.create()
    this.getFormStorage()
  }

  nextpage(){
    this.route.navigate(['/tabs/listas/create'])
  }



  

}
