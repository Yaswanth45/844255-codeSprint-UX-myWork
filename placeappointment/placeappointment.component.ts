import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-placeappointment',
  templateUrl: './placeappointment.component.html',
  styleUrls: ['./placeappointment.component.css']
})
export class PlaceappointmentComponent implements OnInit {

  us: User;
  msg: string;

  constructor(
    private userService: UserService,
    private actRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    let empId = this.actRoute.snapshot.params.id;
    if (empId) {
      this.userService.getAllById(empId).subscribe(
        (data) => {
          this.us = data;

        }
      );

    } else {
      this.us = {
        empId: 0,
        firstName: '',
        lastName: '',
        age: 0,
        streetName: '',
        city: '',
        state: '',
        country: '',
        trainerPreference: '',
        package: '',
        mobileNumber: '',
        email: '',
      };
    }
  }
  save() {
    let ob: Observable<User>;
    ob = this.userService.add(this.us);

    ob.subscribe(
      (Data) => {
        this.router.navigateByUrl("");
      },
      (errResponse) => {
        this.msg = errResponse.error;

      }
    );
  }
}