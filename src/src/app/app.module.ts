import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TableComponent } from './table/table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonmaterialModule } from './commonmaterial/commonmaterial.module';
import { AnotherFormComponent } from './another-form/another-form.component';

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    AnotherFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CommonmaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
