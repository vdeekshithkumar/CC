export interface Message {
    messageId?: number;
    conversationId: number;
    senderId: number;
    content: string;
    timestamp: Date;
    
  }