import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { CoreService } from '../shared/services/core.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, OnDestroy {

  @Input()
  listData: { listName: String, listId: number, cards: any }[];

  @Output()
  deleteList: EventEmitter<any> = new EventEmitter();

  @Output()
  createCard: EventEmitter<any> = new EventEmitter();

  listSub: Subscription;

  constructor(private coreService: CoreService) {
    this.listData = [];
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    if(this.listSub) {
      this.listSub.unsubscribe();
    }
  }

  deleteListPublish(listId: string) {
    this.deleteList.emit(listId);
  }

  drop(event: CdkDragDrop<any[]>, listData) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);

        const sourceListId = event.previousContainer.element.nativeElement.id;
        const targetListId = event.container.element.nativeElement.id;

        const sourceList = {
          "id": sourceListId,
          "listName": event.previousContainer.element.nativeElement.dataset.listname,
          "cards": event.previousContainer.data
        };

        const targetList = {
          "id": targetListId,
          "listName": event.container.element.nativeElement.dataset.listname,
          "cards": event.container.data
        };

        this.updateList(sourceList);
        this.updateList(targetList);
    }
  }

  /**
   * When card is moved from 1 list to another.
   */
  updateList(listObj) {
    this.listSub = this.coreService.updateList(listObj).subscribe(
      (data) => {        
      },
      (err) => {
        console.log('failed to update list');
      }
    );
  }

  onCreateCard(id: string) {    
    this.createCard.emit(id);
  }

}
