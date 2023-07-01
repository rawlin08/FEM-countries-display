import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-details',
  template: `
  <button routerLink="" id="back"><svg class="icon back"><use href="#backIcon"></use></svg>Back</button>
  <ng-template #loading>
    <div class="loader"></div>
  </ng-template>
  <main *ngIf="this.name$ || this.error$; else loading">
    <div class="error" *ngIf="this.error$">
      <p>Location Not Found. Did you type it in right?</p>
    </div>
    <div class="content" *ngIf="this.name$">
      <div class="imgFill">
        <img src="{{ name$[0].flags.svg }}" alt="{{ name$[0].flags.alt }}">
      </div>
      <div class="information">
        <h2>{{ name$[0].name.official }}</h2>
        <div class="subInformation">
          <section>
            <p><span class="sub">Native Name:</span> {{ name$[0].name.common }}</p>
            <p><span class="sub">Population:</span> {{ name$[0].population.toLocaleString('en-US') }}</p>
            <p><span class="sub">Region:</span> {{ name$[0].region }}</p>
            <p><span class="sub">Sub Region:</span> {{ name$[0].subregion == undefined ? 'No subregion listed.' : name$[0].subregion }}</p>
            <p><span class="sub">Capital:</span> {{ name$[0].capital == undefined ? 'No capital listed.' : name$[0].capital[0] }}</p>
          </section>
          <section>
            <p><span class="sub">Top Level Domain:</span> {{ name$[0].tld[0] }}</p>
            <p><span class="sub">Currencies:</span> {{ getCurrencies() }}</p>
            <p><span class="sub">Languages:</span> {{ getLanguages() }}</p>
          </section>
        </div>
        <section class="border">
          <h2>Border Countries:</h2>
          <p *ngIf="this.borderedCountries.length == 0">No border countries listed.</p>
          <div class="bordered">
            <button class="bordersBttn" (click)="this.selectedBorder(borderCountry[0].name.official)" *ngFor="let borderCountry of this.borderedCountries">{{ borderCountry[0].name.common }}</button>
          </div>
        </section>
      </div>
    </div>
  </main>
    `,
  styles: [`
  .content {
    display: grid;
    place-content: center;
  }
  #back, .bordersBttn {
    font-family: inherit;
    box-shadow: 0 0 5px 4px rgba(0, 0, 0, 0.1);
    background-color: var(--headerBackgroundColor);
    color: inherit;
    border: none;
    transition: background 200ms ease-in-out;
  }
  #back {
    display: flex;
    align-items: center;
    padding: 5px 35px 5px 30px;
    gap: 2px;
    margin: 20px 0 40px 0;
    font-size: 16px;
  }
  .bordersBttn {
    padding: 10px 5px;
    text-align: center;
    font-size: 15px;
  }
  .back {
    width: 30px;
    height: 30px;
  }
  .information > h2 {
    margin: 30px 0;
  }
  .subInformation > section:first-child {
    margin: 0 0 30px 0;
  }
  .border {
    margin: 40px 0;
  }
  section > p {
    margin: 0 0 10px 0;
  }
  .bordered {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(125px, 1fr));
    gap: 10px;
  }
  h2 {
    margin: 0;
  }
  .border > h2 {
    font-weight: 600;
    font-size: 20px;
    margin: 0 0 10px 0;
  }
  img {
    width: 100%;
    max-width: 400px;
    height: auto;
  }
  @media (min-width: 1024px) {
    .content {
      grid-template-columns: 1fr 1fr;
      gap: 20px;
    }
    #back {
      margin: 50px 0;
    }
    .information {
      display: grid;
      place-content: center;
    }
    .subInformation {
      display: flex;
      gap: 100px;
    }
    img {
      width: 100%;
      max-width: fit-content;
    }
    .imgFill {
      display: grid;
      justify-content: left;
      align-items: center;
    }
    .border {
      margin: 0;
    }
  }
  @media (min-width: 1400px) {
    .border {
      margin: 20px 0;
    }
    img {
      min-width: 650px;
      width: 700px;
    }
  }
  `]
})
export class DetailsComponent implements OnInit {
  constructor(public api: ApiService, public route: ActivatedRoute, public router: Router) {}
  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let uid: any = params.get('name');
      this.api.getSpecificLocation(uid).subscribe(
        res => {
          this.name$ = res;
          this.borderedCountries = [];
          if (this.name$[0].borders) {
            this.name$[0].borders.forEach((country:any) => {
              this.api.searchBorderedCountry(country).subscribe((data) => {
                this.borderedCountries.push(data);    
              });
            });
          }
        },
        err => {
          console.log('HTTP Error', err);
          this.error$ = err;
        }
      );
    });
  }

  name$:any;
  error$:any;
  borderedCountries:any = []
  
  getCurrencies() {
    if (this.name$[0].currencies) {
      let key:any = Object.values(this.name$[0].currencies);
      return key[0].name
    }
    else {
      return 'No currencies listed.'
    }
  }
  getLanguages() {
    if (this.name$[0].languages) {
      let key:any = Object.values(this.name$[0].languages);
      key = key.toString();
      key = key.replace(/,/g, ', ');
      return key
    }
    else {
      return 'No languages listed.'
    }
  }
  selectedBorder(country:string) {
    this.router.navigate([`${country}`])
  }
}
