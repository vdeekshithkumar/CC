import { Component, OnInit } from '@angular/core';
import { UploadService } from './upload.service';
import { FormGroup } from '@angular/forms';
import { SessionService } from '../session.service';



@Component({
  selector: 'app-upload-contract',
  templateUrl: './upload-contract.component.html',
  styleUrls: ['./upload-contract.component.css']
})
export class UploadContractComponent implements OnInit {
  contractForm!: FormGroup;
  description!: any;
  companyId: any;
  userId: any;
  title!: any;
  fileName: string = "Not selected"
  file?: File
  statusMsg?:string

  constructor(private uploadService: UploadService, private sessionService: SessionService) {
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

  onChange($event: Event) {
    debugger
    const target = $event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    this.file = file
    this.title = file.name
  }
  onUpload() {
    
    if (this.file) {
      debugger
      this.uploadService.uploadFile(this.file, this.userId, this.companyId, this.description, this.title).subscribe((response: any) => {
        debugger
        if (response.message === 'Success') {
          this.statusMsg = 'Success';
        } else {
          this.statusMsg = 'Failed';
          console.log(response.status) ;
        }
      });
    }
  }
}
