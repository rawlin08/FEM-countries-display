import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor() {}
  ngOnInit() {
    this.theme = JSON.parse(localStorage.getItem('theme')!);
    if (!this.theme) {
      this.theme = {
        mode: 'light',
        button: 'Dark Mode',
        icon: 'moonIcon'
      };
    }
    document.body.classList.add(this.theme.mode);
    this.saveTheme();
  }
  theme:any;
  saveTheme() {
    localStorage.setItem('theme', JSON.stringify(this.theme));
  }
}
