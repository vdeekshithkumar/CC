import { Component } from '@angular/core';
@Component({
  selector: 'app-messagecontent',
  templateUrl: './messagecontent.component.html',
  styleUrls: ['./messagecontent.component.css']
})
export class MessagecontentComponent {
  messages: { sender: string, content: string }[] = [];
  newMessage: string = '';

  sendMessage() {
      if (this.newMessage !== '') {
          const message = {
              sender: 'User',
              content: this.newMessage
          };
          this.messages.push(message);
          this.newMessage = '';
      }
  }
}
