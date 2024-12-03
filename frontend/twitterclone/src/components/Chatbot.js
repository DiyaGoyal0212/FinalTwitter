import { useState, useRef, useEffect } from "react";
import axios from "axios";


function Chatbot() {
  const [chatHistory, setChatHistory] = useState([]);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [generatingAnswer, setGeneratingAnswer] = useState(false);

  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory, generatingAnswer]);

  async function generateAnswer(e) {
    e.preventDefault();
    if (!question.trim()) return;
    
    setGeneratingAnswer(true);
    const currentQuestion = question;
    setQuestion(""); // Clear input immediately after sending
    
    // Add user question to chat history
    setChatHistory(prev => [...prev, { type: 'question', content: currentQuestion }]);
    
    try {
      const response = await axios({
        url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyB5YrX-e0JiS2aVqkt-xhjw4tSQhXlfQ1E",
        method: "post",
        data: {
          contents: [{ parts: [{ text: question }] }],
        },
      });

      const aiResponse = response["data"]["candidates"][0]["content"]["parts"][0]["text"];
      setChatHistory(prev => [...prev, { type: 'answer', content: aiResponse }]);
      setAnswer(aiResponse);
    } catch (error) {
      console.log(error);
      setAnswer("Sorry - Something went wrong. Please try again!");
    }
    setGeneratingAnswer(false);
  }

  return (
    <div className="h-screen w-full bg-gray-50 flex justify-center items-center">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-4">
        <header className="text-center mb-4">
          <h1 className="text-2xl font-semibold text-blue-500">Chat AI</h1>
        </header>

        {/* Scrollable Chat Container */}
        <div
          ref={chatContainerRef}
          className="h-80 overflow-y-auto bg-gray-100 p-4 rounded-lg mb-4"
        >
          {chatHistory.length === 0 ? (
            <div className="text-center text-gray-600">
              <p>Welcome! Ask me anything...</p>
            </div>
          ) : (
            chatHistory.map((chat, index) => (
              <div key={index} className={`mb-4 ${chat.type === "question" ? "text-right" : "text-left"}`}>
                <div
                  className={`inline-block p-2 rounded-lg ${
                    chat.type === "question"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  <div>{chat.content}</div>
                </div>
              </div>
            ))
          )}
          {generatingAnswer && <div className="text-center text-gray-500">Thinking...</div>}
        </div>

        {/* Input Form */}
        <form onSubmit={generateAnswer} className="flex gap-2">
          <textarea
            required
            className="flex-1 border border-gray-300 rounded p-2"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask anything..."
            rows="2"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                generateAnswer(e);
              }
            }}
          ></textarea>
          <button
            type="submit"
            className={`px-4 py-2 bg-blue-500 text-white rounded-md ${
              generatingAnswer ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={generatingAnswer}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default Chatbot;