import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiKeyMap } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  lang: string = 'ar';

  constructor(private http: HttpClient) {
    this.lang = localStorage.getItem('lang');
  }

  urlLocation = 'https://maps.googleapis.com/maps/api/geocode/json';

  getLocation(latlng) {
    return this.http.get(
      `${this.urlLocation}?latlng=${latlng}&language=${this.lang}&key=${apiKeyMap}`
    );
  }

}
