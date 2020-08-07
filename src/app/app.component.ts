import { Component, OnInit, OnDestroy } from '@angular/core';
import { CoreService } from './shared/services/core.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { Subscription, iif } from 'rxjs';
import { CreateListComponent } from './shared/dialog/create-list/create-list.component';
import { NotificationService } from './shared/services/notification.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'TodoApp';
  getListSub: Subscription;
  deleteListSub: Subscription;
  list: {'listName': string, 'id': number, cards: Object}[];
  allListNames: string[];

  constructor(private coreService: CoreService, private matDialog: MatDialog,
      private notification: NotificationService) {
    this.list = [];
    this.allListNames = [];
  }

  ngOnInit() {
    this.getLists();
    this.onNewListCreated();
  }

  onNewListCreated(){
    this.coreService.newList_Subscriber().subscribe(
      (data) => {
        if(data){
          this.notification.showNotification('Success..');
          this.getLists();
        }
      }
    );
  }

  listTrackBy(listObj){
    return listObj.id;
  }

  ngOnDestroy() {
    this.getListSub.unsubscribe();
  }

  getLists() {
    this.list.splice(0, this.list.length);
    this.allListNames.splice(0, this.allListNames.length);
    this.getListSub = this.coreService.getAllLists().subscribe(
      (data) => {
        this.list = data;
        
        this.list.forEach((item) => {
          this.allListNames.push(item.listName);
        });
      },
      (err) => {
        console.log('Unable to get all lists', err);
      }
    )
  }

  onListDelete(listId) {
    this.deleteListSub = this.coreService.deleteList(listId).subscribe(
      (data) => {
        this.notification.showNotification('List deleted');
        this.getLists();
      },
      (err) => {
        console.log('unable to delete list', err);
      }
    )
  }

  onCreateCard(listId) {    
    this.createCard(listId);
  }

  createList() {
    const dialogConfig = this.createDialogConfig({ isList: true, allList: this.allListNames });
    this.matDialog.open(CreateListComponent, dialogConfig);    
  }

  createCard(listId) {
    const dialogConfig = this.createDialogConfig({ isList: false, listId: listId });
    this.matDialog.open(CreateListComponent, dialogConfig);   
  }

  createDialogConfig(data) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '30%';
    dialogConfig.data = {
      externalData: data
    };
    return dialogConfig;
  }

}
