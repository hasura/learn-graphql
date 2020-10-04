import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'App',
  templateUrl: './app.component.html',
})
export class App {
  @Output() logout: EventEmitter<any> = new EventEmitter();

  logoutHandler(item: any) {
    this.logout.emit(item);
  }
}
