import { Component, OnInit, booleanAttribute } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { ToastController } from '@ionic/angular';
import { ItemReorderEventDetail } from '@ionic/angular';



@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  public data: any;
  public dado: any;
  public total: any = 0;
  public previsaoDeGasto: any;
  constructor(
    private toastCtrl: ToastController,
    private storage: Storage,

  ) {}

  async ngOnInit() {

    await this.storage.create()
    this.getFormStorage()

  }

  ionViewWillEnter() {

    this.getFormStorage();
  }


  handleChange(e: any) {

    let dados = this.data.filter((item: any) => item.title == e.detail.value);
    this.dado = dados[0].items;
    
    this.previsaoDeGasto = this.dado.reduce((sum:any, item:any) => sum + item.money, 0)
    
    
    this.total = 0

  }

  handleReorder(ev: CustomEvent<ItemReorderEventDetail>) {
    ev.detail.complete();
  }

  checkboxClick(event: any, amount: number) {

    const isChecked = event.detail.checked;
    const updatedTotal = this.total + (isChecked ? amount : -amount);
    this.total = Math.max(0, Math.round(updatedTotal * 100) / 100);

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
