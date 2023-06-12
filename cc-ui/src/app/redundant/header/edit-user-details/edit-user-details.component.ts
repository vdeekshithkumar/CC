import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/profile/profile.service';
import { SessionService } from 'src/app/session.service';
import { EditUserDetailsService } from './edit-user-details.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-edit-user-details',
  templateUrl: './edit-user-details.component.html',
  styleUrls: ['./edit-user-details.component.css']
})

export class EditUserDetailsComponent implements OnInit {
  userId?: any
  fname?: string
  lname?: string
  address?: string
  phone_no?: string
  regForm: FormGroup;
  constructor(private profileService: ProfileService, private formBuilder: FormBuilder,private sessionService: SessionService, private editUserDetailsService: EditUserDetailsService) { 
  this.regForm = this.formBuilder.group({
    firstName: ['', [Validators.required, Validators.pattern('[A-Za-z]{1,32}')]],
    lastName: ['', [Validators.required, Validators.pattern('[A-Za-z]{1,32}')]],
    phone_no: ['', [Validators.required, Validators.pattern('[0-9]{1,}')]],
    address: ['']
  });
}
  ngOnInit(): void {
    this.sessionService.getUserId().subscribe(
      (userId: string) => {
        this.userId = parseInt(userId);
        // Use this.userId as a number
      },
      (error: any) => {
        console.error('Error retrieving user ID:', error);
      }
    );
    
    debugger
    this.profileService.getUserDetails(this.userId).subscribe(
      data => {
        // Handle the data returned by the HTTP GET request
        this.fname = data.fname;
        this.lname = data.lname;
        this.address = data.address;
        this.phone_no = data.phone_no;
      },
      error => {
        // Handle any errors that occur
        console.warn("oninit error" + error);
      }
    );
  }
  onSubmit() {
    debugger
    if (this.regForm.invalid) {
      // Show error messages for invalid fields
      this.regForm.markAllAsTouched();
      return;
    }
    let user = new User(
      this.fname ?? '',
      this.lname ?? '',
      this.address ?? '',
      this.phone_no ?? ''
    );
    debugger
    this.editUserDetailsService.updateUser(this.userId, user).subscribe(
      (data) => {
        debugger
        location.reload();
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
export class User {
  /**
   *
   */
  constructor(fname: string, lname: string, address: string, phone_no: string) {
    this.fname = fname; this.lname = lname; this.address = address; this.phone_no = phone_no
  }
  fname!: string
  lname!: string
  address!: string
  phone_no!: string
}