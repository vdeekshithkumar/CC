import { Component, OnInit } from '@angular/core';
import { UploadService } from './upload.service';
import { FormGroup } from '@angular/forms';
import { SessionService } from '../session.service';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
    selector: 'app-upload-contract',
    templateUrl: './upload-contract.component.html',
    styleUrls: ['./upload-contract.component.css'],
    standalone: false
})
export class UploadContractComponent implements OnInit {
  contractForm!: FormGroup;
  description!: any;
  companyId: any;
  userId: any;
  title!: any;
  fileName?: string
  statusMsg?: string
  showFile: boolean = false
  files!: File[];

  constructor(private snackBar: MatSnackBar, private uploadService: UploadService, private sessionService: SessionService) {
  }

  ngOnInit(): void {
    //get company id from session
    this.sessionService.getCompanyId().subscribe(
      (companyId: number) => {
        this.companyId = companyId;
        console.log('company ID is :', companyId);
      },
      (error: any) => {
        console.error('Error retrieving company ID:', error);
      }
    );

    //user id from session 
    this.sessionService.getUserId().subscribe(
      (userId: number) => {
        this.userId = userId;
        console.log('User ID is :', userId);
      },
      (error: any) => {
        console.error('Error retrieving user ID:', error);
      }
    );
  }

  async onChange($event: Event) {

    const target = $event.target as HTMLInputElement;
    const files: FileList = target.files as FileList;
    this.files = Array.from(files);

    this.showFile = !this.showFile;
    if (this.showFile) {
      for (const file of this.files) {
        this.snackBar.open(`${file.name} has been selected for upload`, 'Close', {
          duration: 3000,
          verticalPosition: 'top', // Set the duration to 3000 milliseconds (3 seconds)
        });
      }
    }
    // await setTimeout(() => { this.showFile = !this.showFile }, 3000);
  }

  async onUpload() {
    if (this.title == null || this.description == null || this.files == null) {
      this.snackBar.open(`All the fields are mandatory!!`, 'Close', {
        duration: 3000,
        verticalPosition: 'top',// Set the duration to 3000 milliseconds (3 seconds)
      });
    }

    if (this.files.length > 0) {

      this.title = this.title.trim().toLowerCase();
      this.uploadService.uploadFile(this.files, this.userId, this.companyId, this.description, this.title).subscribe((response: any) => {

        if (response.message === 'Success') {
          this.statusMsg = 'Success';
          setTimeout(() => {
            this.statusMsg = "";
            this.snackBar.dismiss();
          }, 2000);
          const snackBarRef: MatSnackBarRef<any> = this.snackBar.open(`Successfully uploaded the file.`, 'Close', {
            duration: 2000
          });
          this.clear();
        } else {
          this.statusMsg = 'Failed';
          console.log(response.status);
          this.snackBar.open('Holy smokes! Something seriously bad happened.', 'Close');
        }
      });
    }
  }
  clear() {
    this.description = null
  }
}