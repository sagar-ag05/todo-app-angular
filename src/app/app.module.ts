import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule, MatSnackBar, MatSnackBarModule } from '@angular/material'; 
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ListComponent } from './list/list.component';
import { CreateListComponent } from './shared/dialog/create-list/create-list.component';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    CreateListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    MatDialogModule,
    BrowserAnimationsModule,
    DragDropModule,
    MatSnackBarModule
  ],
  providers: [MatSnackBar],
  bootstrap: [AppComponent],
  entryComponents: [CreateListComponent]
})
export class AppModule { }
