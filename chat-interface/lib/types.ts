export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: number;
}

export interface WebSocketMessage {
  type: "message" | "status" | "error" | "typing";
  data: any;
  id?: string;
}

export interface ChatState {
  messages: ChatMessage[];
  isConnected: boolean;
  isTyping: boolean;
}

export interface WebSocketHook {
  isConnected: boolean;
  sendMessage: (message: any) => void;
  onMessage: (callback: (message: WebSocketMessage) => void) => void;
  disconnect: () => void;
}
