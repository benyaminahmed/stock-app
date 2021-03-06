import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClarityModule } from '@clr/angular';
import { HighchartsChartModule } from 'highcharts-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SectorsComponent } from './sectors/sectors.component';
import { CompanyComponent } from './shared/components/company/company.component';
import { PropertyCardComponent } from './shared/components/property-card/property-card.component';
import { SectorCardComponent } from './shared/components/sector-card/sector-card.component';
import { SectorChartComponent } from './shared/components/sector-chart/sector-chart.component';
import { SpinnerComponent } from './shared/components/spinner/spinner.component';
import { StockCardComponent } from './shared/components/stock-card/stock-card.component';
import { TimeSeriesDailyComponent } from './shared/components/time-series-daily/time-series-daily.component';
import { TitleComponent } from './shared/components/title/title.component';
import { PricesComponent } from './prices/prices.component';
import { CompareComponent } from './compare/compare.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TitleComponent,
    SpinnerComponent,
    StockCardComponent,
    CompanyComponent,
    PropertyCardComponent,
    TimeSeriesDailyComponent,
    SectorsComponent,
    SectorCardComponent,
    SectorChartComponent,
    PricesComponent,
    CompareComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ClarityModule,
    HighchartsChartModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
