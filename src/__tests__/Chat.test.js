import { render, fireEvent } from '@testing-library/react';
import { ChatProvider } from '../context/ChatContext';
import Chat from '../components/Chat';

test('allows user to send a message', () => {
  const { getByPlaceholderText, getByText } = render(
    <ChatProvider>
      <Chat />
    </ChatProvider>
  );

  const input = getByPlaceholderText('Enter your message');
  fireEvent.change(input, { target: { value: 'Hello, Context API!' } });
  fireEvent.click(getByText('Send'));

  expect(getByText('Hello, Context API!')).toBeInTheDocument();
});
