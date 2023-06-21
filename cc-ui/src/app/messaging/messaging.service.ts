import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { conversation } from '../DTO/conversation';
import { Message } from '../DTO/Message';
import { participant,Candidate } from '../DTO/Participant';


@Injectable({
  providedIn: 'root'
})
export class MessagingService {

  constructor(private http : HttpClient) { }
  getConversationByCompanyId(companyId:number){
    return this.http.get<conversation[]>(`https://localhost:7157/GetConversationByCompanyId?companyId=${companyId}`);
  }
  getMessges(conversationId:number)
  {
    return this.http.get<Message[]>(`https://localhost:7157/GetMessagesByConversationId?conversationId=${conversationId}`);
  }
  sendMessage(message:Message)
  {
    return this.http.post (`https://localhost:7157/SendMessage`,message)
  }
  GetParticipants(convoID:number)
  {
    return this.http.get<participant[]>(`https://localhost:7157/GetParticipantsByConversationId?convoid=${convoID}`)
  }
  GetUsersAsync(convoID:number , companyId:number)
  {
    return this.http.get<Candidate[]> (`https://localhost:7157/GetUsers?convoid=${convoID}&companyId=${companyId}`)
  }
   AddParticipant (participant:participant)
  {
    debugger
    return  this.http.post(`https://localhost:7157/AddParticipant`, participant)
  }

}
