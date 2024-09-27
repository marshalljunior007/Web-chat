import { useState, useEffect, useRef } from 'react';
import { useChat } from '../context/ChatContext';

const Chat = () => {
  const { state, dispatch } = useChat();
  const { messages, username } = state;
  const [newMessage, setNewMessage] = useState('');
  const [page, setPage] = useState(1);
  const chatRef = useRef(null);

  useEffect(() => {
    // Load messages from localStorage on mount
    const storedMessages =
      JSON.parse(localStorage.getItem('chatMessages')) || [];
    dispatch({ type: 'SET_MESSAGES', payload: storedMessages.slice(-25) }); // Load the last 25 messages

    // Listen for changes across tabs
    window.addEventListener('storage', (e) => {
      if (e.key === 'chatMessages') {
        const updatedMessages = JSON.parse(e.newValue);
        dispatch({ type: 'SET_MESSAGES', payload: updatedMessages });
      }
    });
  }, [dispatch]);

  const handleSendMessage = () => {
    const message = { username, text: newMessage, timestamp: Date.now() };
    const updatedMessages = [...messages, message];

    // Update localStorage
    localStorage.setItem('chatMessages', JSON.stringify(updatedMessages));

    // Update state
    dispatch({ type: 'ADD_MESSAGE', payload: message });

    setNewMessage('');
  };

  const handleScroll = () => {
    // Check if user has scrolled to the top and load more messages
    if (chatRef.current.scrollTop === 0 && messages.length > page * 25) {
      setPage(page + 1);
      const storedMessages =
        JSON.parse(localStorage.getItem('chatMessages')) || [];
      dispatch({
        type: 'SET_MESSAGES',
        payload: storedMessages.slice(-page * 25),
      });
    }
  };

  return (
    <div onScroll={handleScroll} ref={chatRef}>
      <div className="chat-history">
        {messages.slice(-page * 25).map((msg, index) => (
          <div key={index}>
            <strong>{msg.username}:</strong> {msg.text}
          </div>
        ))}
      </div>
      
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Enter your message"
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default Chat;
