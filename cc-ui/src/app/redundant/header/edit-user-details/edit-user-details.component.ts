import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/profile/profile.service';
import { SessionService } from 'src/app/session.service';
import { EditUserDetailsService } from './edit-user-details.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { DialogComponent } from 'src/app/dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-user-details',
  templateUrl: './edit-user-details.component.html',
  styleUrls: ['./edit-user-details.component.css']
})

export class EditUserDetailsComponent implements OnInit {
  userId?: any
  first_name?: string
  last_name?: string
  address?: string
  phone_no?: string
  showValidationErrors: boolean = false;
  regForm: FormGroup;
  constructor(private dialog: MatDialog, private snackBar: MatSnackBar, private profileService: ProfileService, private formBuilder: FormBuilder, private sessionService: SessionService, private editUserDetailsService: EditUserDetailsService) {
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


    this.profileService.getUserDetails(this.userId).subscribe(
      data => {
        // Handle the data returned by the HTTP GET request
        this.first_name = data.first_name;
        this.last_name = data.last_name;
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
    const timerDuration = 1000;
    const formValue = this.regForm.value;
    if (
      !formValue.firstName ||
      !formValue.lastName
    ) {
      this.showValidationErrors = true;
      let errorMessage = 'The following fields are required:\n';
      if (!formValue.firstName) {
        errorMessage += '- First Name\n';
      }
      if (!formValue.lastName) {
        errorMessage += '- Last Name\n';
      }

      this.openErrorDialog(errorMessage);
      return;
    }

    if (this.regForm.invalid) {
      // Show error messages for invalid fields
      this.regForm.markAllAsTouched();
      return;
    }
    let user = new User(
      this.first_name ?? '',
      this.last_name ?? '',
      this.address ?? '',
      this.phone_no ?? ''
    );

    this.editUserDetailsService.updateUser(this.userId, user).subscribe(
      (data) => {

        this.snackBar.open('Updated Successfully', 'OK', {
          duration: 3000,
          verticalPosition: 'top',
        });
        setTimeout(() => {
          location.reload();
        }, timerDuration);
      },
      (error) => {
        console.error(error);
      }
    );
  }
  openErrorDialog(message: string): void {
    this.dialog.open(DialogComponent, {
      data: {
        message: message
      }
    });
  }
}
export class User {

  constructor(first_name: string, last_name: string, address: string, phone_no: string) {
    this.first_name = first_name; this.last_name = last_name; this.address = address; this.phone_no = phone_no
  }
  first_name!: string
  last_name!: string
  address!: string
  phone_no!: string
}