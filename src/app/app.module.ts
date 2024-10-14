import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonmaterialModule } from './commonmaterial/commonmaterial.module';
import { CommonModule } from '@angular/common';
import { AnotherFormComponent } from './another-form/another-form.component';
import { DistDivisionComponent } from './dist-division/dist-division.component';
import { ElectionComponent } from './election/election.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AddSupervisorComponent } from './Add-Supervisor/Add-Supervisor.component';
import { MediaCoverageComponent } from './media-coverage/media-coverage.component';
@NgModule({
  declarations: [				
    AppComponent,
    AnotherFormComponent,
    DistDivisionComponent,
    DistDivisionComponent,
      ElectionComponent,
      PageNotFoundComponent,
      AddSupervisorComponent,
      MediaCoverageComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CommonModule,
    CommonmaterialModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
