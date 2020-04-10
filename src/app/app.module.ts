import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {GridsterModule} from 'angular-gridster2';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ChartsModule } from 'ng2-charts';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './components/layout/layout.component';
import { HeaderComponent } from './components/header/header.component';
import { Widget1Component } from './components/widget1/widget1.component';
import { Widget2Component } from './components/widget2/widget2.component';
import { LoginComponent } from './components/login/login.component';
import { SafePipe } from './others/safe.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    HeaderComponent,
    LoginComponent,
    SafePipe
  ],
  entryComponents: [
    Widget1Component,
    Widget2Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GridsterModule,
    ReactiveFormsModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    ChartsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
