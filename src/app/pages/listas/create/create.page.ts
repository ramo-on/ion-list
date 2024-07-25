import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {

  public form!: FormGroup;
  title: any;


  constructor(

    private formBuilder: FormBuilder,
    private storage: Storage,
    private alert: AlertController,
    public route: Router,
  ) {


    this.form = this.formBuilder.group({
      items: this.formBuilder.array([]),
      title: this.title
    });
  }


  async ngOnInit() {

    await this.storage.create()

  }




  addItem() {
    const items = this.formBuilder.group({
      name: [],
      qtd: [],
      check: [],
      money: [],
    });
    this.getItemArray.push(items);

  }

  public isFormValid() {

    const values = Object.values(this.form.value.items);
    const isValid = values.filter((value: any) => {
      if (value.name && value.qtd && value.money) {
        return value;
      }

    });
    if (values.length == isValid.length && values.length > 0) {

      return false;
    }

    return true


  }


  async onSubmitForm() {
    let listItems = await this.storage.get('list-items') || [];
    listItems.push(this.form.value);
    this.storage.set('list-items', listItems)
    const alert = await this.alert.create({
      header: 'Lista Salva com Sucesso',
      cssClass: 'alertclass',
      buttons: [
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            this.route.navigate(['/tabs/listas/']);
          }
        }
      ]
    });

    await alert.present();
  }

  deleteItem(i: any) {
    this.getItemArray.removeAt(i);
  }

  get getItemArray() {
    return <FormArray>this.form.get('items');
  }


}
