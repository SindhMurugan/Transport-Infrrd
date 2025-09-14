import { Component } from '@angular/core';

import { AddNewRideComponent } from './add-new-ride/add-new-ride.component';

@Component({
  selector: 'app-root',
  imports: [AddNewRideComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'transport';
}
