import { Component, OnInit } from '@angular/core';
import { UploadService } from './upload.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SessionService } from '../session.service';
import { Router } from '@angular/router';


@Component({
    selector: 'app-upload-contract',
    templateUrl: './upload-contract.component.html',
    styleUrls: ['./upload-contract.component.css']
})
export class UploadContractComponent implements OnInit {
    contractForm!: FormGroup;
    description!:any;
    companyId:any;
    userId:any;
    title!:any; 

    constructor(private uploadService:UploadService, private formBuilder: FormBuilder,private sessionService: SessionService,private router:Router) {
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
        const target = $event.target as HTMLInputElement;
        const file: File = (target.files as FileList)[0];
    
        if (file) {
          this.uploadService.uploadFile(file,this.userId,this.companyId, this.description,this.title).subscribe(response => {
            console.log(response);
          });
        }
      }
}
