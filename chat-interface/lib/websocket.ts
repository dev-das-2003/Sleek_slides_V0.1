import { WebSocket } from "ws";

export interface WebSocketConfig {
  url: string;
  reconnectInterval?: number;
  maxReconnectAttempts?: number;
  onOpen?: () => void;
  onClose?: () => void;
}

export class WebSocketManager {
  private ws: WebSocket | null = null;
  private reconnectAttempts = 0;
  private reconnectTimer: NodeJS.Timeout | null = null;
  private messageHandlers: Map<string, Function> = new Map();
  private config: Required<WebSocketConfig>;

  constructor(config: WebSocketConfig) {
    this.config = {
      reconnectInterval: 5000,
      maxReconnectAttempts: 5,
      onOpen: () => {},
      onClose: () => {},
      ...config,
    };
  }

  connect() {
    try {
      this.ws = new WebSocket(this.config.url);

      this.ws.onopen = () => {
        console.log("WebSocket connected");
        this.reconnectAttempts = 0;
        this.config.onOpen(); // Call the onOpen callback
      };

      this.ws.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data.toString());
          this.handleMessage(message);
        } catch (error) {
          console.error("Error parsing WebSocket message:", error);
        }
      };

      this.ws.onclose = () => {
        console.log("WebSocket disconnected");
        this.config.onClose(); // Call the onClose callback
        this.attemptReconnect();
      };

      this.ws.onerror = (error) => {
        console.error("WebSocket error:", error);
      };
    } catch (error) {
      console.error("Failed to connect to WebSocket:", error);
      this.attemptReconnect();
    }
  }

  private handleMessage(message: any) {
    const handler = this.messageHandlers.get(message.type);
    if (handler) {
      handler(message);
    }
  }

  private attemptReconnect() {
    if (this.reconnectAttempts < this.config.maxReconnectAttempts) {
      this.reconnectAttempts++;
      console.log(
        `Attempting to reconnect... (${this.reconnectAttempts}/${this.config.maxReconnectAttempts})`
      );

      this.reconnectTimer = setTimeout(() => {
        this.connect();
      }, this.config.reconnectInterval);
    } else {
      console.error("Max reconnection attempts reached");
    }
  }

  sendMessage(message: any) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(message));
    } else {
      console.warn("WebSocket is not connected");
    }
  }

  onMessage(type: string, handler: Function) {
    this.messageHandlers.set(type, handler);
  }

  disconnect() {
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
    }
    if (this.ws) {
      this.ws.close();
    }
  }
}
