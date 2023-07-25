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
    return this.http.get<conversation[]>(`https://container-conundrum-api.azurewebsites.net/GetConversationByCompanyId?companyId=${companyId}`);
  }
  getMessges(conversationId:number)
  {
    return this.http.get<Message[]>(`https://container-conundrum-api.azurewebsites.net/GetMessagesByConversationId?conversationId=${conversationId}`);
  }
  sendMessage(message:Message)
  {
    return this.http.post (`https://container-conundrum-api.azurewebsites.net/SendMessage`,message)
  }
  GetParticipants(convoID:number)
  {
    return this.http.get<participant[]>(`https://container-conundrum-api.azurewebsites.net/GetParticipantsByConversationId?convoid=${convoID}`)
  }
  GetUsersAsync(convoID:number , companyId:number)
  {
    return this.http.get<Candidate[]> (`https://container-conundrum-api.azurewebsites.net/GetUsers?convoid=${convoID}&companyId=${companyId}`)
  }
   AddParticipant (participant:participant)
  {
    debugger
    return  this.http.post(`https://container-conundrum-api.azurewebsites.net/AddParticipant`, participant)
  }

}
