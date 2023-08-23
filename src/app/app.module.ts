import {ErrorHandler, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {CustomErrorHandlerService} from "./shared/services/custom-error-handler.service";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatDividerModule} from "@angular/material/divider";
import {IconsModule} from "./modules/icons/icons.module";
import {MatMenuModule} from "@angular/material/menu";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {NotFoundComponent} from "./shared/components/not-found/not-found.component";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {FormsModule} from "@angular/forms";
function httpTraslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
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
    MatMenuModule,
    NotFoundComponent,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTraslateLoader,
        deps: [HttpClient]
      },
      defaultLanguage: 'ru'
    }),
    MatTooltipModule,
    MatSlideToggleModule,
    FormsModule
  ],
  providers: [
    {provide: ErrorHandler, useClass: CustomErrorHandlerService}
  ],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
