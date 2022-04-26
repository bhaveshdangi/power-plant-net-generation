import { MapsAPILoader, MouseEvent } from '@agm/core';
import { HttpClient } from '@angular/common/http';
import {
  Component,
  ElementRef, Inject,
  NgZone,
  OnInit,
  ViewChild,
} from '@angular/core';
import { throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import {DOCUMENT} from "@angular/common";

@Component({
  selector: 'my-agm-example',
  templateUrl: './my-agm-example.component.html',
  styleUrls: ['./my-agm-example.component.css'],
})
export class MyAgmExampleComponent implements OnInit {
  title: string = 'AGM project';
  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  private geoCoder;

  @ViewChild('search')
  public searchElementRef: ElementRef;
  plantMarkers: any[] = [];
  isState: boolean = false;
  url = 'http://localhost/net-generation';
  data: any = [];

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private http: HttpClient,
    @Inject(DOCUMENT) private document: Document) {
  }

  errorHandler(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }

  ngOnInit() {
    this.mapsAPILoader.load().then(() => {
      // this.setCurrentLocation();
      this.setDefaultLocation();
      this.geoCoder = new google.maps.Geocoder();
      var options = {
        componentRestrictions: { country: 'us' },
      };

      let autocomplete = new google.maps.places.Autocomplete(
        this.searchElementRef.nativeElement,
        options
      );
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          console.log('place', place);
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 6;
         /* this.data.filter(s=>s.state == place.address_components[0].short_name).map(s => {
            this.plantMarkers = s.plants;
            this.isState = true;
          });*/
          this.http
            .get('http://' + this.document.defaultView.location.hostname + '/net-generation?state=' + place.address_components[0].short_name)
            .pipe(retry(1), catchError(this.errorHandler))
            .subscribe((data: {}) => {
              this.data = data;
              this.plantMarkers = this.data.plants;
              this.isState = true;
            });
        });
      });
    });
  }

  private setDefaultLocation = () => {
    (this.latitude = 39.94077228325669), (this.longitude = -102.02018743983957);
    this.zoom = 4;
  };

  // Get Current Location Coordinates
  // private setCurrentLocation() {
  //   if ('geolocation' in navigator) {
  //     navigator.geolocation.getCurrentPosition((position) => {
  //       this.latitude = position.coords.latitude;
  //       this.longitude = position.coords.longitude;
  //       this.zoom = 8;
  //       this.getAddress(this.latitude, this.longitude);
  //     });
  //   }
  // }

  // markerDragEnd($event: MouseEvent) {
  //   console.log($event);
  //   this.latitude = $event.coords.lat;
  //   this.longitude = $event.coords.lng;
  //   this.getAddress(this.latitude, this.longitude);
  // }

  // getAddress(latitude, longitude) {
  //   this.geoCoder.geocode(
  //     { location: { lat: latitude, lng: longitude } },
  //     (results, status) => {
  //       console.log(results);
  //       console.log(status);
  //       if (status === 'OK') {
  //         if (results[0]) {
  //           this.zoom = 12;
  //           this.address = results[0].formatted_address;
  //         } else {
  //           window.alert('No results found');
  //         }
  //       } else {
  //         window.alert('Geocoder failed due to: ' + status);
  //       }
  //     }
  //   );
  // }
}
