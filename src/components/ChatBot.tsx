import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Send, Volume2, VolumeX } from 'lucide-react';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';
import { useSpeechSynthesis } from '../hooks/useSpeechSynthesis';

const SUPPORTED_LANGUAGES = [
  { code: 'en-IN', name: 'English' },
  { code: 'hi-IN', name: 'Hindi' },
  { code: 'mr-IN', name: 'Marathi' },
  { code: 'ta-IN', name: 'Tamil' },
  { code: 'te-IN', name: 'Telugu' }
];

const ChatBot = () => {
  const [messages, setMessages] = useState<Array<{text: string, sender: 'user' | 'bot'}>>([]);
  const [input, setInput] = useState('');
  const [language, setLanguage] = useState('en-IN');
  const [isSpeechEnabled, setIsSpeechEnabled] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const { transcript, isListening, startListening, stopListening, hasSupport } = 
    useSpeechRecognition(language);
  const { speak, hasSupport: hasSpeechSupport } = useSpeechSynthesis();

  useEffect(() => {
    if (transcript) {
      setInput(transcript);
    }
  }, [transcript]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    setMessages(prev => [...prev, { text: input, sender: 'user' }]);
    setInput('');
    
    // Simulate bot response - Replace with actual API call in production
    const botResponse = "I'm processing your query about farming laws and conditions. How can I help you further?";
    
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        text: botResponse,
        sender: 'bot'
      }]);
      
      if (isSpeechEnabled && hasSpeechSupport) {
        speak(botResponse, language);
      }
    }, 1000);
  };

  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      <div className="bg-white p-4 border-b flex justify-between items-center">
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="border rounded px-2 py-1"
        >
          {SUPPORTED_LANGUAGES.map(lang => (
            <option key={lang.code} value={lang.code}>
              {lang.name}
            </option>
          ))}
        </select>
        
        <button
          onClick={() => setIsSpeechEnabled(!isSpeechEnabled)}
          className="p-2 rounded-full hover:bg-gray-100"
        >
          {isSpeechEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg ${
                message.sender === 'user'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-200 text-gray-800'
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="border-t p-4 bg-white">
        <div className="flex items-center gap-2">
          {hasSupport && (
            <button
              onClick={toggleListening}
              className={`p-2 rounded-full ${
                isListening ? 'bg-red-500 text-white' : 'bg-gray-200'
              }`}
            >
              {isListening ? <MicOff size={20} /> : <Mic size={20} />}
            </button>
          )}
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:border-green-500"
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          />
          <button
            onClick={handleSend}
            className="p-2 bg-green-600 text-white rounded-full"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;