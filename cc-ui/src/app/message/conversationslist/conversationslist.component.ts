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
      { name: 'Robert', profilePhoto: '../assets/images/IMG_20230213_135109.jpg', message: 'we can buy 300 20DC containers with 30$ per container',company:'SRS Systems LTD ' },
      { name: 'Katrin ', profilePhoto: '../assets/images/IMG_20230213_135109.jpg', message: 'Buy deed is for 20DC containers with 30$ and sell is for 40$',company:'HLM Systems LTD ' },
      { name: 'Sathish', profilePhoto: '../assets/images/IMG_20230213_135109.jpg', message: 'Here the negotiation is not agreed and contract cannot be signed',company:'BHAR Systems LTD ' },
      // Add more users with profile details here
    ];
  
    usersWithoutProfile = [
      { name: 'Robert', message: 'Negotiation for sale' },
      // Add more users without profile details here
    ];
  
    selectTab(tab: number) {
      this.activeTab = tab;
    }
}

