import { MapsAPILoader } from '@agm/core';
import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { MapService } from './services/map.service';
declare var google: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  lat: number = 30.9655984;
  lng: number = 30.6210818;
  zoom = 15;
  locationChose = false;
  location: string;
  address: any;

  @ViewChild('search')
  public searchElementRef: ElementRef;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private mapService: MapService,
  ) { }

  ngOnInit() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.lat = position.coords.latitude;
      this.lng = position.coords.longitude;
    });

    this.loadPlacesAutocomplete()
  }


  loadPlacesAutocomplete() {
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new window['google']['maps']['places']['Autocomplete'](this.searchElementRef.nativeElement);
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          let place: any = google.maps.places.PlaceResult = autocomplete.getPlace();
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          this.lat = place.geometry.location.lat();
          this.lng = place.geometry.location.lng();
          this.address = place?.address_components[0].long_name
        });
      });
    });
  }

  onChoseLocation(event) {
    this.lat = event.coords.lat;
    this.lng = event.coords.lng;
    this.locationChose = true;
    this.location = `${this.lat},${this.lng}`;
    this.mapService.getLocation(this.location).subscribe((data: any) => {
      if (data.results != '') {
        let location = data.results;
        this.address = location[0].formatted_address;
      }
    });
  }


}
