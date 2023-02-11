import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { debounce, debounceTime, Observable, of, BehaviorSubject, timer } from "rxjs";
import { Card } from "../types/card.type";
import { Menu } from "../types/menu.type";

@Injectable({
    providedIn: 'root'
})
export class FireBaseService {
    private selectedMainMenu$: BehaviorSubject<Menu> = new BehaviorSubject<Menu>({} as Menu);
    /**
     *
     */
    constructor(
        private http: HttpClient
    ) {
        
    }

    getMenu(): Observable<Menu[]>{
        const arr = Array.from({length: 800}).map((_,i) => ({id: i.toString(), name: `item${i}`, img: 'blaaa'}))
        return of(arr);
    }

    getMenuById(id: string): Observable<Card[]> {
        // must call the Api what is retrive the Cards what is related in ID.
        return of([{ id, title: 'Test Title', percentage: 15}]);
    }

    setSelectedMainMenu(item: Menu): void {
        this.selectedMainMenu$.next(item);
    }

    getSelectedMainMenu(): Observable<Menu> {
        return this.selectedMainMenu$.asObservable();
    }
}