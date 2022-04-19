import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {  AgmMap ,AgmCoreModule} from '@agm/core';
import { GoogleMapsModule } from '@angular/google-maps';


@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})

export class LocationComponent implements OnInit {

  latitude=51.678418;
  longitude=7.809007;
  constructor() {

}

  ngOnInit(): void {
  }

}
