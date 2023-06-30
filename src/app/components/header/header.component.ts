import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-header',
  template: `
  <h1>Where in the world?</h1>
  <button (click)="toggleTheme()"><svg class="icon"><use href="#moonIcon"></use></svg> {{ this.app.theme.button }}</button>
  `,
  styles: [`
  h1 {
    font-size: 1em;
    color: inherit;
  }
  button {
    background-color: transparent;
    border: none;
    color: inherit;
    font-size: 16px;
    padding: 10px;
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 0.90em;
    font-family: 'Nunito Sans', sans-serif;
    font-weight: 600;
  }
  `]
})
export class HeaderComponent implements OnInit {
  constructor(public app: AppComponent) {}
  ngOnInit() {}

  toggleTheme() {
    if (this.app.theme.mode == 'light') {
      this.app.theme = {
        mode: 'dark',
        button: 'Light Mode'
      }
      document.body.classList.replace('light', 'dark');
    }
    else {
      this.app.theme = {
        mode: 'light',
        button: 'Dark Mode'
      }
      document.body.classList.replace('dark', 'light');
    }
    this.app.saveTheme();
  }
}
