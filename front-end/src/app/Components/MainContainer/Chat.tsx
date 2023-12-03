'use client'

import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3001');

export default function Chat(){
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    socket.on('connect', function() {
      console.log('Connected');
    });

    socket.on('message', (message) => {
      console.log('Received message:', message);
      setMessages((messages) => [...messages, message]);
    });

    return () => {
      socket.off('message');
    };
  }, []);

  const handleClick = () => {
    console.log('Sending message:', inputValue);
    socket.emit('events', {test: inputValue});
    setMessages((messages) => [...messages, {test: inputValue}]);
    setInputValue('');
  };

  return (
    <div>
      <input value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
      <button onClick={handleClick}>Send</button>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message.test}</li>
        ))}
      </ul>
    </div>
  );
};
