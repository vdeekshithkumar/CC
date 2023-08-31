export interface Message {
  messageid?: number;
  conversationid: number;
  senderid: number;
  content: string;
  timestamp: Date;
}