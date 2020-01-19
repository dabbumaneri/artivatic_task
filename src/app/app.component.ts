import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NgModel } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { GeocodeService } from './geocode.service';
import { Location } from './location-model';
import {ApiListService} from './api-list.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'Artivatic';
  address = '';
  location: Location;
  loading: boolean;
  public city_name;
  public stateValue;
  public state_details_arr;
  public state_details:any = [];
  public data:any;
  public state_data;
  public city_list:any =[];
  constructor(private ApiListService: ApiListService,
    private geocodeService: GeocodeService,
    private ref: ChangeDetectorRef,) { }

  ngOnInit() {
    
    this.data = this.ApiListService.getState();
    this.data.subscribe(resp=>{
      console.log(resp);
      for(let i in resp){
        this.state_details.push(resp[i].State);
      }
      this.state_details_arr = [... new Set(this.state_details)];
     
    });
    
  }

  getDistrict(state){
    this.state_data = this.ApiListService.getState();
    this.state_data.subscribe(resp=>{
      console.log(resp);
      for(let i in resp){
        if(resp[i].State == state){
          this.city_list.push(resp[i].City);
        }
      }
      console.log(this.city_list);
     
    });
  }

  getCityName(){
    if(this.city_name){
      this.address = this.city_name;
      this.addressToCoordinates();
    }
  }

  addressToCoordinates() {
    this.loading = true;
    this.geocodeService.geocodeAddress(this.address)
    .subscribe((location: Location) => {
      console.log("===",location);
        this.location = location;
        this.loading = false;
        this.ref.detectChanges();  
      }      
    );     
  }



  ngOnDestroy() {
    this.state_data.unsubscribe();
    this.data.unsubscribe();
  }



}
