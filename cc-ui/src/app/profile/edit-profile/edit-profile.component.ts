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
      company_id: ['2', Validators.required],
      name: ['', Validators.required],
      licence_id: ['11', Validators.required],
      domain_address: ['www.jbg', Validators.required],
      company_logo: ['C:\Users\Theje\Downloads\IMG_20230213_135109.jpg', Validators.required],
      company_locations: ['123452345678', Validators.required],
      country: ['india', Validators.required],
      rating:['ffsssss', Validators.required],
      address: ['hgd', Validators.required],
      });
  }

  onEdit(){
    this.editProfileService.edit(this.editprofileForm.value).subscribe(
      (response)=>{
        console.log(response);
        this.router.navigate(['/dashboard'])
      },
      (error)=>{
        console.log('error',error);
      }
      );

  }
}