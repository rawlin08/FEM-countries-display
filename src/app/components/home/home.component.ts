import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-home',
  template: `
  <main>
    <div class="fields">
      <div class="searchbar">
        <form (input)="this.search($event, searchbox.value, select.value)">
          <label for="search">
            <svg class="icon searchIcon"><use href="#searchIcon"></use></svg>
          </label>
          <input id="search" #searchbox type="search" placeholder="Search for a country...">
        </form>
      </div>
      <div class="filter">
        <form (input)="search($event, searchbox.value, select.value)">
          <label for="region-select">Filter by Region</label>
          <select #select name="region-select" id="region-select">
            <option value="">None</option>
            <option value="Africa">Africa</option>
            <option value="Americas">America</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>
          </select>
        </form>
      </div>
    </div>
    <ng-template #loading>
      <div class="loader"></div>
    </ng-template>
    <div class="results" *ngIf="this.results$; else loading">
      <p *ngIf="this.results$.length == 0">No Results</p>
      <div class="card" *ngFor="let country of results$" routerLink="{{ country.name.official }}">
        <img src="{{ country.flags.png }}" alt="{{ country.flags.alt }}">
        <div class="details">
          <h2>{{ country.name.official }}</h2>
          <p><span class="sub">Population:</span> {{ country.population.toLocaleString("en-US") }}</p>
          <p><span class="sub">Region:</span> {{ country.region }}</p>
          <p><span class="sub">Capital:</span> {{ country.capital == undefined ? 'No Capital Listed' : country.capital[0] }}</p>
        </div>
      </div>
    </div>
  </main>
  `,
  styles: [`
  .results > p {
    text-align: center;
  }
  .searchbar > form {
    display: flex;
    align-items: center;
    gap: 10px;
    background-color: var(--headerBackgroundColor);
    border-radius: 8px;
    box-shadow: 0 0 5px 4px rgba(0, 0, 0, 0.1);
  }
  .searchIcon {
    padding: 0 0 0 15px;
  }
  input[type="search"] {
    border: none;
    padding: 15px 0;
    width: 85%;
    font-family: 'Nunito Sans', sans-serif;
    background-color: var(--headerBackgroundColor);
    color: inherit;
    transition: color 500ms ease-in-out;
  }
  input:focus {
    outline: none;
  }
  .filter {
    position: relative;
    background-color: var(--headerBackgroundColor);
    border-radius: 8px;
    padding: 15px;
    box-shadow: 0 0 5px 4px rgba(0, 0, 0, 0.1);
    margin: 30px 0;
    width: 200px;
  }
  .filter select {
    background-color: transparent;
    border: none;
    text-align: right;
    color: inherit;
  }
  .filter > form {
    display: flex;
    justify-content: space-between;
  }
  .results {
    display: grid;
    grid-template-columns: repeat(auto-fit, var(--card-width));
    place-content: center;
    gap: 50px;
    overflow-y: auto;
  }
  .card {
    background-color: var(--headerBackgroundColor);
    box-shadow: 0 0 5px 4px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    border-radius: 8px;
    width: var(--card-width);
  }
  img {
    height: 175px;
    width: var(--card-width);
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  } 
  form > label {
    display: flex;
    align-items: center;
  }
  h2 {
    margin: 15px 0;
  }
  .details {
    padding: 0 20px 30px 20px;
  }
  /* DESKTOP */
  @media (min-width: 1281px) {
    .fields {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 50px;
      margin: 10px 0 20px 0;
    }
    .filter {
      margin: 0;
    }
  }
  `]
})
export class HomeComponent implements OnInit {
  constructor(public api: ApiService) {}
  ngOnInit() {
    this.api.getAllLocations().subscribe((data) => {
      this.data = data;
      this.results$ = this.data;
      console.log(this.data);
      this.isLocationsSearched = true;
    })
  }

  data:any;
  results$:any;
  isLocationsSearched:boolean = false;

  search(e: Event, input:string, filter:string) {
    e.preventDefault();
    if (input != '' && filter != '') {
      this.results$ = this.data.filter((location:any) => location.name.official.toLowerCase().includes(input.toLowerCase()) && location.region == filter);
      console.log('Both');
      console.log(this.results$);
    }
    else if (input != '' && filter == '') {
      this.results$ = this.data.filter((location:any) => location.name.official.toLowerCase().includes(input.toLowerCase()));
      console.log('Input');
      console.log(this.results$);
    }
    else if (input == '' && filter != '') {
      this.results$ = this.data.filter((location:any) => location.region == filter);
      console.log('Filter');
      console.log(this.results$);
    }
    else {
      console.log('Both Empty');
      this.results$ = this.data;
    }
  }
}
