import { Component, Input } from '@angular/core';
import { RideDataModel } from '../data-model.interface';
import { ServiceService } from '../shareData/service.service';
import { FormsModule } from '@angular/forms';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { FilterPipe } from '../filter/filter.pipe';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-ride-list',
  imports: [FormsModule,CommonModule,TitleCasePipe,FilterPipe,MatButtonModule],
  templateUrl: './ride-list.component.html',
  styleUrl: './ride-list.component.css'
})
export class RideListComponent {

   @Input() newRideData: Record<string, string> = {};
  restoreRideDataFromStorage: RideDataModel[] = new Array();
  current_time = new Date();
  userInput: string = '';
  activeUser: number = 0;

  constructor(private service: ServiceService) {}

  ngOnChanges(changes: any): void {
    if (changes.newRideData.previousValue) {
      let existingData: any = this.service.getValueFromLocalStorage;
      existingData.push(changes.newRideData.currentValue);
      this.activeUser = changes.newRideData.currentValue.employee_id;
      this.service.setValueToLocalStorage(existingData);
    }
    this.restoreRideDataFromStorage = this.service.getValueFromLocalStorage;
  }

  ngOnInit(): void {
    this.restoreRideDataFromStorage = this.service.getValueFromLocalStorage;
  }

 
  rideBooked(rideDetails: RideDataModel): void {
    if (rideDetails.employee_id == this.activeUser) {
      alert("Sorry , you can't book the ride twise");
      return;
    }

    if (rideDetails['vacant_Seat'] > 0) {
      let bookedRide: RideDataModel = {
        ...rideDetails,
        vacant_Seat: rideDetails['vacant_Seat'] - 1,
      };

      this.restoreRideDataFromStorage.forEach((ride) => {
        if (ride.employee_id == rideDetails.employee_id) {
          let index = this.restoreRideDataFromStorage.indexOf(ride);
          this.restoreRideDataFromStorage[index] = bookedRide;
        }
      });

      this.service.setValueToLocalStorage(this.restoreRideDataFromStorage);
      this.restoreRideDataFromStorage = this.service.getValueFromLocalStorage;
    }
  }

}
