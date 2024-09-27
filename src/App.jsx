import { ChatProvider } from './context/ChatContext';
import UsernamePrompt from './components/UsernamePrompt';
import Chat from './components/Chat';
import { useChat } from './context/ChatContext';

const App = () => {
  const { state } = useChat();
  const { username } = state;

  return <div className="App">{!username ? <UsernamePrompt /> : <Chat />}</div>;
};

const RootApp = () => (
  <ChatProvider>
    <App />
  </ChatProvider>
);

export default RootApp;
