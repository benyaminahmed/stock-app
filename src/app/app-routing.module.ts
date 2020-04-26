import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CompareComponent } from './compare/compare.component';
import { HomeComponent } from './home/home.component';
import { PricesComponent } from './prices/prices.component';
import { SectorsComponent } from './sectors/sectors.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'home/MSFT',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'compare',
    component: CompareComponent
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
