import { Component, OnInit } from '@angular/core';
import { UploadService } from './upload.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-upload-contract',
    templateUrl: './upload-contract.component.html',
    styleUrls: ['./upload-contract.component.css']
})
export class UploadContractComponent implements OnInit {
    contractForm!: FormGroup;
    description!:"None"
    constructor(private uploadService:UploadService, private formBuilder: FormBuilder) {
    }
    

    ngOnInit(): void { }

    onChange($event: Event) {
        const target = $event.target as HTMLInputElement;
        const file: File = (target.files as FileList)[0];
    
        if (file) {
          this.uploadService.uploadFile(file,10,2, this.description).subscribe(response => {
            console.log(response);
          });
        }
      }
}
