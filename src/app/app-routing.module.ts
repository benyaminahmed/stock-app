import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { PricesComponent } from './prices/prices.component';
import { SectorsComponent } from './sectors/sectors.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'home/:searchInput',
    component: HomeComponent
  },
  {
    path: 'home/:symbol/prices/:name/:region',
    component: PricesComponent
  },
  {
    path: 'sectors',
    component: SectorsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
