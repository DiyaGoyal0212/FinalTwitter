import React, { useState } from "react";
import axios from "axios";

const Chatbot = () => {
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const API_URL =
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyDfsZUKQiLzrp-LIWk8lcQzgk8xg4EoqqU";

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;

    const newMessage = { role: "user", content: userInput };
    const updatedChatHistory = [...chatHistory, newMessage];
    setChatHistory(updatedChatHistory);
    setUserInput("");

    try {
      setLoading(true);

      const response = await axios.post(API_URL, {
        messages: updatedChatHistory.map((msg) => ({
          role: msg.role,
          content: msg.content,
        })),
      });

      const botReply =
        response?.data?.candidates?.[0]?.content ||
        "Sorry, I couldn't understand that.";
      setChatHistory([
        ...updatedChatHistory,
        { role: "bot", content: botReply },
      ]);
    } catch (error) {
      console.error("Error fetching chatbot response:", error);
      setChatHistory([
        ...updatedChatHistory,
        {
          role: "bot",
          content:
            "There was an error processing your request. Please try again later.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 py-8">
      <header className="text-center mb-4">
        <h1 className="text-3xl font-bold text-gray-800">AI Chatbot</h1>
        <p className="text-gray-600">Ask me anything!</p>
      </header>

      <div className="w-full max-w-md bg-white shadow-md rounded-lg border border-gray-200 p-4 flex flex-col">
        <div className="flex-1 overflow-y-auto mb-4" style={{ maxHeight: "400px" }}>
          {chatHistory.map((message, index) => (
            <div
              key={index}
              className={`mb-2 ${
                message.role === "user"
                  ? "text-right text-blue-600"
                  : "text-left text-gray-800"
              }`}
            >
              <p
                className={`inline-block px-4 py-2 rounded-lg ${
                  message.role === "user" ? "bg-blue-100" : "bg-gray-100"
                }`}
              >
                {message.content}
              </p>
            </div>
          ))}
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <button
            onClick={handleSendMessage}
            disabled={loading}
            className={`px-4 py-2 bg-blue-500 text-white text-sm rounded-lg transition ${
              loading ? "bg-gray-400 cursor-not-allowed" : "hover:bg-blue-600"
            }`}
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
