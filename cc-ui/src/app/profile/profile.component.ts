import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from './profile.service';
import { Router } from '@angular/router';
import { SignInService } from '../sign-in/sign-in.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent  implements OnInit{
  company_list :any;
  showDiv = false;
  profileForm!:FormGroup;
  company_id: any;
  constructor(private formBuilder: FormBuilder,private router:Router,private profileService:ProfileService,private signInService: SignInService){

  }
  ngOnInit(): void {
    this.profileForm = this.formBuilder.group({
      name: ['', Validators.required],
      // licence_id: ['11', Validators.required],
      domain_address: ['', Validators.required],
      rating:['', Validators.required],
      address: ['', Validators.required],
      });
      this.profileService.getCompanyById(this.company_id).subscribe(
        data => {
          console.log(
          this.company_id = data);
        },
      );
  }
  // const company_id = this.signInService.getCompanyById();
  // this.signInService.getCompanyById(company_id).subscribe(
  //   (data) => {
  //     this.company_list = data;
  //   },
  //   (error) => {
  //     console.error(error);
  //   }
  // );
  onSubmit (){
   (company_id:number)=>{
      // this.profileService.subscribe(data=>{
      //   this.profileForm.patchValue(data);
      // })
    }
  }
    // this.editprofileForm = this.formBuilder.group({
    //   company_id: ['2', Validators.required],
    //   name: ['', Validators.required],
    //   licence_id: ['11', Validators.required],
    //   domain_address: ['www.jbg', Validators.required],
    //   company_logo: ['C:\Users\Theje\Downloads\IMG_20230213_135109.jpg', Validators.required],
    //   company_locations: ['123452345678', Validators.required],
    //   country: ['india', Validators.required],
    //   rating:['ffsssss', Validators.required],
    //   address: ['hgd', Validators.required],
    //   });
  }
 
    // this.editProfileService.edit(this.editprofileForm.value).subscribe(
    //   (response)=>{
    //     console.log(response);
    //     this.router.navigate(['/profile'])
    //   },
    //   (error)=>{
    //     console.log('error',error);
    //   }
    //   );
  

