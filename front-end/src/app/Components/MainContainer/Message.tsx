'use client'

import React from 'react';

interface MessageProps {
  message: string;
  userName: string;
  currentUser: string;
}

const Message: React.FC<MessageProps> = ({ message, userName, currentUser }) => {
  const isCurrentUser = userName === currentUser;

  return (
    <div className={`message ${isCurrentUser ? 'currentUser' : ''}`}>
      <p>{message}</p>
      <style jsx>{`
        .message {
          text-align: left;
          margin-bottom: 10px;
        }
        .message.currentUser {
          text-align: right;
        }
      `}</style>
    </div>
  );
};

export default Message;