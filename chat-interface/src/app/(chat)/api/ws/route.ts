import { WebSocketServer } from "ws";

/**
 * WebSocket route handler for Next.js App Router
 *
 * @param client - The WebSocket client instance that connected
 * @param request - The HTTP request object from the upgrade request
 * @param server - The WebSocket server instance managing all connections
 * @param context - Contains route parameters (if any) and other context
 */
export function SOCKET(
  client: WebSocket,
  request: Request,
  server: WebSocketServer,
  context: { params: Record<string, string> }
) {
  console.log("WebSocket client connected");
  console.log("Request URL:", request.url);
  console.log("Client context:", context);

  // Send welcome message
  client.send(
    JSON.stringify({
      type: "status",
      data: { message: "Connected to AI Chat Server" },
    })
  );

  client.on("message", async (data) => {
    try {
      const message = JSON.parse(data.toString());
      console.log("Received message:", message);

      // Handle different message types
      switch (message.type) {
        case "message":
          // Simulate AI processing delay
          setTimeout(() => {
            // Send typing indicator
            client.send(
              JSON.stringify({
                type: "typing",
                data: { isTyping: true },
              })
            );

            // Simulate AI response
            setTimeout(() => {
              const aiResponse = {
                type: "message",
                data: {
                  role: "assistant",
                  content: `I received your message: "${message.content}". This is a placeholder response. In Phase 2, this will connect to your actual AI backend.`,
                  timestamp: Date.now(),
                },
              };

              client.send(JSON.stringify(aiResponse));
            }, 1500);
          }, 500);
          break;

        default:
          console.log("Unknown message type:", message.type);
      }
    } catch (error) {
      console.error("Error processing message:", error);
      client.send(
        JSON.stringify({
          type: "error",
          data: { message: "Invalid message format" },
        })
      );
    }
  });

  client.on("close", () => {
    console.log("WebSocket client disconnected");
  });

  client.on("error", (error) => {
    console.error("WebSocket error:", error);
  });
}
