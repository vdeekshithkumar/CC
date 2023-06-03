import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-profiledetails',
  templateUrl: './profiledetails.component.html',
  styleUrls: ['./profiledetails.component.css']
})
export class ProfiledetailsComponent {
  @Input() selectedConversation!: string;
  usersWithProfile = [
    { name: 'Robert',online: true,profilePhoto: '../assets/images/IMG_20230213_135109.jpg', message: 'we can buy 300 20DC containers with 30$ per container',company:'SRS Systems LTD ' },
    { name: 'Katrin ',online: true, profilePhoto: '../assets/images/IMG_20230213_135109.jpg', message: 'Buy deed is for 20DC containers with 30$ and sell is for 40$',company:'HLM Systems LTD ' },
    { name: 'Sathish',online: false, profilePhoto: '../assets/images/IMG_20230213_135109.jpg', message: 'Here the negotiation is not agreed and contract cannot be signed',company:'BHAR Systems LTD ' },
    // Add more users with profile details here
  ];
}
