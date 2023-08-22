import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DomSanitizer} from "@angular/platform-browser";
import {MatIconRegistry} from "@angular/material/icon";

const img = [
  'more-alt'
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
})
export class IconsModule {
  constructor(
    private sanitizer: DomSanitizer,
    private matIconRegistry: MatIconRegistry
  ) {
    this.registerIcons();
  }

  private registerIcons(){
    img.forEach(img => this.matIconRegistry.addSvgIcon(img, this.sanitizer.bypassSecurityTrustResourceUrl(`/assets/svg-img/${img}.svg`)))
  }
}
