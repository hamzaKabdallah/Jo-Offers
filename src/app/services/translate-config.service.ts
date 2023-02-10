import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class TranslateConfigService {
  currentLang: string;

  constructor(private translate: TranslateService) {
    this.currentLang = (localStorage.getItem('lang') as string);
  }

  getDefaultLanguage() {
    if (this.currentLang) {
      this.translate.setDefaultLang(this.currentLang);
    } else {
      localStorage.setItem('lang', (this.translate.getBrowserLang() as string));
      this.currentLang = this.translate.getBrowserLang() as string;
      this.translate.setDefaultLang(this.currentLang);
    }

    this.setDir();
    return this.currentLang;
  }

  setDir(): void {
    const languageId = this.getCurrentLang();

    if (languageId === 'ar') {
        document.documentElement.dir = "rtl";
        this.translate.setDefaultLang(languageId);
      
      } else {
        document.documentElement.dir = "ltr";
        this.translate.setDefaultLang(languageId);
      }
  }

  setLanguage(setLang: string) {
    this.translate.use(setLang);
    localStorage.setItem('lang', setLang);
    this.setDir();
  }

  getCurrentLang(): string {
    return (localStorage.getItem('lang') as string);
  }
}
