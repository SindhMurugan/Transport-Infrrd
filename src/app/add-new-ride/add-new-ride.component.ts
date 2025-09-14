import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RideDataModel } from '../data-model.interface';
import { ServiceService } from '../shareData/service.service';
import { CommonModule } from '@angular/common';
import { RideListComponent } from '../ride-list/ride-list.component';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-add-new-ride',
  imports: [FormsModule,ReactiveFormsModule,CommonModule,RideListComponent,MatButtonModule],
  templateUrl: './add-new-ride.component.html',
  styleUrl: './add-new-ride.component.css'
})
export class AddNewRideComponent {

   addNewRideForm: FormGroup;
  newRide: Record<string, string> = {};
  restoreRideDataFromStorage: RideDataModel[] = new Array();

  constructor(private fb: FormBuilder, private service: ServiceService) {
    this.addNewRideForm = this.fb.group({
      employee_id: ['', Validators.required],
      vehicle_type: [''],
      vehicle_No: ['', [Validators.required, Validators.minLength(4)]],
      vacant_Seat: ['', Validators.required],
      time: ['', Validators.required],
      pickup_Point: ['', Validators.required],
      destination: ['', Validators.required],
    });
  }

  get getFormControls() {
    return this.addNewRideForm.controls;
  }

  addedNewRide():void {
    const active_employeeId = this.addNewRideForm.get('employee_id')?.value;
    const checkEmployeeId = this.service.getValueFromLocalStorage.some(
      (ride: RideDataModel) => ride.employee_id == active_employeeId
    );
    if (checkEmployeeId) {
      alert('This employee id is already exits');
      return;
    }

    this.newRide = this.addNewRideForm.value;
    this.addNewRideForm.reset();
  }

}
