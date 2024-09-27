import {useState} from 'react';
import { useChat } from '../context/ChatContext';


const UsernamePrompt = () => {
  const [name, setName] = useState('');
  const { dispatch } = useChat();

  const handleSubmit = () => {
    if (name) {
      dispatch({ type: 'SET_USERNAME', payload: name });
      localStorage.setItem('username', name); // Save to localStorage for persistence
    }
  };

  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name"
      />
      <button onClick={handleSubmit}>Join Chat</button>
    </div>
  );
}

export default UsernamePrompt;
