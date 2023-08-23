import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import {RouterModule, Routes} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {ErrorTextComponent} from "../../shared/components/error-text/error-text.component";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {NgLetDirective} from "../../shared/directives/ng-let.directive";
import {TranslateModule} from "@ngx-translate/core";
import {MatTooltipModule} from "@angular/material/tooltip";

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login'},
  { path: 'login', component: LoginComponent},
  { path: 'registration', component: RegistrationComponent}
]

@NgModule({
  declarations: [
    LoginComponent,
    RegistrationComponent
  ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        RouterModule.forChild(routes),
        ErrorTextComponent,
        MatButtonModule,
        MatIconModule,
        NgLetDirective,
        TranslateModule,
        MatTooltipModule
    ]
})
export class AuthorizationModule { }
