import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ApiListService {

  constructor( private http: HttpClient) { }

  getState() {
    return this.http.get('https://indian-cities-api-nocbegfhqg.now.sh/cities');
  }

}
