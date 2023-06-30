import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
  <h1>Where in the world?</h1>
  <button><svg class="icon"><use href="#moonIcon"></use></svg> Dark Mode</button>
  `,
  styles: [`
  h1 {
    font-size: 1em;
  }
  button {
    background-color: transparent;
    border: none;
    color: var(--iconColor);
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
export class HeaderComponent {

}
