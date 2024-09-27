import {createContext, useReducer, useContext} from 'react'

const initialState = {
  messages: [],
  username: null,
};

const chatReducer = (state, action) => {
  switch (action.type) {
    case 'SET_MESSAGES':
      return { ...state, messages: action.payload };
    case 'ADD_MESSAGE':
      return { ...state, messages: [...state.messages, action.payload] };
    case 'SET_USERNAME':
      return { ...state, username: action.payload };
    default:
      return state;
  }
};

const ChatContext = createContext();
export const ChatProvider = ({ children }) => {
  const [state, dispatch] = useReducer(chatReducer, initialState);

  return (
    <ChatContext.Provider value={{ state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  return useContext(ChatContext);
};
