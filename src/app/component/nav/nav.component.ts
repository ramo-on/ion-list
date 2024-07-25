import { Component, OnInit } from '@angular/core';
import { ListasPage } from 'src/app/pages/listas/listas.page';



@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent  implements OnInit {
  component = ListasPage;
  constructor() { }

  ngOnInit() {}

}
