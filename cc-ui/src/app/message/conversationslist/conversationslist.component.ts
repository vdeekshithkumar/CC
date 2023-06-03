import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-conversationslist',
  templateUrl: './conversationslist.component.html',
  styleUrls: ['./conversationslist.component.css']
})
export class ConversationslistComponent {
    conversations = [
        { name: 'John Doe' },
        { name: 'Jane Smith' },
        { name: 'Mark Johnson' }
    ];

    @Output() conversationSelected = new EventEmitter<string>();

    selectConversation(conversationName: string) {
        this.conversationSelected.emit(conversationName);
    }

    //

    activeTab: number = 1;

    usersWithProfile = [
      { name: 'Robert',online: true,profilePhoto: '../assets/images/IMG_20230213_135109.jpg', message: 'we can buy 300 20DC containers with 30$ per container',company:'SRS Systems LTD ' },
      { name: 'Katrin ',online: true, profilePhoto: '../assets/images/IMG_20230213_135109.jpg', message: 'Buy deed is for 20DC containers with 30$ and sell is for 40$',company:'HLM Systems LTD ' },
      { name: 'Sathish',online: false, profilePhoto: '../assets/images/IMG_20230213_135109.jpg', message: 'Here the negotiation is not agreed and contract cannot be signed',company:'BHAR Systems LTD ' },
      // Add more users with profile details here
    ];
    selectedUser: any; // Replace 'any' with the type of your user object

  // Method to handle user selection
  selectUser(user: any) {
    this.selectedUser = user;
  }
 
  
    usersWithoutProfile = [
      { name: 'Robert', message: 'Negotiation for sale' },
      // Add more users without profile details here
    ];
  
    selectTab(tab: number) {
      this.activeTab = tab;
    }
    
    
  getCurrentTime() {
    const currentTime = new Date();
    const formattedTime = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return formattedTime;
  }
}

