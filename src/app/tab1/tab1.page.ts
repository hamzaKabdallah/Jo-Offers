import { Component, OnInit, ViewChild } from '@angular/core';
import { ActionSheetController, NavController } from '@ionic/angular';
import { finalize, Observable } from 'rxjs';
import { FireBaseService } from '../services/firebase.service';
import { TranslateConfigService } from '../services/translate-config.service';
import { Menu } from '../types/menu.type';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { map } from 'rxjs/operators';
import { CardsPage } from '../pages/cards/cards.page';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  language: string;
  menu: Observable<Menu[]>;
  filterdMenu: Observable<Menu[]>;
  cardPage = CardsPage;
  @ViewChild(CdkVirtualScrollViewport) viewPort: CdkVirtualScrollViewport;

  constructor(
    private translateConfigService: TranslateConfigService,
    private actionSheetController: ActionSheetController,
    private fireBaseService: FireBaseService,
    private navCtrl: NavController
  ) {
    this.translateConfigService.getDefaultLanguage();
    this.language = this.translateConfigService.getCurrentLang();
  }

  ngOnInit(): void {
    // origial menu declared to save the first call of observable and to be view when the filterd array is empty
    this.menu = this.getMeu();
    this.filterdMenu = this.menu;

    setTimeout(() => {
      this.viewPort.checkViewportSize();
    });
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

  getMeu(): Observable<Menu[]> {
    return this.fireBaseService.getMenu();
  }

  handleRefresh(event: any) {
    this.filterdMenu = this.getMeu().pipe(
      finalize(() => event.target.complete())
    );
  }

  filterItems(event: any) {
    if (event.target.value) {
      this.filterdMenu = this.menu.pipe(
        map((items) => {
          return items.filter((item) =>
            item.name
              .toLocaleLowerCase()
              .includes(event.target.value.toLocaleLowerCase())
          );
        })
      );
    } else {
      this.filterdMenu = this.menu;
    }
  }

  moveToCardsPage(menu: Menu) {
    this.fireBaseService.setSelectedMainMenu(menu);
    this.navCtrl.navigateForward(['cards']);
  }
}
