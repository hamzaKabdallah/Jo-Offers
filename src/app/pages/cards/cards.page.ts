import { Component, OnDestroy, OnInit } from '@angular/core';
import { FireBaseService } from 'src/app/services/firebase.service';
import { Card } from 'src/app/types/card.type';
import { map, Observable, of, Subject, Subscription, switchMap } from 'rxjs';
import { takeUntil } from 'rxjs/operators'
import { Menu } from 'src/app/types/menu.type';


@Component({
  selector: 'app-cards',
  templateUrl: './cards.page.html',
  styleUrls: ['./cards.page.scss'],
})
export class CardsPage implements OnInit, OnDestroy {
  cards: Observable<Card[]>;
  mainMenu: Menu;

  constructor(
    private fireBaseService: FireBaseService,
  ) { 
  }

  ngOnInit() {
    this.cards = this.fireBaseService.getSelectedMainMenu().pipe(
      switchMap((menu: Menu) => { 
        this.mainMenu = menu;
        debugger;
        return this.fireBaseService.getMenuById(menu.id.toString());
      })
    )
  }

  ngOnDestroy(): void {
  }
}
