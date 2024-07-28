import React, { useState } from 'react';
import './ChatBox.css';

const ChatBox = () => {
  const [messages, setMessages] = useState([
    { text: 'Hello! How can I assist you today?', type: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const [activeChat, setActiveChat] = useState('Chat 1');
  const [chats, setChats] = useState({
    'Chat 1': [{ text: 'Hello! How can I assist you today?', type: 'bot' }],
  });

  const handleSend = () => {
    if (input.trim()) {
      setChats(prevChats => ({
        ...prevChats,
        [activeChat]: [
          ...prevChats[activeChat],
          { text: input, type: 'user' },
          { text: 'I see you said: ' + input, type: 'bot' }
        ]
      }));
      setInput('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleSend();
      e.preventDefault(); // Prevent newline insertion
    }
  };

  const handleChatClick = (chat) => {
    setActiveChat(chat);
  };

  const handleNewChat = () => {
    const newChat = `Chat ${Object.keys(chats).length + 1}`;
    setChats({ ...chats, [newChat]: [] });
    setActiveChat(newChat);
  };

  const handleChatAction = (action) => {
    if (action === 'rename') {
      const newName = prompt('Enter new chat name:', activeChat);
      if (newName && !chats[newName]) {
        setChats({ ...chats, [newName]: chats[activeChat] });
        const { [activeChat]: _, ...rest } = chats;
        setChats(rest);
        setActiveChat(newName);
      }
    } else if (action === 'delete') {
      if (Object.keys(chats).length > 1) {
        const { [activeChat]: _, ...rest } = chats;
        setChats(rest);
        setActiveChat(Object.keys(rest)[0]);
      }
    }
  };

  return (
    <div className="chatbox-container">
      <div className="chatbox-sidebar">
        <button className="chatbox-new-chat" onClick={handleNewChat}>New Chat</button>
        <ul className="chatbox-chat-list">
          {Object.keys(chats).map(chat => (
            <li
              key={chat}
              className={`chatbox-chat-item ${chat === activeChat ? 'active' : ''}`}
              onClick={() => handleChatClick(chat)}
            >
              {chat}
              {chat === activeChat && (
                <div className="chatbox-chat-options">
                  <button className="chatbox-option" onClick={() => handleChatAction('rename')}>Rename</button>
                  <button className="chatbox-option" onClick={() => handleChatAction('delete')}>Delete</button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div className="chatbox-main">
        <div className="chatbox-header">
          <h2 className="chatbox-title">{activeChat}</h2>
        </div>
        <div className="chatbox-messages">
          {chats[activeChat].map((msg, index) => (
            <div key={index} className={`message ${msg.type}`}>
              {msg.text}
            </div>
          ))}
        </div>
        <div className="chatbox-input-container">
          <textarea
            className="chatbox-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
          />
          <button className="chatbox-send" onClick={handleSend}>
            <span className="arrow-icon">➤</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
