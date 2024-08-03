import React, { useState, useEffect } from 'react';
import './ChatBox.css';
import client from './axiosConfig'; // Import axiosConfig

const ChatBox = () => {
  const [messages, setMessages] = useState([
    { text: 'Hello! How can I assist you today?', type: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const [activeChat, setActiveChat] = useState('Chat 1');
  const [chats, setChats] = useState({});

  // Fetch chat history from the backend
  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const response = await client.get('/chat_history/');
        const chatHistory = response.data;

        const formattedChats = {};
        chatHistory.forEach(chat => {
          if (!formattedChats[chat.chat_name]) {
            formattedChats[chat.chat_name] = [];
          }
          formattedChats[chat.chat_name].push({ text: chat.message, type: chat.type });
        });

        setChats(formattedChats);
        setActiveChat(Object.keys(formattedChats)[0] || 'Chat 1');
      } catch (error) {
        console.error('Error fetching chat history:', error);
      }
    };

    fetchChatHistory();
  }, []);

  const handleSend = async () => {
    if (input.trim()) {
      const userMessage = { text: input, type: 'user' };
      const currentChat = activeChat;
      
      setChats(prevChats => ({
        ...prevChats,
        [currentChat]: [
          ...prevChats[currentChat],
          userMessage
        ]
      }));
      setInput('');

      try {
        const response = await client.post('/classify/', { question: input });
        const botMessage = { text: `${response.data.answer}`, type: 'bot' };

        setChats(prevChats => ({
          ...prevChats,
          [currentChat]: [
            ...prevChats[currentChat],
            botMessage
          ]
        }));

        // Save the messages to the backend
        await client.post('/save_message/', {
          chat_name: currentChat,
          message: input,
          type: 'user'
        });

        await client.post('/save_message/', {
          chat_name: currentChat,
          message: response.data.answer,
          type: 'bot'
        });

      } catch (error) {
        console.error('Error answering question:', error);
      }
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

  const handleNewChat = async () => {
    const newChat = `Chat ${Object.keys(chats).length + 1}`;
    setChats(prevChats => ({
      ...prevChats,
      [newChat]: []
    }));
    setActiveChat(newChat);

    // Save new chat creation to backend
    try {
      await client.post('/save_chat/', { chat_name: newChat });
    } catch (error) {
      console.error('Error creating new chat:', error);
    }
  };

  const handleChatAction = async (action) => {
    if (action === 'rename') {
        const newName = prompt('Enter new chat name:', activeChat);
        if (newName && !chats[newName]) {
            setChats(prevChats => {
                const { [activeChat]: deletedChat, ...rest } = prevChats;
                return { ...rest, [newName]: deletedChat };
            });
            setActiveChat(newName);

            // Update backend with new chat name
            try {
                await client.post('/rename_chat/', {
                    old_name: activeChat,
                    new_name: newName
                });
            } catch (error) {
                console.error('Error renaming chat:', error);
            }
        }
    } else if (action === 'delete') {
      if (Object.keys(chats).length > 1) {
        const newActiveChat = Object.keys(chats).find(chat => chat !== activeChat) || 'Chat 1';
        
        setChats(prevChats => {
          const { [activeChat]: deletedChat, ...rest } = prevChats;
          return { ...rest, [newActiveChat]: deletedChat };
        });
        setActiveChat(newActiveChat);
  
        // Optionally: delete chat from backend
        try {
          const response = await client.post('/delete_chat/', { chat_name: activeChat });
          console.log('Chat deleted successfully:', response.data);
        } catch (error) {
          console.error('Error deleting chat:', error.response ? error.response.data : error.message);
        }
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
          {chats[activeChat]?.map((msg, index) => (
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
            placeholder="Type a question..."
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
