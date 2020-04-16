import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { SectorsComponent } from './sectors/sectors.component';
import { TimeSeriesDailyComponent } from './time-series-daily/time-series-daily.component';


const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'time-series-daily/:symbol/:name/:region',
    component: TimeSeriesDailyComponent
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
