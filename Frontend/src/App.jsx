import React, { useState } from 'react';
import { Send, Bot, User, Menu } from 'lucide-react';

function App() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { type: 'bot', content: 'Hello! How can I help you today?' }
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      setMessages([...messages, { type: 'user', content: message }]);
      setMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Bot className="w-8 h-8 text-blue-500" />
            <h1 className="text-xl font-bold">AI Assistant</h1>
          </div>
          <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Main Chat Area */}
      <main className="container mx-auto h-[calc(100vh-8rem)] flex flex-col">
        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex items-start space-x-2 ${
                msg.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
              }`}
            >
              <div className={`p-2 rounded-full ${
                msg.type === 'user' ? 'bg-blue-600' : 'bg-gray-700'
              }`}>
                {msg.type === 'user' ? (
                  <User className="w-5 h-5" />
                ) : (
                  <Bot className="w-5 h-5" />
                )}
              </div>
              <div className={`max-w-[80%] p-3 rounded-lg ${
                msg.type === 'user' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-800 text-gray-100'
              }`}>
                <p>{msg.content}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <form 
          onSubmit={handleSubmit}
          className="p-4 bg-gray-800 border-t border-gray-700"
        >
          <div className="flex space-x-4">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 bg-gray-700 text-gray-100 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
            >
              <Send className="w-5 h-5" />
              <span>Send</span>
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

export default App;
