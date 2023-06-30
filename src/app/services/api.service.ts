import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getAllLocations() {
    return this.http.get(`https://restcountries.com/v3.1/all`);
  }
  getSpecificLocation(location:string) {
    return this.http.get(`https://restcountries.com/v3.1/name/${location}?fullText=true`);
  }
}
