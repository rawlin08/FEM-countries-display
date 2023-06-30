import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-home',
  template: `
  <main>
    <div class="fields">
      <div class="searchbar">
        <form (input)="this.searchForLocation($event, search.value)">
          <label for="search">
            <svg class="icon searchIcon"><use href="#searchIcon"></use></svg>
          </label>
          <input id="search" #search type="search" placeholder="Search for a country...">
        </form>
      </div>
      <label for="region-select">Filter by Region:</label>
      <select name="pets" id="region-select">
        <option value="">--Please choose an option--</option>
        <option value="africa">Africa</option>
        <option value="america">America</option>
        <option value="asia">Asia</option>
        <option value="europe">Europe</option>
        <option value="oceania">Oceania</option>
      </select>
    </div>
    <div class="results">
      <div class="card" *ngFor="let country of results$" routerLink="{{ country.name.common }}">
        <div class="imgFill">
          <img src="{{ country.flags.png }}" alt="{{ country.flags.alt }}">
        </div>
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
  }
  input:focus {
    outline: none;
  }
  .results {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 20px;
    overflow-y: auto;
  }
  .card {
    background-color: var(--headerBackgroundColor);
    box-shadow: 0 0 5px 4px rgba(0, 0, 0, 0.1);
    margin: 0 20px;
    cursor: pointer;
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
  `]
})
export class HomeComponent implements OnInit {
  constructor(public api: ApiService) {}
  ngOnInit() {
    this.api.getAllLocations().subscribe((data) => {
      this.results$ = data;
      console.log(this.results$);
      this.isLocationsSearched = true;
    })
  }

  isLocationsSearched:boolean = false;
  results$:any;

  searchForLocation(e: Event, input:string) {
    e.preventDefault();
    if (input == '') {
      this.api.getAllLocations().subscribe((data) => {
        this.results$ = data;
        console.log(this.results$);
        this.isLocationsSearched = true;
      })
    }
    else {
      this.api.searchLocation(input).subscribe((data) => {
        this.results$ = data;
        console.log(this.results$);
      })
    }
  }
}
