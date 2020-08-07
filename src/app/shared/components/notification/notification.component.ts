import { Component } from '@angular/core';

@Component({
    selector: 'notification',
    template: '<div>{{ msg }} </div>'
})
export class NotificationComponent {
    msg: '';
}