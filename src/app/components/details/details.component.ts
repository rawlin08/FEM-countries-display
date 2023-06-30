import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-details',
  template: `
  <a routerLink="">
    <button id="back"><svg class="icon back"><use href="#backIcon"></use></svg>Back</button>
  </a>
  <ng-template #loading>
    <div class="loader"></div>
  </ng-template>
  <main *ngIf="this.name$; else loading">
    <div class="imgFill">
      <img src="{{ name$[0].flags.png }}" alt="{{ name$[0].flags.alt }}">
    </div>
    <h2>{{ name$[0].name.official }}</h2>
    <section>
      <p><span class="sub">Native Name:</span> {{ name$[0].name.common }}</p>
      <p><span class="sub">Population:</span> {{ name$[0].population.toLocaleString('en-US') }}</p>
      <p><span class="sub">Region:</span> {{ name$[0].region }}</p>
      <p><span class="sub">Sub Region:</span> {{ name$[0].subregion }}</p>
      <p><span class="sub">Capital:</span> {{ name$[0].capital == undefined ? 'No Capital Listed' : name$[0].capital[0] }}</p>
    </section>
    <section>
      <p><span class="sub">Top Level Domain:</span> {{ name$[0].tld[0] }}</p>
      <p><span class="sub">Currencies:</span> {{ getCurrencies() }}</p>
      <p><span class="sub">Languages:</span> {{ getLanguages() }}</p>
    </section>
    <h2>Border Countries:</h2>
    <div class="bordered">
      <button class="bordersBttn" *ngFor="let borderCountry of this.borderedCountries">{{ borderCountry[0].name.common }}</button>
    </div>
</main>
    `,
  styles: [`
  #back, .bordersBttn {
    display: flex;
    align-items: center;
    font-family: inherit;
    padding: 0 25px 0 20px;
    gap: 2px;
    box-shadow: 0 0 5px 4px rgba(0, 0, 0, 0.1);
    margin: 20px 0 40px 0;
    background-color: var(--headerBackgroundColor);
    border: none;
  }
  .back {
    width: 30px;
    height: 30px;
  }
  h2:nth-child(2) {
    margin: 30px 0;
  }
  main > section:nth-child(4) {
    margin: 20px 0 30px 0;
  }
  section {
    display: grid;
    gap: 10px;
  }
  a {
    text-decoration: none;
  }
  .bordered {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
  }
  .bordersBttn {
    padding: 5px 20px;
  }
  h2 {
    margin: 0;
  }
  h2:nth-child(5) {
    font-weight: 600;
    font-size: 20px;
  }
  `]
})
export class DetailsComponent implements OnInit {
  constructor(public api: ApiService, public route: ActivatedRoute) {}
  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let uid: any = params.get('name');
      this.api.getSpecificLocation(uid).subscribe((data) => {
        this.name$ = data;
        console.log(this.name$);
        this.name$[0].borders.forEach((country:any) => {
          this.api.searchBorderedCountry(country).subscribe((data) => {
            this.borderedCountries.push(data)
            console.log(this.borderedCountries);
          });
        });
      });
    });
  }

  name$:any;
  borderedCountries:any = []
  
  getCurrencies() {
    let key:any = Object.values(this.name$[0].currencies);
    return key[0].name
  }
  getLanguages() {
    let key:any = Object.values(this.name$[0].languages); 
    return key
  }
}
