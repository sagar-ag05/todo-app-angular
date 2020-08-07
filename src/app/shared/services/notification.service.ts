import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {

    config = { duration: 2000 };

    constructor(private snackBar: MatSnackBar){        
    }

    showNotification(msg){
        this.snackBar.open(msg, 'Close', this.config);
    }
}