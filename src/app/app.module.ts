import {ErrorHandler, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {CustomErrorHandlerService} from "./shared/services/custom-error-handler.service";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {HttpClientModule} from "@angular/common/http";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatDividerModule} from "@angular/material/divider";
import {IconsModule} from "./modules/icons/icons.module";
import {MatMenuModule} from "@angular/material/menu";
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    HttpClientModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    IconsModule,
    MatMenuModule
  ],
  providers: [
    {provide: ErrorHandler, useClass: CustomErrorHandlerService}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
