import {Component, HostListener, OnInit} from '@angular/core';
import {PreviousRouteService} from "./shared/services/previous-route.service";
import {AuthorizationService} from "./shared/services/authorization.service";
import {Router} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  constructor(
    private previousRouteS: PreviousRouteService,
    private translateS: TranslateService,
    private authS: AuthorizationService,
    private router: Router
  ) {
    translateS.addLangs(['en', 'ru']);
    const savedLang = localStorage.getItem('saved-lang');
    if (savedLang) { translateS.use(savedLang) }
    else { translateS.use(translateS.defaultLang)}
  }

  @HostListener("window:beforeunload")
  private saveSettings(){
    localStorage.setItem('saved-theme', this.currentTheme);
    localStorage.setItem('saved-lang', this.translateS.currentLang)
  }

  protected currentTheme!: ThemeType;
  protected isAuthorized$ = this.authS.isAuthorized$;

  ngOnInit(): void {
    this.currentTheme = (localStorage.getItem('saved-theme') as ThemeType) ?? 'light';
    if (this.currentTheme === 'dark') {
      document.body.classList.toggle('darkMode');
    } else {
      document.body.classList.toggle('lightMode');
    }
  }

  protected changeTheme(): void{
    this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
    document.body.classList.toggle('darkMode');
    document.body.classList.toggle('lightMode');
  }
  protected unauthorize(){
    this.authS.signOut();
    this.router.navigate(['authorization'], {relativeTo: null});
  }

  protected changeLanguage(language: string){
    this.translateS.use(language);
  }
}

type ThemeType = 'light' | 'dark';
