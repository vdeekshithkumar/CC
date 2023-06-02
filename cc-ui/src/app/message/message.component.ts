import { Component } from '@angular/core';


@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent {
  selectedConversation: string;
    
      constructor() {
        this.selectedConversation = '';
    }
  
      onConversationSelected(conversationName: string) {
          this.selectedConversation = conversationName;
      }
    
}


