import { Component } from '@angular/core';
import { Main } from './containers/main/main';

@Component({
  selector: 'app-root',
  imports: [Main],
  template: '<div><app-main /></div>',
})
export class App {}
