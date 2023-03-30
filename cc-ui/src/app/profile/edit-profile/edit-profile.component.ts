import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EditProfileService } from './edit-profile.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit{
  editprofileForm!:FormGroup;
  constructor(private formBuilder: FormBuilder,private router:Router,private editProfileService:EditProfileService){

  }
  ngOnInit(): void {
    this.editprofileForm = this.formBuilder.group({
      companyName: ['', Validators.required],
      domainAddress: ['', Validators.required],
       companyAddress:['', Validators.required],
       rating:['',Validators.required],
      });
  }

  onEdit(){
    this.editProfileService.edit(this.editprofileForm.value).subscribe(
      (response)=>{
        console.log(response);
        this.router.navigate(['/profile'])
      },
      (error)=>{
        console.log('error',error);
      }
      );
  
  }
}
