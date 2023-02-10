import { Component } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { TranslateConfigService } from '../services/translate-config.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  language: string;

  constructor(
    private translateConfigService: TranslateConfigService,
    private actionSheetController: ActionSheetController
  ) {
    this.translateConfigService.getDefaultLanguage();
    this.language = this.translateConfigService.getCurrentLang();
  }

  async changeLanguage() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Languages',
      buttons: [
        {
          text: 'English',
          icon: 'language-outline',
          handler: () => {
            this.language = 'en';
            this.translateConfigService.setLanguage('en');
          },
        },
        {
          text: 'Arabic',
          icon: 'language-outline',
          handler: () => {
            this.language = 'ar';
            this.translateConfigService.setLanguage('ar');
          },
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          },
        },
      ],
    });
    await actionSheet.present();

    const { role, data } = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role and data', role, data);
  }
}
