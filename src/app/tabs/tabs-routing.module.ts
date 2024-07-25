import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
	{
		path: 'tabs',
		component: TabsPage,
		children: [
			{
				path: 'home',
				loadChildren: () => import('../pages/home/home.module').then(m => m.HomePageModule)
			},
			{
				path: 'listas',
				loadChildren: () => import('../pages/listas/listas.module').then(m => m.ListasPageModule)
			},
			{
				path: 'modelos',
				loadChildren: () => import('../pages/modelos/modelos.module').then(m => m.ModelosPageModule)
			},

		]
	},
	{
		path: '',
		redirectTo: 'tabs/home',
		pathMatch: 'full'
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule { }
