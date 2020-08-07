import { Component, OnDestroy, Inject } from '@angular/core';
import { CoreService } from '../../services/core.service';
import { Subscription } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'create-list',
    templateUrl: './create-list.component.html',
    styleUrls: ['./create-list.component.css']
})
export class CreateListComponent implements OnDestroy {

    createListSub: Subscription;
    listName: string = '';
    isListNameEmpty: boolean = false;
    isList: boolean;
    allListNames: string[];
    parentListId: string;    
    listLabels: any = {
        title : 'Enter List name',
        placeholder: 'List name',
        errorMsg : 'List name cannot be empty!'
    }

    cardLabels: any = {
        title : 'Enter Card name',
        placeholder: 'Card name',
        errorMsg : 'Card name cannot be empty!'
    }

    labels: Object;

    constructor(private coreService: CoreService, public dialogRef: MatDialogRef<CreateListComponent>,
        @Inject(MAT_DIALOG_DATA) data) {
            this.isList = data.externalData.isList;
            
            if(this.isList){
                this.labels = this.listLabels;
                this.allListNames = data.externalData.allList;                          
            }
            else{                
                this.labels = this.cardLabels;
                this.parentListId = data.externalData.listId;  
            }
    }

    ngOnDestroy() {
        this.createListSub.unsubscribe();
    }

    create(){
        if(this.isList){
            this.createList();
        }
        else{
            this.createCard();
        }
    }

    createList() {
        
        if(!this.validateName() || !this.validateDuplicateListName()){
            return;
        }

        let listObj = {
            'listName' : this.listName,
            'cards' : []
        };
        
        this.createListSub = this.coreService.createList(listObj).subscribe(
            (data) => {
                this.coreService.newList_Publisher();
                this.cancel();
            },
            (err) => {
                console.log('unable to create list due to internal server error', err);
            }
        );
    }

    createCard() {
        if(!this.validateName()){
            return;
        }

        //listName is the card name here
        this.createListSub = this.coreService.getListById(this.parentListId).subscribe(
            (listObj: any) => {
                listObj.cards.push(this.listName);
                this.coreService.updateList(listObj).subscribe(
                    (data) => {                        
                        this.coreService.newList_Publisher();
                        this.cancel();
                    },
                    (err) => {
                        console.log('unable to create card');
                    }
                );
            }
        );        
    }

    validateName() {
        if(this.listName.trim() == ''){
            this.isListNameEmpty = true;
            this.listLabels.errorMsg = 'List name cannot be empty!';
            return false;
        }
        return true;
    }

    validateDuplicateListName() {
        if(this.allListNames.indexOf(this.listName.trim()) > -1){
            this.isListNameEmpty = true;
            this.listLabels.errorMsg = 'Duplicate List name';
            return false;
        }
        return true;
    }

    cancel(){
        this.dialogRef.close();
    }

}