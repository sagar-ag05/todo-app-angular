import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CoreService {

    apiBaseUrl = environment.apiUrl;
    newList = new Subject();

    constructor(private httpClient: HttpClient){

    }

    //this will return lists and cards data both
    getAllLists(): Observable<any> {
        const url = this.apiBaseUrl;
        return this.httpClient.get(url);
    }

    getListById(listId) {
        const url = this.apiBaseUrl + '/' + listId;
        return this.httpClient.get(url);
    }

    createList(listObj) {
        const url = this.apiBaseUrl;
        return this.httpClient.post(url, listObj);
    }

    deleteList(listId) {
        const url = this.apiBaseUrl + '/' + listId;
        return this.httpClient.delete(url);
    }

    newList_Publisher() {
        this.newList.next(true);
    }

    newList_Subscriber() {
        return this.newList;
    }

    //update list with card data, like removing and adding cards
    updateList (listObj) {
        const url = this.apiBaseUrl + '/' + listObj.id;
        return this.httpClient.put(url, listObj);
    }
}
